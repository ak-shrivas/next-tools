// app/admin/layout.tsx
import { ReactNode } from "react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-100 p-4">
        <h2 className="font-bold text-lg mb-4">Admin Panel</h2>
        <nav className="flex flex-col gap-2">
          <Link href="/admin/dashboard">Dashboard</Link>
          <Link href="/admin/blogs">Manage Blogs</Link>
        </nav>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
