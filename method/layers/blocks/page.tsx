import { getLayer, LayerCover } from "@/features/method/layers";

export default function BlocksPage() {
  const layer = getLayer("blocks");
  if (!layer) {
    return null;
  }
  return <LayerCover layer={layer} />;
}
