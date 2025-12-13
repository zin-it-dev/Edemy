import { Container } from "react-bootstrap";
import { Outlet } from "react-router";

const WorkspaceLayout = () => {
  return (
    <Container fluid className="d-flex h-100">
      <main>
        <Outlet />
      </main>
    </Container>
  );
};

export default WorkspaceLayout;
