import React from "react";

type GreetingProps = { name: string };

const Greeting: React.FC<GreetingProps> = ({ name }: GreetingProps) => {
  return <div>Welcome to Edemy, {name}!</div>;
};

export default Greeting;
