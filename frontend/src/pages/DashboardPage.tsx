import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/client";
import { useAuth } from "../context/AuthContext";

interface Metrics {
  total: number;
  by_status: Record<string, number>;
  by_study_group: Record<string, number>;
}

const DashboardPage: React.FC = () => {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [error, setError] = useState("");
  const { logout } = useAuth();

  useEffect(() => {
    api
      .get<Metrics>("/metrics/summary")
      .then(res => setMetrics(res.data))
      .catch(() => setError("Failed to load metrics"));
  }, []);

  return (
    <>
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Clinical Trial Dashboard</h1>
          <p className="text-sm text-slate-400">
            Overview of participant enrollment and study status.
          </p>
        </div>
        <button className="btn-secondary" onClick={logout}>
          Logout
        </button>
      </header>

      <nav className="flex gap-3 mb-6">
        <Link className="btn-secondary" to="/participants">
          View participants
        </Link>
        <Link className="btn" to="/participants/new">
          + Add participant
        </Link>
      </nav>

      {error && <p className="text-rose-400 mb-4">{error}</p>}

      {metrics && (
        <div className="grid gap-4 md:grid-cols-3">
          <div className="card">
            <h3 className="text-sm font-medium text-slate-300 mb-2">
              Total participants
            </h3>
            <p className="text-4xl font-semibold">{metrics.total}</p>
          </div>
          <div className="card">
            <h3 className="text-sm font-medium text-slate-300 mb-2">By status</h3>
            <ul className="space-y-1 text-sm">
              {Object.entries(metrics.by_status).map(([k, v]) => (
                <li key={k} className="flex justify-between">
                  <span className="capitalize text-slate-200">{k}</span>
                  <span className="font-mono">{v}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h3 className="text-sm font-medium text-slate-300 mb-2">
              By study group
            </h3>
            <ul className="space-y-1 text-sm">
              {Object.entries(metrics.by_study_group).map(([k, v]) => (
                <li key={k} className="flex justify-between">
                  <span className="capitalize text-slate-200">{k}</span>
                  <span className="font-mono">{v}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardPage;
