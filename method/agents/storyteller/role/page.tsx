import { AgentRole, getAgent } from "@/features/method/agents";

export default function StorytellerRolePage() {
  const agent = getAgent("storyteller");
  if (!agent) {
    return null;
  }
  return <AgentRole agent={agent} />;
}
