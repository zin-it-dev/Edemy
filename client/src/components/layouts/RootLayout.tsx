import React from "react";
import { Outlet } from "react-router";
import { Container } from "react-bootstrap";

import useTheme from "@/hooks/use-theme";
import Header from "../shared/Header";
import Footer from "../shared/Footer";

const RootLayout: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={`d-flex flex-column min-vh-100 bg-${theme}`}>
      <Header />
      <Container as={"main"} className="flex-grow-1">
        <Outlet />
      </Container>
      <Footer />
    </div>
  );
};

export default RootLayout;
