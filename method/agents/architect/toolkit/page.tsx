import { AgentToolkit, getAgent } from "@/features/method/agents";

export default function ArchitectToolkitPage() {
  const agent = getAgent("architect");
  if (!agent) {
    return null;
  }
  return <AgentToolkit agent={agent} />;
}
