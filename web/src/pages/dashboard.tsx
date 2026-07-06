import { useAuth } from '@/hooks/use-auth';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <>
      <section>
        <h1 className="text-white">{user?.email}</h1>
      </section>
    </>
  );
};

export default Dashboard;
