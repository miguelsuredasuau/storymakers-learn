import { AgentToolkit, getAgent } from "@/features/method/agents";

export default function StorytellerToolkitPage() {
  const agent = getAgent("storyteller");
  if (!agent) {
    return null;
  }
  return <AgentToolkit agent={agent} />;
}
