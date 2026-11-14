import { CAREER_TRACKS } from '../src/lib/curriculum/tracks';

const lessons = CAREER_TRACKS.flatMap((t) => t.units.flatMap((u) => u.lessons));
const ex = lessons.flatMap((l) => l.exercises);
const formats = new Map<string, number>();
for (const e of ex) formats.set(e.format, (formats.get(e.format) ?? 0) + 1);

const counts = lessons.map((l) => ({ slug: l.slug, n: l.exercises.length, theory: l.theory.length, examples: l.examples.length, mission: l.actionMission ? 1 : 0 }));
const short = counts.filter((c) => c.n < 12 || c.n > 15);
const noTheory = counts.filter((c) => c.theory < 3);
const noExample = counts.filter((c) => c.examples < 1);
const noMission = counts.filter((c) => c.mission === 0);
const withDiagram = lessons.filter((l) => l.theory.some((t) => t.diagram) || l.examples.some((e) => e.steps.some((s) => s.diagram))).length;

console.log(`lessons: ${lessons.length}`);
console.log(`exercises: ${ex.length}`);
console.log(`formats (${formats.size}): ${[...formats.entries()].sort((a,b)=>b[1]-a[1]).map(([k,v])=>`${k} ${v}`).join(', ')}`);
console.log(`ex/lesson min-max: ${Math.min(...counts.map(c=>c.n))}-${Math.max(...counts.map(c=>c.n))}`);
console.log(`outside 12-15: ${short.length}${short.length ? ' -> ' + short.map(s=>`${s.slug}:${s.n}`).join(', ') : ''}`);
console.log(`lessons with >=3 theory blocks: ${counts.length - noTheory.length}/${counts.length}`);
console.log(`lessons with >=1 worked example: ${counts.length - noExample.length}/${counts.length}`);
console.log(`lessons with integrated diagram: ${withDiagram}/${counts.length}`);
console.log(`lessons with action mission: ${counts.length - noMission.length}/${counts.length}`);
console.log(`numeric w/ tolerance: ${ex.filter((e:any)=>e.format==='numeric' && typeof e.tolerance==='number').length}/${formats.get('numeric')}`);
