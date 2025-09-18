import React from "react";
import { Image } from "react-bootstrap";

type AvatarProps = {
  src: string;
  sizes: { width: number; height: number };
  alt: string;
};

const Avatar: React.FC<AvatarProps> = (props: AvatarProps) => {
  return (
    <Image
      src={props.src}
      alt={props.alt}
      title={props.alt}
      width={props.sizes.width}
      height={props.sizes.height}
      roundedCircle
    />
  );
};

export default Avatar;
