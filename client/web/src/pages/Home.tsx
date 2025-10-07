import React from "react";

import Greeting from "@/components/ui/Greeting";

const Home: React.FC = () => {
  return (
    <div>
      <h1>Home</h1>
      <Greeting name="ZIN" />
    </div>
  );
};

export default Home;
