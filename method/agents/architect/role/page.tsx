import { AgentRole, getAgent } from "@/features/method/agents";

export default function ArchitectRolePage() {
  const agent = getAgent("architect");
  if (!agent) {
    return null;
  }
  return <AgentRole agent={agent} />;
}
