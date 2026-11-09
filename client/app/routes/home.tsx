import type { Route } from "./+types/home";
import { Link } from "react-router";
import { useAuth } from "../context/auth-context";
import { Button } from "../components/ui/button";
import { Mic, ArrowRight, LogOut, User as UserIcon } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "PitchWise — AI Discovery & Pitch Simulator" },
    {
      name: "description",
      content:
        "Realistic prospect voice simulation and coaching for technical founders.",
    },
  ];
}

export default function Home() {
  const { user, signOut, isLoading, isConfigured } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      {/* Top Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-white text-slate-950 flex items-center justify-center font-bold shadow">
              <Mic className="h-4 w-4 text-slate-950" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              PitchWise
            </span>
          </Link>

          <div className="flex items-center gap-3">
            {isLoading ? (
              <span className="text-xs text-slate-400">Loading...</span>
            ) : user ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 text-xs text-slate-300 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                  <UserIcon className="h-3.5 w-3.5 text-slate-400" />
                  <span>{user.email}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => signOut()}
                  className="text-xs font-medium"
                >
                  <LogOut className="h-3.5 w-3.5 mr-1" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button size="sm" className="font-semibold text-xs">
                  Sign In
                  <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 max-w-5xl mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-800 bg-slate-900 text-xs text-slate-300 mb-6">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Interactive AI Prospect Simulation</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white max-w-3xl leading-tight">
          Stop pitching architecture.{" "}
          <span className="text-slate-400">Start discovering pain.</span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
          PitchWise simulates realistic B2B prospects with hidden dossiers and
          dynamic patience meters, coaching technical founders to master customer
          discovery and sales conversations.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {user ? (
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900 text-sm text-slate-300">
              Welcome back, <strong className="text-white">{user.email}</strong>. Ready for your next prospect session?
            </div>
          ) : (
            <Link to="/login">
              <Button size="lg" className="font-bold text-sm">
                Start Practicing Now
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          )}
        </div>

        {!isConfigured && (
          <div className="mt-12 p-4 rounded-xl border border-amber-800/60 bg-amber-950/30 text-amber-200 text-xs max-w-md text-left">
            <p className="font-semibold text-amber-300">Developer Notice:</p>
            <p className="mt-1 text-amber-200/90 leading-relaxed">
              Supabase modern API keys have not yet been populated in{" "}
              <code className="text-amber-100">client/.env</code>. Copy{" "}
              <code className="text-amber-100">client/.env.example</code> to configure authentication.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
