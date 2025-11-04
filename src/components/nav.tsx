import Link from "next/link";
import { ModeToggle } from "./toggle-mode";

export function Header() {
  return (
    <header className="py-4">
      <nav className="flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">User Management System</Link>
        <ModeToggle/>
      </nav>
    </header>
  );
}