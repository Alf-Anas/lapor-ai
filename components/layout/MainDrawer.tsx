import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { METADATA } from '@/app/metadata';
import { useMediaQuery } from '@mui/material';
import Img from '../preview/Img';

const drawerWidth = 240;

const Main = styled('main', {
    shouldForwardProp: (prop) => prop !== 'open' && prop !== 'persistent',
})<{
    open?: boolean;
    persistent?: boolean;
}>(({ theme, open, persistent }) => ({
    flexGrow: 1,
    marginLeft: open || !persistent ? 0 : `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
    persistent?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open' && prop !== 'persistent',
})<AppBarProps>(({ theme, open, persistent }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open &&
        persistent && {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: `${drawerWidth}px`,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

type DrawerContextType = {
    isDesktop: boolean;
    open: boolean;
    drawerWidth: number;
};
const DrawerContext = React.createContext<DrawerContextType | undefined>(
    undefined
);

export const useDrawerContext = (): DrawerContextType => {
    const context = React.useContext(DrawerContext);
    if (!context) {
        throw new Error(
            'useDrawerContext must use inside DrawerContext Provider'
        );
    }
    return context;
};

type Props = {
    children: React.ReactNode;
    menus: React.ReactNode;
    title?: string;
    customTitle?: React.ReactNode;
    action?: React.ReactNode;
    defaultHideDrawer?: boolean;
};
export default function MainDrawer({
    children,
    menus,
    title = METADATA.TITLE,
    action,
    customTitle,
    defaultHideDrawer,
}: Props) {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        if (isDesktop && !defaultHideDrawer) {
            setOpen(true);
        }
    }, [isDesktop, defaultHideDrawer]);

    const persistent = isDesktop || false;

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position='fixed' open={open} persistent={persistent}>
                <Toolbar>
                    <IconButton
                        color='inherit'
                        aria-label='open drawer'
                        onClick={handleDrawerOpen}
                        edge='start'
                        sx={{
                            mr: 2,
                            ...(open && persistent && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    {customTitle ? (
                        customTitle
                    ) : (
                        <Typography
                            variant='h6'
                            noWrap
                            component='div'
                            sx={{ flexGrow: 1 }}
                        >
                            {title}
                        </Typography>
                    )}
                    <div>{action}</div>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant={persistent ? 'persistent' : 'temporary'}
                anchor='left'
                open={open}
                onClose={!persistent ? handleDrawerClose : undefined}
            >
                <DrawerHeader>
                    <div className='w-full text-center'>
                        <Img src='/img/logo.png' height={48} alt='logo' />
                    </div>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? (
                            <ChevronLeftIcon />
                        ) : (
                            <ChevronRightIcon />
                        )}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                {menus}
            </Drawer>
            <DrawerContext.Provider value={{ open, isDesktop, drawerWidth }}>
                <Main open={open} persistent={persistent}>
                    <DrawerHeader />
                    {children}
                </Main>
            </DrawerContext.Provider>
        </Box>
    );
}
