import { ChapterGate } from "@/features/learning";

export default function ToolkitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ChapterGate chapter="TOOLKIT">{children}</ChapterGate>;
}
