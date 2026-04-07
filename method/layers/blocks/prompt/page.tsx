import { getLayer, LayerPrompt } from "@/features/method/layers";

export default function BlocksPromptPage() {
  const layer = getLayer("blocks");
  if (!layer) {
    return null;
  }
  return <LayerPrompt layer={layer} />;
}
