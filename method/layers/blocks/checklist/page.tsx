import { getLayer, LayerChecklist } from "@/features/method/layers";

export default function BlocksChecklistPage() {
  const layer = getLayer("blocks");
  if (!layer) {
    return null;
  }
  return <LayerChecklist layer={layer} />;
}
