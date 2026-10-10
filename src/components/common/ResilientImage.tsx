import React, { useState } from 'react';

interface ResilientImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

const DEFAULT_FALLBACK =
  'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80';

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt = '',
  className = '',
  fallbackSrc = DEFAULT_FALLBACK,
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
        alt={alt}
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
