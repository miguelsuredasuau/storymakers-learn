import { getLayer, LayerPrompt } from "@/features/method/layers";

export default function LoopsPromptPage() {
  const layer = getLayer("loops");
  if (!layer) {
    return null;
  }
  return <LayerPrompt layer={layer} />;
}
