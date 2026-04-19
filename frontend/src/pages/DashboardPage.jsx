import { useAuth } from "../features/auth/context/AuthContext";

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <section className="dashboard-card">
      <h1>Dashboard</h1>
      <p>This is your protected area.</p>
      <div className="dashboard-meta">
        <p><strong>Name:</strong> {user?.name || "-"}</p>
        <p><strong>Email:</strong> {user?.email || "-"}</p>
        <p><strong>Org Domain:</strong> {user?.orgDomain || "-"}</p>
      </div>
    </section>
  );
};

export default DashboardPage;
