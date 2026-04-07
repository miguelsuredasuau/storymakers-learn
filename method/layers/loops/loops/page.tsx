import { getLayer, LayerArcs } from "@/features/method/layers";

export default function LoopsPage() {
  const layer = getLayer("loops");
  if (!layer) {
    return null;
  }
  return <LayerArcs layer={layer} />;
}
