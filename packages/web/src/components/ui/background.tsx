import heroBg from '@/assets/hero.png';

const Background = () => {
  return (
    <img src={heroBg} className="opacity absolute inset-0 -z-10 size-full" />
  );
};

export default Background;
