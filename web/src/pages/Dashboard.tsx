import { useUser } from '@clerk/react';

const Dashboard = () => {
  const { user } = useUser();

  return (
    <>
      <section>Hello {user?.id}!</section>
    </>
  );
};

export default Dashboard;
