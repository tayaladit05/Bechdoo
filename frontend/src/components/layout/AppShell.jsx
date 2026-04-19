const AppShell = ({ children }) => {
  return (
    <main className="app-shell">
      <div className="ambient-shape ambient-shape--left" aria-hidden="true" />
      <div className="ambient-shape ambient-shape--right" aria-hidden="true" />
      <div className="app-shell__content">{children}</div>
    </main>
  );
};

export default AppShell;
