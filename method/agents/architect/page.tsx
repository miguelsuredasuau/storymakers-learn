import { AgentCover, getAgent } from "@/features/method/agents";

export default function ArchitectPage() {
  const agent = getAgent("architect");
  if (!agent) {
    return null;
  }
  return <AgentCover agent={agent} />;
}
