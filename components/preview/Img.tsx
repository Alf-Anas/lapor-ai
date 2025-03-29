/* eslint-disable @next/next/no-img-element */

export default function Img({
    alt,
    src,
    loading = 'lazy',
    ...restProps
}: React.ImgHTMLAttributes<HTMLImageElement>) {
    return <img alt={alt} src={src} loading={loading} {...restProps} />;
}
