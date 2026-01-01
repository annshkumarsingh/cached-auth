import { pool } from "@/config/db";
import { redis } from "@/config/redis";
import { verifyToken } from "@/middleware/verifyToken";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        type AuthPayload = {
            userId: number;
            role: "USER" | "ADMIN";
        };

        // Verify token middleware
        const user = verifyToken(request) as AuthPayload;

        // Role based access check
        if (user.role !== "ADMIN") {
            return NextResponse.json(
                { error: "Admin only access route" },
                { status: 403 }
            );
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id") || null;

        const cacheKey = id ? `users:id:${id}` : "users:all";

        // Check redis
        const cacheData = await redis.GET(cacheKey);
        if (cacheData) {
            // Refresh cache
            redis.DEL(cacheKey);
            redis.SETEX(cacheKey, 300, cacheData)

            // Return data
            return NextResponse.json({
                success: true,
                data: JSON.parse(cacheData),
                cached: true
            })
        }

        // Query postgres
        let data = id ? await pool.query("SELECT * from users WHERE id = $1", [id])
            : await pool.query("SELECT * from users")

        // Store in redis
        await redis.SETEX(cacheKey, 300, JSON.stringify(data.rows))

        // Return data
        return NextResponse.json({ success: true, data: data.rows, cached: false })
    } catch (err) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
}