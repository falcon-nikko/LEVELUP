import { notFound } from "next/navigation";
import { allLessons, lessonMap } from "@/content/curriculum";
import { LessonPlayer } from "@/components/LessonPlayer";

export function generateStaticParams() {
  return allLessons.map((l) => ({ lessonId: l.id }));
}

export default async function LessonPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await params;
  const lesson = lessonMap.get(lessonId);
  if (!lesson) notFound();

  // Se serializa para que el componente cliente no reciba referencias del módulo.
  return <LessonPlayer lesson={JSON.parse(JSON.stringify(lesson)) as typeof lesson} />;
}
