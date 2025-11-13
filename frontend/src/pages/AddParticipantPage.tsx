import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/client";

const AddParticipantPage: React.FC = () => {
  const nav = useNavigate();
  const [form, setForm] = useState({
    subject_id: "",
    study_group: "treatment",
    enrollment_date: "",
    status: "active",
    age: 30,
    gender: "F",
  });
  const [error, setError] = useState("");

  const handleChange = (k: string, v: any) => setForm(prev => ({ ...prev, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/participants/", form);
      nav("/participants");
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Failed to save participant");
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <header className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Add participant</h2>
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
              value={form.subject_id}
              onChange={e => handleChange("subject_id", e.target.value)}
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="label">Study group</label>
              <select
                className="input"
                value={form.study_group}
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
                value={form.enrollment_date}
                onChange={e => handleChange("enrollment_date", e.target.value)}
              />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="label">Status</label>
              <select
                className="input"
                value={form.status}
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
                value={form.age}
                onChange={e => handleChange("age", Number(e.target.value))}
              />
            </div>
            <div>
              <label className="label">Gender</label>
              <select
                className="input"
                value={form.gender}
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
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddParticipantPage;
