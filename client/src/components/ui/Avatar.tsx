import React from "react";
import { Image } from "react-bootstrap";

type AvatarProps = {
  url?: string;
  title?: string;
  size: number;
};

const Avatar: React.FC<AvatarProps> = (props: AvatarProps) => {
  return (
    <Image
      src={props.url}
      alt={props.title}
      width={props.size}
      height={props.size}
      roundedCircle
    />
  );
};

export default Avatar;
