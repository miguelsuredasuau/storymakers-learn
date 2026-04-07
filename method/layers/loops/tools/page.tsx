import { getLayer, LayerTools } from "@/features/method/layers";

export default function LoopsToolsPage() {
  const layer = getLayer("loops");
  if (!layer) {
    return null;
  }
  return <LayerTools layer={layer} />;
}
