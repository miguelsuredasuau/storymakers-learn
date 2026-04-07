import { getLayer, LayerCover } from "@/features/method/layers";

export default function SlidesPage() {
  const layer = getLayer("slides");
  if (!layer) {
    return null;
  }
  return <LayerCover layer={layer} />;
}
