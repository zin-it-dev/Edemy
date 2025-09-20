import React from "react";

import Hero from "@/components/ui/Hero";
import List from "@/components/ui/List";

const Home: React.FC = () => {
  return (
    <>
      <Hero />

      <section className="py-4 mb-4">
        <List />
      </section>
    </>
  );
};

export default Home;
