import { AgentPersonality, getAgent } from "@/features/method/agents";

export default function DesignerPersonalityPage() {
  const agent = getAgent("designer");
  if (!agent) {
    return null;
  }
  return <AgentPersonality agent={agent} />;
}
