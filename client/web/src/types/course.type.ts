import type { Base, Paginate } from "./base.type"

export type Course = Base & {
    name: string;
    description: string;
}

export type Courses = Paginate & {
    results: Pick<Course, 'slug' | 'name' | 'description'>[]
}