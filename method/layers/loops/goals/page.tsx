import { getLayer, LayerGoals } from "@/features/method/layers";

export default function LoopsGoalsPage() {
  const layer = getLayer("loops");
  if (!layer) {
    return null;
  }
  return <LayerGoals layer={layer} />;
}
