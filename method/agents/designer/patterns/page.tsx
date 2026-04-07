import { AgentPatterns, getAgent } from "@/features/method/agents";

export default function DesignerPatternsPage() {
  const agent = getAgent("designer");
  if (!agent) {
    return null;
  }
  return <AgentPatterns agent={agent} />;
}
