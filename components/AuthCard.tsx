"use client";

import { FormEvent, useState } from "react";

export default function AuthCard() {
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    const res = await fetch("/api/v1/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ email, password }) });
    if (res.ok) {
      alert("Logged in successfully")
      window.location.href = "/";
    } else {
      alert("Login failed")
    }
  }

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault()
    const res = await fetch("/api/v1/auth/register", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ name, email, password, role: "USER"}) });
    if (res.ok) {
      alert('Registered and Logged in successfully');
      window.location.href = "/"
    } else {
      alert("Registration failed")
    }
  }

  const handleToggle = () => {
    setName("");
    setEmail("");
    setPassword("");
    setIsLogin(!isLogin);
  }

  const theme = isLogin
    ? {
      heading: "text-emerald-700",
      button: "bg-emerald-600 hover:bg-emerald-700",
      focus: "focus:border-emerald-600",
      link: "text-emerald-700",
    }
    : {
      heading: "text-blue-700",
      button: "bg-blue-600 hover:bg-blue-700",
      focus: "focus:border-blue-600",
      link: "text-blue-700",
    };

  return (
    <div className="flex justify-center items-center w-full max-w-md rounded-lg p-8 bg-white shadow-xl hover:shadow-2xl duration-150 delay-25 ease-in-out">
      <div className="w-full space-y-6">
        {/* Header */}
        <div className="text-center space-y-1">
          <h2 className={`text-xl font-semibold ${theme.heading}`}>
            {isLogin ? "Login" : "Register"}
          </h2>
          <p className="text-sm text-gray-500">
            {isLogin
              ? "Welcome back. Please sign in."
              : "Create an account to get started."}
          </p>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-4"
          onSubmit={(e) => { isLogin ? handleLogin(e) : handleRegister(e) }}>
          {!isLogin && (
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="text-sm">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`rounded-md border border-gray-400 px-3 py-2 text-sm focus:outline-none ${theme.focus}`}
              />
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`rounded-md border border-gray-400 px-3 py-2 text-sm focus:outline-none ${theme.focus}`}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`rounded-md border border-gray-400 px-3 py-2 text-sm focus:outline-none ${theme.focus}`}
            />
          </div>

          <button
            type="submit"
            className={`mt-2 rounded-md py-2 text-sm font-medium text-white transition ${theme.button}`}
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            type="button"
            onClick={handleToggle}
            className={`ml-1 font-medium hover:underline ${theme.link}`}
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}