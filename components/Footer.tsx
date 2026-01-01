"use client";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-200 bg-slate-50">
      <div className="w-4/5 mx-auto py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
        
        {/* Left */}
        <div className="cursor-default">
          © {new Date().getFullYear()}{" "}
          <span className="text-emerald-600 font-semibold">CachedAuth</span>
        </div>

        {/* Center */}
        <div className="text-gray-500">
          PostgreSQL · Redis · Next.js
        </div>

        {/* Right */}
        <div className="flex gap-6">
          <span className="hover:text-emerald-600 cursor-default transition">
            Backend Practice Project
          </span>
        </div>
      </div>
    </footer>
  );
}