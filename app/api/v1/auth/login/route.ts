import { NextResponse } from "next/server";
import { pool } from "@/config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
    try {
        const reqBody = await request.json();
        if (!reqBody) return NextResponse.json({ status: 400, error: "No request body attached." });

        const { email, password } = reqBody;

        if (!email || !password) return NextResponse.json({ error: "All required fields are not provided." }, { status: 400 })

        const checkUser = await pool.query("SELECT id, password_hash, role FROM users WHERE email = $1", [email]);
        if (checkUser.rows.length === 0) return NextResponse.json({ error: "Invalid login credentials" }, { status: 401 })

        const dbUser = checkUser.rows[0];
        const hashedPassword = checkUser.rows[0].password_hash;

        const match = await bcrypt.compare(password, hashedPassword);
        if (!match) return NextResponse.json({ error: "Invalid login credentials." }, { status: 401 })

        console.log(await bcrypt.hash("Admin@123", 10))

        // JWT signing
        const token = jwt.sign({ userId: dbUser.id, role: dbUser.role }, process.env.JWT_SECRET!, { expiresIn: "1h" })

        // Create and Send response
        const response = NextResponse.json({ message: "Successfully logged in." }, { status: 200 })
        response.cookies.set("access_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 3600, // 1 hour
            });
        return response;
    } catch (err) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}