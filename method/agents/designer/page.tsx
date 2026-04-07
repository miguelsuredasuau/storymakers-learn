import { AgentCover, getAgent } from "@/features/method/agents";

export default function DesignerPage() {
  const agent = getAgent("designer");
  if (!agent) {
    return null;
  }
  return <AgentCover agent={agent} />;
}
