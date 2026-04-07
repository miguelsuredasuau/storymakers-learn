import { getLayer, LayerChecklist } from "@/features/method/layers";

export default function SlidesChecklistPage() {
  const layer = getLayer("slides");
  if (!layer) {
    return null;
  }
  return <LayerChecklist layer={layer} />;
}
