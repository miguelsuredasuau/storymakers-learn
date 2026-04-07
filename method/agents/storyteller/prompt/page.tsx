import { AgentPrompt, getAgent } from "@/features/method/agents";

export default function StorytellerPromptPage() {
  const agent = getAgent("storyteller");
  if (!agent) {
    return null;
  }
  return <AgentPrompt agent={agent} />;
}
