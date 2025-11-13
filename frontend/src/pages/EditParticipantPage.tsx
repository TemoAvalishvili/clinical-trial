import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../api/client";

interface ParticipantForm {
  subject_id: string;
  study_group: string;
  enrollment_date: string;
  status: string;
  age: number;
  gender: string;
}

const EditParticipantPage: React.FC = () => {
  const { participantId } = useParams();
  const nav = useNavigate();
  const [form, setForm] = useState<ParticipantForm | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!participantId) return;
    api
      .get(`/participants/${participantId}`)
      .then(res => {
        const p = res.data;
        setForm({
          subject_id: p.subject_id,
          study_group: p.study_group,
          enrollment_date: p.enrollment_date,
          status: p.status,
          age: p.age,
          gender: p.gender,
        });
      })
      .catch(() => setError("Failed to load participant"));
  }, [participantId]);

  const handleChange = (k: keyof ParticipantForm, v: any) => {
    setForm(prev => (prev ? { ...prev, [k]: v } : prev));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form || !participantId) return;
    setError("");
    try {
      await api.put(`/participants/${participantId}`, form);
      nav("/participants");
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Failed to update participant");
    }
  };

  if (!form && !error) {
    return <p className="text-slate-400">Loading...</p>;
  }

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <header className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Edit participant</h2>
        <Link className="text-sm text-indigo-400 hover:text-indigo-300" to="/participants">
          ← Back to list
        </Link>
      </header>

      <div className="card">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="label">Subject ID</label>
            <input
              className="input"
              value={form?.subject_id ?? ""}
              onChange={e => handleChange("subject_id", e.target.value)}
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="label">Study group</label>
              <select
                className="input"
                value={form?.study_group ?? ""}
                onChange={e => handleChange("study_group", e.target.value)}
              >
                <option value="treatment">Treatment</option>
                <option value="control">Control</option>
              </select>
            </div>
            <div>
              <label className="label">Enrollment date</label>
              <input
                type="date"
                className="input"
                value={form?.enrollment_date ?? ""}
                onChange={e => handleChange("enrollment_date", e.target.value)}
              />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="label">Status</label>
              <select
                className="input"
                value={form?.status ?? ""}
                onChange={e => handleChange("status", e.target.value)}
              >
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="withdrawn">Withdrawn</option>
              </select>
            </div>
            <div>
              <label className="label">Age</label>
              <input
                type="number"
                className="input"
                value={form?.age ?? 0}
                onChange={e => handleChange("age", Number(e.target.value))}
              />
            </div>
            <div>
              <label className="label">Gender</label>
              <select
                className="input"
                value={form?.gender ?? ""}
                onChange={e => handleChange("gender", e.target.value)}
              >
                <option value="F">F</option>
                <option value="M">M</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          {error && <div className="text-sm text-rose-400">{error}</div>}
          <div className="flex justify-end gap-2 pt-2">
            <Link className="btn-secondary" to="/participants">
              Cancel
            </Link>
            <button type="submit" className="btn">
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditParticipantPage;
