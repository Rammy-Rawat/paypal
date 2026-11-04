import { MOCK_PREVIEW_SESSIONS } from "@/lib/supabase/mock-data";
import { PreviewPageClient } from "./preview-page-client";

export function generateStaticParams() {
  return MOCK_PREVIEW_SESSIONS.map((session) => ({
    sessionId: session.id,
  }));
}

export default async function ClientPreviewPortalPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = await params;

  return <PreviewPageClient sessionId={sessionId} />;
}
