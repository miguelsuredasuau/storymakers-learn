import { getLayer, LayerCover } from "@/features/method/layers";

export default function LoopsPage() {
  const layer = getLayer("loops");
  if (!layer) {
    return null;
  }
  return <LayerCover layer={layer} />;
}
