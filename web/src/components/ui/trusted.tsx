import { companiesData } from '@/constants/data';

export default function Trusted() {
  return (
    <div className="flex flex-wrap lg:flex-nowrap items-center justify-center gap-16 md:gap-20 mx-auto mt-16">
      {companiesData.map((img) => (
        <img
          key={img.source}
          className="max-w-20 md:max-w-24"
          src={img.source}
          alt={img.helpText}
        />
      ))}
    </div>
  );
}
