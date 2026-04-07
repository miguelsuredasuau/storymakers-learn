import { AgentPrompt, getAgent } from "@/features/method/agents";

export default function DesignerPromptPage() {
  const agent = getAgent("designer");
  if (!agent) {
    return null;
  }
  return <AgentPrompt agent={agent} />;
}
