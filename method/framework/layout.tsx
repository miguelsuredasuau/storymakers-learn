import { ChapterGate } from "@/features/learning";

export default function FrameworkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ChapterGate chapter="FRAMEWORK">{children}</ChapterGate>;
}
