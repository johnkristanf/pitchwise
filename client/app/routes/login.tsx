import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useAuth } from "../context/auth-context";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Mic,
  AlertCircle,
  CheckCircle2,
  Loader2,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";

export function meta() {
  return [
    { title: "Sign In — PitchWise" },
    {
      name: "description",
      content: "Sign in to PitchWise to practice discovery calls and master your pitch.",
    },
  ];
}

export default function LoginPage() {
  const { user, isLoading, isConfigured, signInWithPassword, signUp } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If already authenticated, redirect to destination
  useEffect(() => {
    if (!isLoading && user) {
      navigate(redirectTo, { replace: true });
    }
  }, [user, isLoading, navigate, redirectTo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!email.trim() || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (mode === "signup") {
      if (password.length < 6) {
        setError("Password must be at least 6 characters long.");
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
    }

    setIsSubmitting(true);

    try {
      if (mode === "signin") {
        const { error: signInErr } = await signInWithPassword(email.trim(), password);
        if (signInErr) {
          setError(signInErr.message);
        } else {
          navigate(redirectTo, { replace: true });
        }
      } else {
        const { error: signUpErr, session } = await signUp(email.trim(), password);
        if (signUpErr) {
          setError(signUpErr.message);
        } else if (session) {
          navigate(redirectTo, { replace: true });
        } else {
          setSuccessMessage(
            "Account created! Please check your email inbox to confirm your registration."
          );
        }
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-slate-800/30 rounded-full blur-3xl pointer-events-none" />

      {/* Brand Header */}
      <div className="flex items-center gap-3 mb-8 z-10">
        <div className="h-10 w-10 rounded-xl bg-white text-slate-950 flex items-center justify-center shadow-lg font-bold">
          <Mic className="h-5 w-5 text-slate-950" />
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-bold tracking-tight text-white">
            PitchWise
          </span>
          <span className="text-xs text-slate-400">
            AI Voice Discovery & Pitch Simulator
          </span>
        </div>
      </div>

      {/* Main Authentication Card */}
      <Card className="w-full max-w-md bg-slate-900 border-slate-800 shadow-2xl relative z-10">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl text-white font-bold">
            {mode === "signin" ? "Welcome back" : "Create your account"}
          </CardTitle>
          <CardDescription className="text-slate-400">
            {mode === "signin"
              ? "Sign in to access your pitch simulator and prospect sessions"
              : "Start sharpening your customer discovery skills today"}
          </CardDescription>

          {/* Mode Tabs */}
          <div className="grid grid-cols-2 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 mt-4">
            <button
              type="button"
              onClick={() => {
                setMode("signin");
                setError(null);
                setSuccessMessage(null);
              }}
              className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                mode === "signin"
                  ? "bg-slate-800 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("signup");
                setError(null);
                setSuccessMessage(null);
              }}
              className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                mode === "signup"
                  ? "bg-slate-800 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Create Account
            </button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Missing Environment Setup Notice */}
          {!isConfigured && (
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-950/40 border border-amber-800/60 text-amber-200 text-xs">
              <ShieldAlert className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-300">
                  Supabase Setup Required
                </p>
                <p className="mt-0.5 text-amber-200/80 leading-normal">
                  Configure <code className="text-amber-100">VITE_SUPABASE_URL</code> and{" "}
                  <code className="text-amber-100">VITE_SUPABASE_PUBLISHABLE_KEY</code> in{" "}
                  <code className="text-amber-100">client/.env</code>.
                </p>
              </div>
            </div>
          )}

          {/* Error Alert */}
          {error && (
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-red-950/40 border border-red-800/60 text-red-200 text-xs">
              <AlertCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">{error}</p>
            </div>
          )}

          {/* Success Banner */}
          {successMessage && (
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-200 text-xs">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">{successMessage}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-xs font-medium text-slate-300 block"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="founder@startup.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="text-xs font-medium text-slate-300 block"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                autoComplete={
                  mode === "signin" ? "current-password" : "new-password"
                }
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
                required
              />
            </div>

            {mode === "signup" && (
              <div className="space-y-1.5">
                <label
                  htmlFor="confirmPassword"
                  className="text-xs font-medium text-slate-300 block"
                >
                  Confirm Password
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isSubmitting}
                  required
                />
              </div>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 font-semibold"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  {mode === "signin" ? "Signing In..." : "Creating Account..."}
                </>
              ) : (
                <>
                  {mode === "signin" ? "Sign In" : "Get Started"}
                  <ArrowRight className="h-4 w-4 ml-1" />
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Footer info */}
      <p className="mt-8 text-center text-xs text-slate-500 z-10">
        Pitchwise @ 2026
      </p>
    </div>
  );
}

