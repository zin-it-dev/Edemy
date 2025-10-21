import z from "zod";

export const schema = z.object({
    topic: z.string().min(1, { message: "Topic is required" }),
    level: z.enum(["Beginner", "Intermediate", "Advanced"]),
    duration: z.enum(["1 Hours", "2 Hours", "More than 3 Hours"]),
    chapters: z.number().min(1, { message: "At least 1 chapter is required" }),
    video: z.enum(["Yes", "No"]),
});

export type AgentFormData = z.infer<typeof schema>;