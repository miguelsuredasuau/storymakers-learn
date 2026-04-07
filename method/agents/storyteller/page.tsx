import { AgentCover, getAgent } from "@/features/method/agents";

export default function StorytellerPage() {
  const agent = getAgent("storyteller");
  if (!agent) {
    return null;
  }
  return <AgentCover agent={agent} />;
}
