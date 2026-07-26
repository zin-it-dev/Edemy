import { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { DialogCourse } from '@/features/dashboard/components/dialog-course';
import { BookOpen, Sparkles, Plus, ArrowRight, Layers, User } from 'lucide-react';

export interface TeacherCourse {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'moderate' | 'advanced';
  instructorName?: string;
  totalLessons: number;
  progressPercentage?: number;
  createdAt: string;
}

const difficultyBadgeMap = {
  beginner: { label: 'Beginner', variant: 'secondary' as const },
  moderate: { label: 'Moderate', variant: 'outline' as const },
  advanced: { label: 'Advanced', variant: 'default' as const },
};

export default function CourseList() {
  const [courses, setCourses] = useState<TeacherCourse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/courses');
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        setCourses(data);
      } catch (err: any) {
        console.error('Error fetching teacher courses:', err);
        setError(err.message || 'Error loading courses');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <BookOpen className="size-5 text-primary" />
            <span>Officical Courses</span>
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Explore and enroll in courses created by top instructors
          </p>
        </div>

        {!isLoading && courses.length > 0 && (
          <span className="text-xs text-muted-foreground font-medium self-start sm:self-auto bg-muted/50 px-2.5 py-1 rounded-full border border-border/40">
            {courses.length} {courses.length === 1 ? 'course' : 'courses'} available
          </span>
        )}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="rounded-2xl border-border/60 p-5 space-y-4">
              <div className="flex justify-between items-center">
                <Skeleton className="h-5 w-20 rounded-full" />
                <Skeleton className="h-4 w-16 rounded-full" />
              </div>
              <Skeleton className="h-6 w-3/4 rounded-md" />
              <Skeleton className="h-12 w-full rounded-md" />
              <Skeleton className="h-2 w-full rounded-full" />
            </Card>
          ))}
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 text-center text-sm text-destructive">
          {error}. Please try again later.
        </div>
      ) : courses.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/80 bg-card/40 p-8 sm:p-12 text-center space-y-4">
          <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20 shadow-sm">
            <Sparkles className="size-6" />
          </div>
          <div className="max-w-sm space-y-1">
            <h3 className="text-base sm:text-lg font-semibold text-foreground">
              No courses available yet
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Instructors haven't published any courses yet. You can generate an AI course in the meantime.
            </p>
          </div>
          <DialogCourse>
            <Button size="sm" className="gap-2 rounded-xl mt-2 font-medium">
              <Plus className="size-4" />
              <span>Create AI Course</span>
            </Button>
          </DialogCourse>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses.map((course) => {
            const badgeConfig =
              difficultyBadgeMap[course.difficulty] || difficultyBadgeMap.beginner;
            const progress = course.progressPercentage ?? 0;

            return (
              <Card
                key={course.id}
                className="group relative flex flex-col justify-between rounded-2xl border-border/60 bg-card/60 backdrop-blur-md transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 dark:bg-card/40 overflow-hidden"
              >
                <CardHeader className="p-5 pb-3 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <Badge
                      variant={badgeConfig.variant}
                      className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5"
                    >
                      {badgeConfig.label}
                    </Badge>
                    
                    {course.instructorName && (
                      <span className="text-[11px] text-muted-foreground flex items-center gap-1 truncate max-w-35">
                        <User className="size-3 text-primary shrink-0" />
                        <span className="truncate">{course.instructorName}</span>
                      </span>
                    )}
                  </div>

                  <CardTitle className="text-base sm:text-lg font-bold text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                    {course.title}
                  </CardTitle>

                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {course.description || 'No description available for this course.'}
                  </p>
                </CardHeader>

                <CardContent className="px-5 py-2 space-y-3">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1 font-medium">
                      <Layers className="size-3.5 text-primary" />
                      {course.totalLessons} lessons
                    </span>
                    <span className="font-semibold text-foreground">{progress}%</span>
                  </div>

                  <Progress value={progress} className="h-1.5 w-full bg-muted" />
                </CardContent>

                <CardFooter className="p-5 pt-3 border-t border-border/40 bg-muted/10 mt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-between hover:bg-primary hover:text-primary-foreground group/btn transition-all duration-200 rounded-xl text-xs font-semibold h-9"
                  >
                    <span>{progress > 0 ? 'Continue Learning' : 'Enroll Now'}</span>
                    <ArrowRight className="size-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </section>
  );
}