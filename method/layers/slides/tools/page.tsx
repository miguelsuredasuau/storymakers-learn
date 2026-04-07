import { getLayer, LayerTools } from "@/features/method/layers";

export default function SlidesToolsPage() {
  const layer = getLayer("slides");
  if (!layer) {
    return null;
  }
  return <LayerTools layer={layer} />;
}
