import { Sidebar } from "@/components/admin/sidebar";

export const metadata = {
  title: "Athlete Mindset Admin",
  description: "Admin dashboard for managing visualization templates, breathwork techniques, and AOMI content",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="ml-64 flex-1 min-h-screen">
        {children}
      </main>
    </div>
  );
}
