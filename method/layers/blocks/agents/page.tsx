import { getLayer, LayerAgents } from "@/features/method/layers";

export default function BlocksAgentsPage() {
  const layer = getLayer("blocks");
  if (!layer) {
    return null;
  }
  return <LayerAgents layer={layer} />;
}
