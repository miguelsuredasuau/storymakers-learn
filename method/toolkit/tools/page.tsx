import { ToolkitGrid } from "@/features/method/toolkit-grid";
import { api } from "@/server/trpc/server";

export const metadata = {
  title: "Storymakers Toolkit | 226 Presentation Tools",
  description:
    "An infinite grid of presentation frameworks, principles, and techniques organized by layer, agent, and step.",
};

interface PageProps {
  searchParams: Promise<{
    layer?: string;
    agent?: string;
    step?: string;
    search?: string;
  }>;
}

export default async function ToolkitToolsPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const [tools, filterOptions] = await Promise.all([
    api.tools.list({
      layer: params.layer || null,
      agent: params.agent || null,
      step: params.step || null,
      search: params.search || null,
    }),
    api.tools.getFilterOptions(),
  ]);

  return (
    <div className="h-[100dvh] w-full overflow-hidden">
      <ToolkitGrid
        filterOptions={filterOptions}
        initialFilters={{
          layer: params.layer || null,
          agent: params.agent || null,
          step: params.step || null,
          search: params.search || null,
        }}
        initialTools={tools}
      />
    </div>
  );
}
