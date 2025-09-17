import type { Base } from "./base.type";

export type Lesson = Base & {
  name: string;
  content: string;
};
