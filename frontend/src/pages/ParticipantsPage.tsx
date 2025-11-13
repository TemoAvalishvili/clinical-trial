import React, { useEffect, useState } from "react";
import api from "../api/client";
import { Link, useNavigate } from "react-router-dom";

interface Participant {
  id: number;
  participant_id: string;
  subject_id: string;
  study_group: string;
  enrollment_date: string;
  status: string;
  age: number;
  gender: string;
}

const statusClass = (status: string) => {
  if (status === "active") return "badge-success";
  if (status === "completed") return "badge-warning";
  return "badge-danger";
};

const ParticipantsPage: React.FC = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const load = () => {
    setLoading(true);
    setError("");
    api
      .get<Participant[]>("/participants/")
      .then(res => setParticipants(res.data))
      .catch(() => setError("Failed to load participants"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (participant_id: string) => {
    if (!confirm("Delete this participant?")) return;
    try {
      await api.delete(`/participants/${participant_id}`);
      setParticipants(prev => prev.filter(p => p.participant_id !== participant_id));
    } catch {
      alert("Failed to delete participant");
    }
  };

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Participants</h2>
          <p className="text-sm text-slate-400">
            Manage enrolled participants and their status.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary" onClick={load}>
            Refresh
          </button>
          <Link className="btn" to="/participants/new">
            + Add
          </Link>
        </div>
      </header>

      <nav className="mb-2">
        <Link className="text-sm text-indigo-400 hover:text-indigo-300" to="/">
          ← Back to dashboard
        </Link>
      </nav>

      {error && <p className="text-rose-400">{error}</p>}
      {loading && <p className="text-slate-400 text-sm">Loading...</p>}

      <div className="card overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Subject ID</th>
              <th>Group</th>
              <th>Status</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Enrollment</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {participants.map(p => (
              <tr key={p.participant_id}>
                <td className="font-mono text-xs md:text-sm">{p.subject_id}</td>
                <td className="capitalize">{p.study_group}</td>
                <td>
                  <span className={statusClass(p.status)}>{p.status}</span>
                </td>
                <td>{p.age}</td>
                <td>{p.gender}</td>
                <td>{p.enrollment_date}</td>
                <td>
                  <div className="flex justify-end gap-2">
                    <button
                      className="btn-secondary text-xs"
                      onClick={() => nav(`/participants/${p.participant_id}/edit`)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn text-xs bg-rose-600 hover:bg-rose-500"
                      onClick={() => handleDelete(p.participant_id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {participants.length === 0 && !loading && (
              <tr>
                <td colSpan={7} className="text-center text-slate-400 py-4">
                  No participants yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ParticipantsPage;
