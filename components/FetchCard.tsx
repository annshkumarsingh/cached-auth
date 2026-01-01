'use client';

import { useState } from "react";

export default function FetchCard() {
    type ApiResponse = {
        data?: unknown;
        cached?: boolean;
    };

    const [tbl, setTbl] = useState("");
    const [id, setId] = useState<number | "">("");
    const [responseTime, setResponseTime] = useState<number | null>(null);
    const [result, setResult] = useState<ApiResponse | null>(null);

    const tables = ["Users", "Tasks", "Products"];

    const handleFetch = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!tbl) return;

        const query = id ? `?id=${id}` : "";
        const url = `/api/v1/${tbl}${query}`;

        try {
            const start = performance.now();

            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include"
            });

            const data = await res.json();

            const end = performance.now();
            setResponseTime(end - start);
            setResult(data);

        } catch (err) {
            console.error("Error while fetching:", err);
        }
    };

    return (
        <>
            <form onSubmit={handleFetch} className="space-y-8 bg-white px-10 py-20 w-120 shadow-xl hover:shadow-2xl duration-150 delay-25 ease-in-out">
                {/* Table Name */}
                <div className="flex justify-between">
                    <label htmlFor="tableName" className="w-2/5">Table Name</label>
                    <select
                        id="tableName"
                        value={tbl}
                        onChange={(e) => setTbl(e.target.value)}
                        className="w-2/5 outline text-gray-600 outline-gray-300 hover:outline-gray-400 focus:outline-gray-400 duration-100 delay-25 rounded-sm"
                    >
                        <option value="">Select table</option>
                        {tables.map((t) => (
                            <option key={t.toLowerCase()} value={t.toLowerCase()}>
                                {t}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Item ID */}
                <div className="flex justify-between">
                    <label htmlFor="itemid" className="w-2/5">Item Id (optional)</label>
                    <input
                        id="itemid"
                        type="number"
                        placeholder="Enter item id"
                        value={id}
                        onChange={(e) =>
                            setId(e.target.value ? Number(e.target.value) : "")
                        }
                        className="w-2/5 pl-1 text-gray-600 outline outline-gray-300 hover:outline-gray-400 focus:outline-gray-400 duration-100 delay-25 rounded-sm placeholder-gray-600"
                    />
                </div>

                <button type="submit" disabled={!tbl} className="bg-emerald-600 hover:bg-emerald-500 cursor-pointer duration-100 delay-25 text-white w-full py-1 ">Fetch</button>
            </form>

            {/* Results Card */}
            {result && (
                <div className="mt-6 w-120 bg-white shadow-lg rounded-lg p-6 space-y-4">
                    <div className="flex justify-between items-center text-sm text-gray-600">
                        <div>
                            <span className="font-medium">Response time:</span>{" "}
                            <span className="text-emerald-600">
                                {responseTime?.toFixed(2)} ms
                            </span>
                        </div>

                        {result.cached ? (
                            <span className="px-2 py-1 rounded bg-emerald-100 text-emerald-700 text-xs font-medium">
                                Cached
                            </span>
                        ) : (
                            <span className="px-2 py-1 rounded bg-gray-100 text-gray-600 text-xs font-medium">
                                From DB
                            </span>
                        )}
                    </div>

                    {/* Divider */}
                    <hr className="border-gray-200" />

                    {/* Data */}
                    <div className="max-h-72 overflow-auto bg-gray-50 rounded p-4 text-sm font-mono text-gray-800">
                        <pre>{JSON.stringify(result.data ?? result, null, 2)}</pre>
                    </div>
                </div>
            )}

        </>
    );
}