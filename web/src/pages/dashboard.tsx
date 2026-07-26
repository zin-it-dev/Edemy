import { Button } from '@/components/ui/button';
import CourseList from '@/features/dashboard/components/course-list';
import { DialogCourse } from '@/features/dashboard/components/dialog-course';
import { Skeleton } from '@/components/ui/skeleton';
import { useUser } from '@clerk/react';
import { Plus, Sparkles } from 'lucide-react';

const Dashboard = () => {
  const { user, isLoaded } = useUser();

  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
      <section className="relative overflow-hidden rounded-3xl border border-border/50 bg-linear-to-br from-primary/5 via-background to-muted/20 p-6 sm:p-8 md:p-10 shadow-sm">
        <div className="absolute -top-24 -right-24 size-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Sparkles className="size-3.5 fill-current" />
              <span>AI-Powered Learning Hub</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              Hello,{' '}
              {isLoaded ? (
                <span className="bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  {user?.firstName || user?.fullName || 'Learner'}
                </span>
              ) : (
                <Skeleton className="inline-block h-8 w-36 align-middle rounded-md" />
              )}
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-muted-foreground flex items-center gap-2">
              <span>Discover, generate, and master any skill at your own pace</span>
            </p>
          </div>

          <div className="shrink-0 pt-2 sm:pt-0">
            <DialogCourse>
              <Button
                size="lg"
                className="w-full sm:w-auto h-11 sm:h-12 px-5 sm:px-6 rounded-xl sm:rounded-2xl gap-2 font-semibold shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all duration-200 active:scale-95"
              >
                <Plus className="size-5" />
                <span className="text-xs sm:text-sm">Create New Course</span>
              </Button>
            </DialogCourse>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <CourseList />
      </section>
    </div>
  );
};

export default Dashboard;