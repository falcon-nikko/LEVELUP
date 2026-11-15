export type ExerciseType =
  | "multiple_choice"
  | "true_false"
  | "fill_blank"
  | "multi_select"
  | "ordering"
  | "matching"
  | "short_answer"
  | "error_identification"
  | "code"
  | "simulation";

export type Option = { id: string; text: string };

export type Exercise = {
  id: string;
  type: ExerciseType;
  prompt: string;
  code?: string;
  options?: Option[];
  correct: Record<string, unknown>;
  explanation: string;
  difficulty?: "easy" | "medium" | "hard";
  hint?: string;
};

export type Lesson = {
  id: string;
  title: string;
  description: string;
  theory: string;
  keyIdea: string;
  action: string;
  xp: number;
  minutes: number;
  exercises: Exercise[];
};

export type Unit = {
  id: string;
  title: string;
  description: string;
  objectives: string[];
  lessons: Lesson[];
};

export type Course = {
  slug: string;
  world: "programming" | "finance" | "business" | "ai";
  title: string;
  shortDescription: string;
  description: string;
  level: "beginner" | "intermediate" | "advanced";
  outcome: string;
  units: Unit[];
};
