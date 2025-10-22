import React from "react";

type GreetingProps = {
  name: string;
}

const Greeting: React.FC<GreetingProps> = (props: GreetingProps) => {
  return <h4 className="fw-bold">Welcome to Edemy, <strong className="text-primary">{props.name}</strong></h4>;
};

export default Greeting;
