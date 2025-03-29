import { styled } from '@mui/material';
import Button from '@mui/material/Button';
import { JSX, useRef } from 'react';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

type Props = {
    accept?: string;
    acceptType?: 'image' | 'pdf' | 'video';
    className?: string;
    label: string;
    icon?: JSX.Element;
    capture?: 'environment' | 'user';
    onChange?: (files: File[]) => void;
    variant?: 'text' | 'contained' | 'outlined';
};

export default function FileUpload({
    accept = '',
    label,
    icon,
    className = '',
    acceptType,
    capture,
    onChange,
    variant = 'contained',
}: Props) {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const eAccept =
        acceptType === 'image'
            ? 'image/*'
            : // ? 'image/jpeg, image/png, image/gif, image/heic, image/heif'
            acceptType === 'video'
            ? 'video/*'
            : //   ? 'video/mp4, video/webm, video/ogg'
            acceptType === 'pdf'
            ? 'application/pdf'
            : accept;

    return (
        <Button
            component='label'
            variant={variant}
            startIcon={icon}
            className={className}
        >
            {label}
            <VisuallyHiddenInput
                ref={fileInputRef}
                type='file'
                accept={eAccept}
                capture={capture}
                onChange={(e) => {
                    if (onChange) {
                        const filesArray: File[] = Array.from(
                            e.target.files || []
                        );
                        onChange(filesArray);

                        if (fileInputRef.current) {
                            fileInputRef.current.value = '';
                        }
                    }
                }}
            />
        </Button>
    );
}
