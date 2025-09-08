import React from "react";

import Companies from "@/components/ui/Companies";
import Hero from "@/components/ui/Hero";
import List from "@/components/ui/List";

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <Companies />
      <List />
    </>
  );
};

export default Home;
