import React from "react";

import Companies from "@/components/ui/Companies";
import Hero from "@/components/ui/Hero";
import List from "@/components/ui/List";
import CallToAction from "@/components/ui/CallToAction";

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <Companies />
      <List />
      <CallToAction />
    </>
  );
};

export default Home;
