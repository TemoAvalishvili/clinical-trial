import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import ParticipantsPage from "./pages/ParticipantsPage";
import AddParticipantPage from "./pages/AddParticipantPage";
import EditParticipantPage from "./pages/EditParticipantPage";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";
import "./index.css";

const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="app-shell">
    <div className="mx-auto max-w-6xl px-4 py-8">{children}</div>
  </div>
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppShell>
                  <DashboardPage />
                </AppShell>
              </ProtectedRoute>
            }
          />
          <Route
            path="/participants"
            element={
              <ProtectedRoute>
                <AppShell>
                  <ParticipantsPage />
                </AppShell>
              </ProtectedRoute>
            }
          />
          <Route
            path="/participants/new"
            element={
              <ProtectedRoute>
                <AppShell>
                  <AddParticipantPage />
                </AppShell>
              </ProtectedRoute>
            }
          />
          <Route
            path="/participants/:participantId/edit"
            element={
              <ProtectedRoute>
                <AppShell>
                  <EditParticipantPage />
                </AppShell>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
