-- ====================================================================
-- PayMind Migration 002: Secure Client Preview & Mutual Demonstration
-- ====================================================================

-- 1. PREVIEW SESSIONS
CREATE TABLE IF NOT EXISTS public.preview_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    milestone_id UUID REFERENCES public.milestones(id) ON DELETE SET NULL,
    seller_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    client_name TEXT NOT NULL,
    client_email TEXT NOT NULL,
    session_token TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'expired', 'revoked', 'completed')),
    allowed_parts JSONB NOT NULL DEFAULT '{"interactive_preview": true, "documentation": true, "source_inspection_requestable": false}'::jsonb,
    watermark_text TEXT NOT NULL,
    preview_content JSONB NOT NULL,
    source_inspection JSONB NOT NULL DEFAULT '{"enabled": false, "seller_authorized": false, "client_accepted_terms": false}'::jsonb,
    demonstration JSONB NOT NULL DEFAULT '{"seller_confirmed": false, "client_confirmed": false, "requirements": []}'::jsonb,
    access_count INT NOT NULL DEFAULT 0,
    last_accessed_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_preview_sessions_token ON public.preview_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_preview_sessions_project ON public.preview_sessions(project_id);

-- 2. PREVIEW AUDIT LOGS
CREATE TABLE IF NOT EXISTS public.preview_audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL REFERENCES public.preview_sessions(id) ON DELETE CASCADE,
    action TEXT NOT NULL,
    actor TEXT NOT NULL CHECK (actor IN ('seller', 'client', 'system')),
    actor_name TEXT NOT NULL,
    details TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_preview_audit_logs_session ON public.preview_audit_logs(session_id);

-- 3. DETERMINISTIC SECURITY SCAN REPORTS
CREATE TABLE IF NOT EXISTS public.security_scan_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    deliverable_id UUID REFERENCES public.deliverables(id) ON DELETE SET NULL,
    version TEXT NOT NULL DEFAULT 'v1.0.0',
    tools_executed JSONB NOT NULL DEFAULT '[]'::jsonb,
    findings JSONB NOT NULL DEFAULT '[]'::jsonb,
    summary JSONB NOT NULL,
    limitations_disclaimer TEXT NOT NULL,
    scan_timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE public.preview_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.preview_audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.security_scan_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Sellers can manage own preview sessions" 
    ON public.preview_sessions FOR ALL USING (auth.uid() = seller_id);

CREATE POLICY "Public token access for authenticated preview"
    ON public.preview_sessions FOR SELECT USING (status = 'active' AND expires_at > NOW());
