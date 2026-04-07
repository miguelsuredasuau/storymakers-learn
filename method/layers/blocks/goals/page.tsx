import { getLayer, LayerGoals } from "@/features/method/layers";

export default function BlocksGoalsPage() {
  const layer = getLayer("blocks");
  if (!layer) {
    return null;
  }
  return <LayerGoals layer={layer} />;
}
