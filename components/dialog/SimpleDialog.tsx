/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import {
    ReactElement,
    ReactNode,
    cloneElement,
    useEffect,
    useState,
} from 'react';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { DialogActions, DialogContent } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

interface SimpleDialogProps {
    children: ReactNode;
    title?: ReactNode;
    triggerButton?: ReactElement<any>;
    keepMounted?: boolean | 'on-first-open';
    maxWidth?: 'xs' | 'sm' | 'lg' | 'md' | 'xl';
    cancelLabel?: string;
    okLabel?: string;
    onOk?: () => void;
    okColor?:
        | 'error'
        | 'success'
        | 'primary'
        | 'secondary'
        | 'warning'
        | 'inherit';
}

export default function SimpleDialog({
    title,
    children,
    triggerButton = <Button variant='outlined'>Open</Button>,
    keepMounted: keepMountedSetting,
    maxWidth,
    cancelLabel = 'Batal',
    okLabel = 'OK',
    onOk,
    okColor = 'primary',
}: SimpleDialogProps) {
    const [open, setOpen] = useState(false);
    const [keepMounted, setKeepMounted] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const clonedButton = cloneElement(triggerButton, {
        onClick: () => {
            setOpen(true);
        },
    });

    useEffect(() => {
        if (keepMountedSetting === true) {
            setKeepMounted(true);
        } else if (keepMountedSetting === 'on-first-open' && open) {
            setKeepMounted(true);
        }
    }, [keepMountedSetting, open]);

    function onClickOk() {
        if (onOk) {
            onOk();
        }
        handleClose();
    }

    return (
        <>
            {clonedButton}
            <BootstrapDialog
                onClose={handleClose}
                open={open}
                keepMounted={keepMounted}
                className={open ? '' : 'hidden pointer-events-none'}
                maxWidth={maxWidth}
                sx={{ width: '100%' }}
            >
                {title && (
                    <>
                        <DialogTitle>{title}</DialogTitle>
                        <IconButton
                            aria-label='close'
                            onClick={handleClose}
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                color: (theme) => theme.palette.grey[500],
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </>
                )}
                <DialogContent className='!px-6'>{children}</DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        sx={{ textTransform: 'none', color: '#888' }}
                    >
                        {cancelLabel}
                    </Button>
                    <Button
                        color={okColor}
                        onClick={onClickOk}
                        sx={{ textTransform: 'none' }}
                    >
                        {okLabel}
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </>
    );
}
