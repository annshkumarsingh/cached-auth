import { pool } from "@/config/db";
import { redis } from "@/config/redis";
import { verifyToken } from "@/middleware/verifyToken";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        type AuthPayload = {
            userId: number;
            role: "user" | "admin";
        };

        // Verify token middleware
        const user = verifyToken(request) as AuthPayload;
        
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id") || null;

        const cacheKey = id ? `products:id:${id}` : "products:all";

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
        let data = id ? await pool.query("SELECT * from products WHERE id = $1", [id])
            : await pool.query("SELECT * from products")

        // Store in redis
        await redis.SETEX(cacheKey, 300, JSON.stringify(data.rows))

        // Return data
        return NextResponse.json({ success: true, data: data.rows, cached: false })
    } catch (err) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
}