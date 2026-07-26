import { cn } from '@/lib/utils'
import { Link } from 'react-router';
import { GraduationCap } from 'lucide-react';

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link to={"/"} className={cn('flex items-center gap-2.5', className)}>
      <GraduationCap className='size-8.5' />
      <span className='text-xl font-bold italic uppercase'>Edemy</span>
    </Link>
  )
}

export default Logo
