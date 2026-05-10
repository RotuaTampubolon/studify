import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="text-center max-w-xl">
        <h1 className="text-5xl font-bold text-indigo-600 mb-4">Studify</h1>
        <p className="text-gray-600 text-lg mb-8">
          Platform produktivitas untuk mahasiswa. Kelola tugas, raih target.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/login"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-indigo-50 transition"
          >
            Register
          </Link>
        </div>
      </div>
    </main>
  );
}
