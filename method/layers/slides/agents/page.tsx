import { getLayer, LayerAgents } from "@/features/method/layers";

export default function SlidesAgentsPage() {
  const layer = getLayer("slides");
  if (!layer) {
    return null;
  }
  return <LayerAgents layer={layer} />;
}
