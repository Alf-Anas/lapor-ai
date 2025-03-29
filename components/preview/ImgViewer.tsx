'use client';

/* eslint-disable @next/next/no-img-element */

import useQueryParams from '@/hooks/useQueryParams';
import { useEffect, useState } from 'react';
import Viewer from 'react-viewer';

export default function ImgViewer({
    alt,
    src,
    loading = 'lazy',
    className = '',
    ...restProps
}: React.ImgHTMLAttributes<HTMLImageElement>) {
    const queryParams = useQueryParams();
    const [visible, setVisible] = useState(false);

    function onShowViewer() {
        setVisible(true);
        queryParams.addParam('img-viewer', 'show');
    }
    function onHideViewer() {
        setVisible(false);
        queryParams.removeParam('img-viewer');
    }

    useEffect(() => {
        if (!visible) return;
        const popupParamsValue = queryParams.searchParams.get('img-viewer');
        if (popupParamsValue !== 'show') {
            setVisible(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryParams.searchParams]);

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
