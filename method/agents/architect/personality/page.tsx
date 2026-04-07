import { AgentPersonality, getAgent } from "@/features/method/agents";

export default function ArchitectPersonalityPage() {
  const agent = getAgent("architect");
  if (!agent) {
    return null;
  }
  return <AgentPersonality agent={agent} />;
}
