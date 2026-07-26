import * as z from "zod"

export const dialogCourseSchema = z.object({
  topic: z
    .string().min(1, "Topic is required"),
  description: z
    .string().optional(),
  difficulty: z.enum(['beginner', 'moderate', 'advanced']).default('beginner').optional(),
})

export type DiaglogCourseSchema = z.infer<typeof dialogCourseSchema>