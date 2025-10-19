import { redirect } from 'next/navigation';

export default function DashboardPage() {
  // For demonstration, redirect to the user dashboard.
  // In a real app, you'd determine the user's role and redirect accordingly.
  redirect('/dashboard/user');
}
