import { ChapterGate } from "@/features/learning";

export default function AgentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ChapterGate chapter="AGENTS">{children}</ChapterGate>;
}
