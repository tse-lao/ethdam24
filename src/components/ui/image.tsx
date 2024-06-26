"use client";

import Image, { ImageProps } from "next/image";
import { useEffect, useState } from "react";

interface NewImageProps extends Omit<ImageProps, "src"> {
  src?: string;
  placeholderSrc?: string;
  defaultSrc?: string;
}

const NewImage: React.FC<NewImageProps> = ({
  src,
  alt,
  placeholderSrc = "/drop-icon.png",
  defaultSrc = "/drop-icon.png",
  ...props
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>(src || defaultSrc);

  useEffect(() => {
    setCurrentSrc(src || defaultSrc);
  }, [src, defaultSrc]);

  const handleError = () => {
    setCurrentSrc(defaultSrc);
  };

  return (
    <Image
      {...props}
      src={currentSrc}
      alt={alt}
      blurDataURL={placeholderSrc}
      placeholder="blur"
      onError={handleError}
      className={`bg-light aspect-square ${currentSrc === defaultSrc ? "object-contain" : ""} ${props.className}`}
    />
  );
};

export default NewImage;
