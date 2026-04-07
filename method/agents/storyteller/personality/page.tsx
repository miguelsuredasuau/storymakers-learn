import { AgentPersonality, getAgent } from "@/features/method/agents";

export default function StorytellerPersonalityPage() {
  const agent = getAgent("storyteller");
  if (!agent) {
    return null;
  }
  return <AgentPersonality agent={agent} />;
}
