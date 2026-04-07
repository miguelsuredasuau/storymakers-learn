import { getLayer, LayerArcs } from "@/features/method/layers";

export default function SlidesArcsPage() {
  const layer = getLayer("slides");
  if (!layer) {
    return null;
  }
  return <LayerArcs layer={layer} />;
}
