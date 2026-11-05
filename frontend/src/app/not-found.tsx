import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16 bg-white">
      <span className="text-sm font-bold uppercase tracking-widest text-[#0d9488] mb-2">404 Error</span>
      <h1 className="text-4xl sm:text-5xl font-black text-[#1e3a5f] font-heading mb-4">
        Page Not Found
      </h1>
      <p className="text-gray-600 mb-8 max-w-md text-sm sm:text-base leading-relaxed">
        The page you are looking for does not exist or may have been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-xl bg-[#0d9488] hover:bg-teal-700 text-white font-bold transition shadow-sm"
      >
        Back to Home
      </Link>
    </div>
  );
}
