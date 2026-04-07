import { ChapterGate } from "@/features/learning";

export default function LayersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ChapterGate chapter="LAYERS">{children}</ChapterGate>;
}
