import { getLayer, LayerGoals } from "@/features/method/layers";

export default function SlidesGoalsPage() {
  const layer = getLayer("slides");
  if (!layer) {
    return null;
  }
  return <LayerGoals layer={layer} />;
}
