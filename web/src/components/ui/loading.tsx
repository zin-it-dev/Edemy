import { useIsFetching } from '@tanstack/react-query';
import { LoaderCircle } from 'lucide-react';

export const Spinner = ({ size = 5 }: { size?: number }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center text-gray-300">
      <LoaderCircle className={`animate-spin mr-3 size-${size}`} />
      Loading…
    </div>
  );
};

const Loading = () => {
  const isFetching = useIsFetching();

  if (!isFetching) return null;

  return <Spinner />;
};

export default Loading;
