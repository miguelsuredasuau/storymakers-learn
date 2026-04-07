import { getLayer, LayerChecklist } from "@/features/method/layers";

export default function LoopsChecklistPage() {
  const layer = getLayer("loops");
  if (!layer) {
    return null;
  }
  return <LayerChecklist layer={layer} />;
}
