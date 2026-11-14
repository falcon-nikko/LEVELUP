import { ActionMission, CareerTrack, CurriculumLesson } from '@/lib/curriculum/tracks';

export type PathNodeType = 'lesson' | 'chest' | 'boss';
export type PathNodeStatus = 'complete' | 'current' | 'available' | 'locked';

export interface PathNode {
  id: string;
  type: PathNodeType;
  unitSlug: string;
  unitIndex: number;
  unitTitle: { es: string; en: string };
  lesson?: CurriculumLesson;
  unitLessons?: CurriculumLesson[];
  mission?: ActionMission;
  status: PathNodeStatus;
}

export interface PathUnitGroup {
  unitSlug: string;
  unitIndex: number;
  title: { es: string; en: string };
  description: { es: string; en: string };
  lessonCount: number;
  completedCount: number;
  nodes: PathNode[];
}

const chestKey = (unitSlug: string) => `chest-${unitSlug}`;
const bossKey = (unitSlug: string) => `boss-${unitSlug}`;

/**
 * Builds the playable node sequence for a track from real curriculum data.
 *
 * Each unit contributes: its lessons, a review chest, and a final boss that
 * mixes the unit's exercises with its real-world action mission.
 * Progression is strictly sequential unless the account is Super.
 */
export function buildTrackPath(
  track: CareerTrack,
  completedLessonSlugs: string[],
  completedMissionIds: string[],
  isSuper: boolean
): { groups: PathUnitGroup[]; nodes: PathNode[]; currentIndex: number } {
  const doneLessons = new Set(completedLessonSlugs);
  const doneMissions = new Set(completedMissionIds);

  const draft: Omit<PathNode, 'status'>[] = [];
  const groups: PathUnitGroup[] = [];

  track.units.forEach((unit, unitIndex) => {
    const unitNodes: Omit<PathNode, 'status'>[] = [];

    unit.lessons.forEach((lesson) => {
      unitNodes.push({
        id: `lesson-${lesson.slug}`,
        type: 'lesson',
        unitSlug: unit.slug,
        unitIndex,
        unitTitle: unit.title,
        lesson,
      });
    });

    unitNodes.push({
      id: chestKey(unit.slug),
      type: 'chest',
      unitSlug: unit.slug,
      unitIndex,
      unitTitle: unit.title,
      unitLessons: unit.lessons,
    });

    unitNodes.push({
      id: bossKey(unit.slug),
      type: 'boss',
      unitSlug: unit.slug,
      unitIndex,
      unitTitle: unit.title,
      unitLessons: unit.lessons,
      mission: unit.lessons[0]?.actionMission,
    });

    unitNodes.forEach((node) => draft.push(node));

    groups.push({
      unitSlug: unit.slug,
      unitIndex,
      title: unit.title,
      description: unit.description,
      lessonCount: unit.lessons.length,
      completedCount: unit.lessons.filter((lesson) => doneLessons.has(lesson.slug)).length,
      nodes: [],
    });
  });

  const isComplete = (node: Omit<PathNode, 'status'>): boolean => {
    if (node.type === 'lesson') return doneLessons.has(node.lesson!.slug);
    // Chest and boss nodes are cleared only by actually playing them.
    return doneMissions.has(node.id);
  };

  let currentIndex = -1;
  const nodes: PathNode[] = draft.map((node, index) => {
    const complete = isComplete(node);
    let status: PathNodeStatus = 'complete';
    if (!complete) {
      if (currentIndex === -1) {
        status = 'current';
        currentIndex = index;
      } else {
        // Super accounts skip the sequential lock: every remaining node is playable.
        status = isSuper ? 'available' : 'locked';
      }
    }
    return { ...node, status };
  });

  if (currentIndex === -1) currentIndex = nodes.length;

  groups.forEach((group) => {
    group.nodes = nodes.filter((node) => node.unitSlug === group.unitSlug);
  });

  return { groups, nodes, currentIndex };
}

export function nodeX(index: number, amplitude = 76): number {
  return Math.round(amplitude * Math.sin(index * 0.78));
}
