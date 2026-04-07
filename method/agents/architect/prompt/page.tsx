import { AgentPrompt, getAgent } from "@/features/method/agents";

export default function ArchitectPromptPage() {
  const agent = getAgent("architect");
  if (!agent) {
    return null;
  }
  return <AgentPrompt agent={agent} />;
}
