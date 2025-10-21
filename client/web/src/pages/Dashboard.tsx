import { useUser } from "@clerk/clerk-react";
import React from "react";

import Greeting from "@/components/ui/Greeting";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";

const Dashboard: React.FC = () => {
  const { user } = useUser()
  const navigate = useNavigate()

  return (
    <div className="d-flex justify-content-between align-items-center">
      <div>
        <Greeting name={user?.fullName ?? "Guest"} />
        <p className="text-muted">Create new course with AI, share with friends and Earn from it</p>
      </div>

      <Button variant="primary" onClick={() => navigate('/tutor')}>AI Tutor</Button>
    </div>
  );
};

export default Dashboard;
