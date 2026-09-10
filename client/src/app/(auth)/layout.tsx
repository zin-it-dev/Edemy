import { Code2, Bot } from "lucide-react";
import Logo from "@/components/shared/logo";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className='min-h-screen w-full bg-background text-foreground flex items-stretch selection:bg-primary/20 selection:text-primary'>
            <div className='hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 border-r border-border/60 bg-card/30 overflow-hidden space-y-6'>
                <Logo className='flex items-center gap-2 font-bold text-xl text-foreground z-10' />

                <div className='relative z-10 max-w-lg my-auto py-8 space-y-6'>
                    <span className='font-sans text-sm text-primary -rotate-1 inline-block px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/30 shadow-sm font-medium'>
                        ✨ AI-Powered Course Generation
                    </span>

                    <h1 className='text-4xl font-bold tracking-tight text-foreground leading-tight'>
                        Build customized technical curriculums in seconds.
                    </h1>

                    <p className='text-muted-foreground leading-relaxed text-base'>
                        Join developers mastering complex backend pipelines,
                        microservices, and AI architectures with hands-on,
                        personalized learning paths.
                    </p>

                    <div className='pt-4 grid grid-cols-2 gap-4 border-t border-border/40 font-mono text-xs'>
                        <div className='flex items-center gap-2 text-foreground/80'>
                            <Bot className='w-4 h-4 text-primary shrink-0' />
                            <span>Contextual AI Tutor</span>
                        </div>
                        <div className='flex items-center gap-2 text-foreground/80'>
                            <Code2 className='w-4 h-4 text-primary shrink-0' />
                            <span>Interactive Labs</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className='w-full lg:w-1/2 flex flex-col justify-center items-center p-4 sm:p-8 relative'>
                <div className='lg:hidden text-center mb-6 space-y-2'>
                    <h2 className='text-2xl font-bold tracking-tight text-foreground'>
                        Welcome to <span className='text-primary'>Edemy</span>
                    </h2>
                    <p className='text-xs text-muted-foreground font-sans max-w-xs mx-auto'>
                        Your personalized AI learning workspace for technical
                        mastery.
                    </p>
                </div>

               {children}
            </div>
        </div>
    );
}
