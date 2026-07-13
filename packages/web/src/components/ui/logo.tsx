import { cn } from '@/lib/utils'
import LogoSvg from '@/assets/favicon.svg?react';
import { Link } from 'react-router';

const Logo = ({ className, to }: { className?: string; to: string }) => {
  return (
    <Link to={to} className={cn('flex items-center gap-2.5', className)}>
      <LogoSvg className='size-8.5' />
      <span className='text-xl font-bold italic uppercase'>Edemy</span>
    </Link>
  )
}

export default Logo
