"use client"

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();

    const handleLogout = async() => {
        const res = await fetch("api/v1/auth/logout", {method: "POST", credentials: "include"})
        if(res.ok){
            alert("Successfully logged out")
            window.location.href = "/login"
        }
    }

    return (
        <nav className="flex w-4/5 h-15 mx-auto justify-between items-center">
            <div className="text-2xl text-slate-600 cursor-default">
                Cached <span className="text-emerald-600 font-bold">Auth</span>
            </div>
            <div className="flex items-center gap-10">
                <div className={`hover:text-emerald-600 ${pathname == "/" ? "text-emerald-600" : ""} duration-100 delay-25 cursor-pointer`}>
                    <Link href='/'>Home</Link>
                </div>
                <div className={`hover:text-emerald-600 ${pathname == "/about" ? "text-emerald-600" : ""} duration-100 delay-25 cursor-pointer`}>
                    <Link href='/about'>About</Link>
                </div>
                <div className={`hover:text-emerald-600 ${pathname == "/login" ? "text-emerald-600" : ""} duration-100 delay-25 cursor-pointer`}>
                    <Link href="/login">Login</Link>
                </div>
                <div className="hover:text-emerald-600 duration-100 delay-25 cursor-pointer">
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </nav>
    );
}
