import Link from "next/link";

function TeamPage() {
  return (
    <div className="border border-purple-600 rounded p-4">
      <p>Team Page</p>
      <Link href="/setting" className="text-blue-500 underline">Setting Page</Link>
    </div>
  );
}

export default TeamPage;