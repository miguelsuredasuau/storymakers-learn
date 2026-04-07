import { getLayer, LayerAgents } from "@/features/method/layers";

export default function LoopsAgentsPage() {
  const layer = getLayer("loops");
  if (!layer) {
    return null;
  }
  return <LayerAgents layer={layer} />;
}
