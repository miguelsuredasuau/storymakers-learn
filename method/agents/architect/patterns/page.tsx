import { AgentPatterns, getAgent } from "@/features/method/agents";

export default function ArchitectPatternsPage() {
  const agent = getAgent("architect");
  if (!agent) {
    return null;
  }
  return <AgentPatterns agent={agent} />;
}
