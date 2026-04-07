import { getLayer, LayerTools } from "@/features/method/layers";

export default function BlocksToolsPage() {
  const layer = getLayer("blocks");
  if (!layer) {
    return null;
  }
  return <LayerTools layer={layer} />;
}
