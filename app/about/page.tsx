export default function About() {
  return (
    <main className="bg-slate-50 min-h-screen flex justify-center items-start pt-28">
      <div className="w-4/5 max-w-2xl bg-white shadow-lg rounded-lg p-8 space-y-6">

        <h1 className="font-medium text-3xl text-center text-slate-700">
          About This Project
        </h1>

        <p className="text-gray-600 leading-relaxed">
          This project was built as part of Primetrade.ai&apos;s backend internship
          assignment. The primary objective is to design and implement a secure,
          scalable backend system while maintaining a clean separation between
          frontend and backend responsibilities.
        </p>

        <p className="text-gray-600 leading-relaxed">
          The application is built using <span className="font-medium">Next.js</span> for
          the frontend and API routes, <span className="font-medium">PostgreSQL</span> as the
          primary database, and <span className="font-medium">Redis</span> for caching to
          improve performance and reduce database load.
        </p>

        <p className="text-gray-600 leading-relaxed">
          Client-side response times are measured to highlight the difference
          between direct database queries and cached responses, making the
          performance impact of caching easy to observe.
        </p>

        <div className="pt-4 text-sm text-gray-500 border-t border-gray-200">
          Built as part of Primetrade.ai&apos;s Backend Developer Internship Assignment.
        </div>
      </div>
    </main>
  );
}