"use client"

import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <h2 className="sidebar-title">MenuBuilder</h2>

        <nav className="sidebar-nav">
          <Link href="/dashboard" className="sidebar-link active">
            Dashboard
          </Link>
          <Link href="/dashboard/history" className="sidebar-link">
            Menu History
          </Link>
          <Link href="/dashboard/settings" className="sidebar-link">
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1 className="dashboard-title">Welcome Back</h1>
          <Link href="/" className="new-menu-button">
            + Create New Menu
          </Link>
        </header>

        <section className="dashboard-section">
          <h2 className="section-title">Your Menus</h2>

          <div className="menu-grid">
            <div className="menu-card">
              <h3 className="menu-card-title">No menus yet</h3>
              <p className="menu-card-text">
                Upload your first PDF to get started.
              </p>
              <Link href="/" className="menu-card-button">
                Upload PDF
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
