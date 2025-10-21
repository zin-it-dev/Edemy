import React from "react";

const Greeting: React.FC<{ name: string }> = ({ name }: { name: string }) => {
  return <h2 className="fw-bold">Welcome to Edemy, <strong className="text-primary">{name}</strong></h2>;
};

export default Greeting;
