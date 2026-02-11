"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

interface MenuRecord {
  id: string
  restaurant_name: string
  created_at: string
}

export default function MenuHistoryPage() {
  const [menus, setMenus] = useState<MenuRecord[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadMenus() {
      const res = await fetch("/api/menus")
      const data = await res.json()
      setMenus(data.menus || [])
      setLoading(false)
    }
    loadMenus()
  }, [])

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <h2 className="sidebar-title">MenuBuilder</h2>

        <nav className="sidebar-nav">
          <Link href="/dashboard" className="sidebar-link">
            Dashboard
          </Link>
          <Link href="/dashboard/history" className="sidebar-link active">
            Menu History
          </Link>
          <Link href="/dashboard/settings" className="sidebar-link">
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1 className="dashboard-title">Menu History</h1>
        </header>

        {loading ? (
          <p>Loading menus…</p>
        ) : menus.length === 0 ? (
          <p>No menus found. Upload your first PDF!</p>
        ) : (
          <table className="history-table">
            <thead>
              <tr>
                <th>Restaurant</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {menus.map(menu => (
                <tr key={menu.id}>
                  <td>{menu.restaurant_name}</td>
                  <td>{new Date(menu.created_at).toLocaleDateString()}</td>
                  <td className="history-actions">
                    <Link href={`/dashboard/menu/${menu.id}`} className="history-btn">
                      View
                    </Link>

                    <button
                      className="history-btn"
                      onClick={() => regenerateMenu(menu.id)}
                    >
                      Regenerate
                    </button>

                    <button
                      className="history-btn"
                      onClick={() => downloadMenu(menu.id)}
                    >
                      Download HTML
                    </button>

                    <Link
                      href={`/embed/${menu.id}`}
                      className="history-btn"
                      target="_blank"
                    >
                      Embed Script
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  )
}

async function regenerateMenu(id: string) {
  await fetch(`/api/menus/${id}/regenerate`, { method: "POST" })
  alert("Menu regenerated!")
}

async function downloadMenu(id: string) {
  window.location.href = `/api/menus/${id}/download`
}
