import React from "react";

const Greeting: React.FC<{ name: string }> = ({ name }: { name: string }) => {
  return <p>Welcome to Edemy, {name}!</p>;
};

export default Greeting;
