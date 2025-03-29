'use client';

/* eslint-disable @next/next/no-img-element */

import { useState } from 'react';
import Viewer from 'react-viewer';

export default function ImgViewer({
    alt,
    src,
    loading = 'lazy',
    className = '',
    ...restProps
}: React.ImgHTMLAttributes<HTMLImageElement>) {
    const [visible, setVisible] = useState(false);

    function onShowViewer() {
        setVisible(true);
    }
    function onHideViewer() {
        setVisible(false);
    }

    return (
        <>
            <img
                alt={alt}
                src={src}
                loading={loading}
                onClick={onShowViewer}
                className={`cursor-pointer shadow-md transition-transform transform hover:scale-105 hover:shadow-lg ${className}`}
                {...restProps}
            />
            {src && (
                <Viewer
                    visible={visible}
                    onClose={onHideViewer}
                    images={[{ src: src, alt: alt }]}
                    zIndex={1500}
                    onMaskClick={onHideViewer}
                />
            )}
        </>
    );
}
