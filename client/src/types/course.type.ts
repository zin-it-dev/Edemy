import type { Base } from "./base.type";

export type Course = Base & {
  name: string;
  description: string;
};
