import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import { AuthProvider } from "../context/AuthContext";
import { vi, describe, it, expect } from "vitest";

vi.mock("../api/client", () => ({
  default: {
    get: vi.fn().mockResolvedValue({
      data: {
        total: 3,
        by_status: { active: 2, completed: 1 },
        by_study_group: { treatment: 2, control: 1 },
      },
    }),
  },
}));

describe("DashboardPage", () => {
  it("renders heading and metrics", async () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <DashboardPage />
        </MemoryRouter>
      </AuthProvider>
    );

    expect(screen.getByText(/Clinical Trial Dashboard/i)).toBeInTheDocument();

    const totalCard = await screen.findByText("3");
    expect(totalCard).toBeInTheDocument();
  });
});
