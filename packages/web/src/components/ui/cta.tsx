import { ArrowRightIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router';

const CTA = () => {
    return (
        <Button
            size='default'
            variant='secondary'
            className='shrink-0'
            render={<Link to='#' className='inline-flex items-center gap-2' />}
            nativeButton={false}
        >
            Get Started
            <ArrowRightIcon className='size-3' />
        </Button>
    );
};

export default CTA;
