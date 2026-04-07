import { getLayer, LayerArcs } from "@/features/method/layers";

export default function BlocksArcsPage() {
  const layer = getLayer("blocks");
  if (!layer) {
    return null;
  }
  return <LayerArcs layer={layer} />;
}
