import Protected from "../protected";

export default function DashboardPage() {
  return (
    <Protected>
      <div>
        <h1 className="text-2xl font-bold">Welcome to Admin Dashboard</h1>
        <p className="mt-2 text-gray-600">Here you can manage blogs, tools and more.</p>
      </div>
    </Protected>
  );
}
