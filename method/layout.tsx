import { ProgressTrackingWrapper } from "@/features/learning";

export default function MethodLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <ProgressTrackingWrapper>{children}</ProgressTrackingWrapper>
    </div>
  );
}
