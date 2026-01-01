import { NextResponse } from "next/server";
import { pool } from "@/config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
    try {
        const reqBody = await request.json();
        if (!reqBody) return NextResponse.json({ status: 400, error: "No request body attached." });

        const {name, email, password, role} = reqBody

        if (!email || !password || !name || !role) return NextResponse.json({ error: "All required fields are not provided." }, { status: 400 })

        const checkEmail = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (checkEmail.rows.length > 0) return NextResponse.json({ error: "A user with the same email already exists." }, {status: 400})

        // Password hashing
        const hashedPassword = await bcrypt.hash(password, 10)

        // User Insertion
        const allowedRoles = ["USER"]; // ADMIN role entries are seed only
        const safeRole = allowedRoles.includes(role) ? role : "user"; // Default role set to user
        const addedUser = await pool.query("INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id", [name, email, hashedPassword, safeRole])
        const addedUserId = addedUser.rows[0].id;

        // JWT token
        const token = jwt.sign({ userId: addedUserId, role: safeRole }, process.env.JWT_SECRET!, { expiresIn: "1h" })

        // Create and Send response
        const response = NextResponse.json({ message: "The user has been added to the database." }, { status: 200 })
        response.cookies.set("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            sameSite: "lax",
            maxAge: 3600, // 1 hour
        })
        return response;
    } catch (err) {
        return NextResponse.json({ status: 500, error: 'Internal server error' })
    }
}