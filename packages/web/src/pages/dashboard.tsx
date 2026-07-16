import CourseList from '@/components/ui/course-list';
import { useAuth } from '@/hooks/use-auth';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <>
      <p>{user?.username}</p>
      <CourseList />
    </>
  );
};

export default Dashboard;
