import React, { useEffect, type ReactNode } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../context/auth-context";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: ReactNode;
}

/**
 * Route protection wrapper.
 * Ensures only authenticated users can access the wrapped view.
 * Redirects unauthenticated visitors to /login while preserving the requested destination.
 */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && !user) {
      const destination = encodeURIComponent(location.pathname + location.search);
      navigate(`/login?redirect=${destination}`, { replace: true });
    }
  }, [user, isLoading, navigate, location]);

  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-slate-950 flex flex-col items-center justify-center gap-3 text-slate-400">
        <Loader2 className="h-6 w-6 animate-spin text-white" />
        <span className="text-xs font-medium tracking-wide">
          Verifying session...
        </span>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}

