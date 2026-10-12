import React, { useState } from 'react';

interface ResilientImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  /** صورة أعلى الصفحة (مثل صورة الواجهة): تُحمَّل فوراً وبأولوية عالية بدل التأجيل. */
  priority?: boolean;
}

const RESPONSIVE_WIDTHS = [480, 800, 1200, 1600];

/**
 * لصور Unsplash: يولّد عدة مقاسات (srcset) حتى يحمّل الجوال نسخة صغيرة بدل 1800px.
 * الصور الأخرى (Firebase Storage أو Base64) تُعاد كما هي.
 */
function buildSrcSet(url: string): string | undefined {
  if (!url.startsWith('https://images.unsplash.com/')) return undefined;
  try {
    const parsed = new URL(url);
    const maxWidth = Number(parsed.searchParams.get('w')) || 1600;
    const widths = RESPONSIVE_WIDTHS.filter((w) => w < maxWidth).concat(maxWidth);
    return widths
      .map((w) => {
        parsed.searchParams.set('w', String(w));
        return `${parsed.toString()} ${w}w`;
      })
      .join(', ');
  } catch {
    return undefined;
  }
}

const DEFAULT_FALLBACK =
  'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80';

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt = '',
  className = '',
  fallbackSrc = DEFAULT_FALLBACK,
  priority = false,
  sizes = '100vw',
  ...rest
}) => {
  const [imgSrc, setImgSrc] = useState<string>(src || fallbackSrc);
  const [loaded, setLoaded] = useState<boolean>(false);

  React.useEffect(() => {
    setImgSrc(src || fallbackSrc);
  }, [src, fallbackSrc]);

  return (
    <div className={`relative overflow-hidden bg-[#111111] ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#141414] via-[#1b1b1b] to-[#0d0d0d] animate-pulse" />
      )}
      <img
        src={imgSrc}
        srcSet={buildSrcSet(imgSrc)}
        sizes={sizes}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (imgSrc !== fallbackSrc) {
            setImgSrc(fallbackSrc);
          }
          setLoaded(true);
        }}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...rest}
      />
    </div>
  );
};
