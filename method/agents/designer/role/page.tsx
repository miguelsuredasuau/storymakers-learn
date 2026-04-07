import { AgentRole, getAgent } from "@/features/method/agents";

export default function DesignerRolePage() {
  const agent = getAgent("designer");
  if (!agent) {
    return null;
  }
  return <AgentRole agent={agent} />;
}
