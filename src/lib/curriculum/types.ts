import { LocalizedText } from '@/lib/i18n/dictionaries';
import { TrackSlug } from '@/lib/curriculum/affiliates';

/* ==========================================================================
   Diagrams — data-driven visuals with INTEGRATED labels (anti split-attention)
   ========================================================================== */

export type DiagramTone = 'good' | 'bad' | 'warn' | 'info' | 'mute';

export type DiagramSpec =
  | {
      kind: 'flow';
      dir?: 'h' | 'v';
      nodes: { id: string; label: LocalizedText; note?: LocalizedText; tone?: DiagramTone }[];
      /** Optional branch drawn below the main line (error paths, retries). */
      branch?: { afterNodeId?: string; label: LocalizedText; tone?: DiagramTone };
    }
  | {
      kind: 'compare';
      left: { title: LocalizedText; items: LocalizedText[]; tone: DiagramTone };
      right: { title: LocalizedText; items: LocalizedText[]; tone: DiagramTone };
    }
  | {
      kind: 'bars';
      unit?: string;
      max?: number;
      items: { label: LocalizedText; value: number; tone?: DiagramTone; note?: LocalizedText }[];
    }
  | {
      kind: 'funnel';
      stages: { label: LocalizedText; value: number; note?: LocalizedText }[];
    }
  | {
      kind: 'timeline';
      steps: { label: LocalizedText; value: string; tone?: DiagramTone }[];
    }
  | {
      kind: 'stack';
      total: number;
      prefix?: string;
      parts: { label: LocalizedText; value: number; tone?: DiagramTone }[];
    }
  | {
      kind: 'table';
      head: LocalizedText[];
      rows: (string | number)[][];
      highlightRow?: number;
      note?: LocalizedText;
    }
  | {
      kind: 'matrix';
      xLabel: LocalizedText;
      yLabel: LocalizedText;
      corners: [LocalizedText, LocalizedText, LocalizedText, LocalizedText];
      points?: { x: number; y: number; label: LocalizedText; tone?: DiagramTone }[];
    }
  | {
      kind: 'code';
      lang?: string;
      lines: { text: string; tone?: DiagramTone; label?: LocalizedText }[];
    }
  | {
      kind: 'loop';
      steps: { label: LocalizedText; note?: LocalizedText }[];
    }
  | {
      kind: 'layers';
      layers: { label: LocalizedText; note?: LocalizedText; tone?: DiagramTone }[];
    }
  | {
      kind: 'equation';
      /** Rendered as a real formula, not prose: tokens are laid out inline. */
      tokens: { text: string; tone?: DiagramTone; label?: LocalizedText }[];
      result?: { text: string; tone?: DiagramTone };
    };

/* ==========================================================================
   Exercises — 10 formats, difficulty 1..5
   ========================================================================== */

export type ExerciseFormat =
  | 'concept'
  | 'worked_why'
  | 'output'
  | 'bug_hunt'
  | 'ordering'
  | 'faded'
  | 'numeric'
  | 'pairing'
  | 'discrimination'
  | 'scenario';

export interface ExerciseOption {
  id: string;
  label: LocalizedText;
  sublabel?: LocalizedText;
}

export interface Exercise {
  id: string;
  format: ExerciseFormat;
  difficulty: 1 | 2 | 3 | 4 | 5;
  /** Short format tag shown on the exercise chip (e.g. "CÁLCULO"). */
  badge: LocalizedText;
  prompt: LocalizedText;
  /** Optional supporting material rendered ABOVE the prompt (integrated). */
  diagram?: DiagramSpec;
  /** `content` may be a plain string for language-neutral material (code, JSON, SQL). */
  context?: { label?: LocalizedText; content: LocalizedText | string; mono?: boolean };
  hint?: LocalizedText;
  explanation: LocalizedText;
  xp: number;

  /* choice-like: concept, worked_why, output, discrimination, scenario */
  options?: ExerciseOption[];
  correctOptionId?: string;

  /* ordering / faded */
  pieces?: { id: string; text: LocalizedText }[];
  correctOrderIds?: string[];
  /** faded: pieces already placed and locked. */
  lockedPieceIds?: string[];

  /* numeric */
  answer?: number;
  tolerance?: number;
  unit?: string;
  formula?: LocalizedText;

  /* pairing */
  pairs?: { leftId: string; left: LocalizedText; rightId: string; right: LocalizedText }[];

  /* bug_hunt */
  lines?: { id: string; text: string; tone?: DiagramTone; label?: LocalizedText }[];
  correctLineId?: string;
}

/* ==========================================================================
   Teaching blocks
   ========================================================================== */

export interface TheoryBlock {
  id: string;
  heading: LocalizedText;
  /** Atomic: 40-70 words. One idea per block. */
  body: LocalizedText;
  bullets?: LocalizedText[];
  diagram?: DiagramSpec;
  /** Why it matters in money/time terms. One line. */
  why?: LocalizedText;
}

export interface WorkedExample {
  id: string;
  title: LocalizedText;
  situation: LocalizedText;
  steps: { label: LocalizedText; detail: LocalizedText; diagram?: DiagramSpec }[];
  result: LocalizedText;
  /** Self-explanation prompt — improves transfer. */
  selfCheck: {
    prompt: LocalizedText;
    options: ExerciseOption[];
    correctOptionId: string;
    explanation: LocalizedText;
  };
}

export interface ActionMission {
  id: string;
  title: LocalizedText;
  objective: LocalizedText;
  steps: LocalizedText[];
  /** Real deliverable + how to know it worked. */
  proof: LocalizedText;
  affiliateToolSlug: string;
  xpBonus: number;
}

export interface Lesson {
  slug: string;
  unitSlug: string;
  trackSlug: TrackSlug;
  orderIndex: number;
  title: LocalizedText;
  /** One concrete sentence: what you will be able to do. */
  outcome: LocalizedText;
  durationMin: number;
  xpReward: number;
  theory: TheoryBlock[];
  examples: WorkedExample[];
  exercises: Exercise[];
  recap: LocalizedText[];
  actionMission: ActionMission;
}

export interface Unit {
  slug: string;
  trackSlug: TrackSlug;
  orderIndex: number;
  title: LocalizedText;
  description: LocalizedText;
  lessons: Lesson[];
}

export interface Track {
  slug: TrackSlug;
  /** World bucket stored in Supabase `profiles.active_track_slug` migrations. */
  supabaseWorldSlug: 'ai' | 'programming' | 'business';
  accent: string;
  accentLip: string;
  accentWash: string;
  accentInk: string;
  /** Low-opacity accent for glows and selected states. */
  accentSoft: string;
  /** Fixed catalogue number shown on cards, e.g. `01 · AI`. */
  badgeCode: string;
  name: LocalizedText;
  shortTag: LocalizedText;
  description: LocalizedText;
  outcomes: LocalizedText[];
  units: Unit[];
}

/* Backwards-compatible aliases used across the app. */
export type CurriculumLesson = Lesson;
export type CurriculumUnit = Unit;
export type CareerTrack = Track;
export type LessonExercise = Exercise;
