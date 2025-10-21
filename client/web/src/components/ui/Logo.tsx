import * as React from 'react';
import { Image } from 'react-bootstrap';

import { assets } from '@/utils/assets';

interface ILogoProps {
    size: number;
}

const Logo: React.FunctionComponent<ILogoProps> = (props) => {
  return <>
    <Image
        src={assets.logo}
        width={props.size}
        height={props.size}
        className="d-inline-block me-2 align-end"
        alt=""
    />
    Edemy
  </>
};

export default Logo;
