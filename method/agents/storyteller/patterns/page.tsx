import { AgentPatterns, getAgent } from "@/features/method/agents";

export default function StorytellerPatternsPage() {
  const agent = getAgent("storyteller");
  if (!agent) {
    return null;
  }
  return <AgentPatterns agent={agent} />;
}
