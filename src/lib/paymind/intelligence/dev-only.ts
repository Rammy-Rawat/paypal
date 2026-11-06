/**
 * The starter API routes intentionally refuse production traffic until you
 * connect them to PayMind's real Supabase-authenticated user/session guard.
 * Do not remove this check merely to make production requests work.
 */
export function productionAuthNotIntegrated() {
  return process.env.NODE_ENV === "production";
}
