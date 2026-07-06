type BackgroundProps = {
  helpText: string;
  source: string;
};

const Background = ({ source, helpText }: BackgroundProps) => {
  return (
    <img
      src={source}
      className="absolute inset-0 -z-10 size-full opacity-50"
      alt={helpText}
    />
  );
};

export default Background;
