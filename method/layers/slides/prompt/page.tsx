import { getLayer, LayerPrompt } from "@/features/method/layers";

export default function SlidesPromptPage() {
  const layer = getLayer("slides");
  if (!layer) {
    return null;
  }
  return <LayerPrompt layer={layer} />;
}
