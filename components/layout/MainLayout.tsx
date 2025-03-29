import MainDrawer from '@/components/layout/MainDrawer';
import {
    Divider,
    IconButton,
    List,
    Menu,
    MenuItem,
    MenuList,
    Typography,
} from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FeedIcon from '@mui/icons-material/Feed';
import { ROUTE } from '@/utils/constant';
import HomeIcon from '@mui/icons-material/Home';
import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import StorageIcon from '@mui/icons-material/Storage';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { signIn, useSession } from 'next-auth/react';
import useLogout from '@/hooks/useLogout';

type Props = {
    children: React.ReactNode;
    title?: string;
    customTitle?: React.ReactNode;
    defaultHideDrawer?: boolean;
};

function ItemList({
    item,
    pathname,
}: {
    item: {
        label: string;
        icon: React.JSX.Element;
        url: string;
    };
    pathname: string;
}) {
    const router = useRouter();
    return (
        <ListItem disablePadding>
            <ListItemButton
                onClick={() => router.push(item.url)}
                selected={pathname === item.url}
            >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                    primary={item.label}
                    slotProps={{
                        primary: {
                            className: 'font-primary',
                        },
                    }}
                />
            </ListItemButton>
        </ListItem>
    );
}

export default function MainLayout({
    children,
    title,
    customTitle,
    defaultHideDrawer,
}: Props) {
    const { status, data: userData } = useSession();
    const { signout } = useLogout();
    const pathname = usePathname();
    const router = useRouter();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    return (
        <MainDrawer
            title={title}
            customTitle={customTitle}
            defaultHideDrawer={defaultHideDrawer}
            menus={
                <>
                    <List>
                        <ItemList
                            item={{
                                label: 'Beranda',
                                icon: <HomeIcon />,
                                url: ROUTE.HOME.URL,
                            }}
                            pathname={pathname}
                        />
                        <ItemList
                            item={{
                                label: ROUTE.DASHBOARD.TITLE,
                                icon: <DashboardIcon />,
                                url: ROUTE.DASHBOARD.URL,
                            }}
                            pathname={pathname}
                        />
                    </List>

                    {status === 'authenticated' && (
                        <>
                            <Divider textAlign='left' variant='fullWidth'>
                                Laporan
                            </Divider>
                            <List>
                                {[
                                    {
                                        label: 'Form Laporan',
                                        icon: <FeedIcon />,
                                        url: ROUTE.FORM.URL,
                                    },
                                    {
                                        label: 'Laporan Saya',
                                        icon: <StorageIcon />,
                                        url: ROUTE.DATA_SAYA.URL,
                                    },
                                ].map((item, idx) => (
                                    <ItemList
                                        key={idx}
                                        item={item}
                                        pathname={pathname}
                                    />
                                ))}
                            </List>
                        </>
                    )}
                </>
            }
            action={
                <>
                    <IconButton
                        size='large'
                        aria-label='account of current user'
                        aria-controls='menu-appbar'
                        aria-haspopup='true'
                        color='inherit'
                        onClick={handleMenu}
                    >
                        <AccountCircleIcon />
                    </IconButton>
                    <Menu
                        id='menu-appbar'
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleCloseMenu}
                    >
                        <MenuList>
                            {status === 'authenticated' && (
                                <MenuItem
                                    onClick={() =>
                                        router.push(ROUTE.PROFILE.URL)
                                    }
                                >
                                    <ListItemIcon>
                                        <PersonIcon fontSize='small' />
                                    </ListItemIcon>
                                    {userData ? (
                                        <ListItemText>
                                            {userData.name}
                                        </ListItemText>
                                    ) : (
                                        'Profile'
                                    )}
                                </MenuItem>
                            )}
                            {status === 'unauthenticated' && (
                                <MenuItem onClick={() => signIn('keycloak')}>
                                    Login
                                </MenuItem>
                            )}
                            {status === 'authenticated' && (
                                <MenuItem onClick={signout}>
                                    <ListItemIcon>
                                        <LogoutIcon
                                            fontSize='small'
                                            color='error'
                                        />
                                    </ListItemIcon>
                                    <Typography color='error'>
                                        Keluar
                                    </Typography>
                                </MenuItem>
                            )}
                        </MenuList>
                    </Menu>
                </>
            }
        >
            {children}
        </MainDrawer>
    );
}
