import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function ShowLoading({ show }: { show: boolean }) {
    return (
        <>
            {show && (
                <Box
                    sx={{
                        textAlign: 'center',
                        width: '100%',
                        padding: '0.5rem',
                    }}
                >
                    <CircularProgress size={30} />
                </Box>
            )}
        </>
    );
}
