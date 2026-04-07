import { AgentToolkit, getAgent } from "@/features/method/agents";

export default function DesignerToolkitPage() {
  const agent = getAgent("designer");
  if (!agent) {
    return null;
  }
  return <AgentToolkit agent={agent} />;
}
