import jwt from "jsonwebtoken";

export function verifyToken(request: Request) {
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) throw new Error("Unauthorized");

  const token = cookieHeader
    .split("; ")
    .find(c => c.startsWith("access_token="))
    ?.split("=")[1];

  if (!token) throw new Error("Unauthorized");

  return jwt.verify(token, process.env.JWT_SECRET!);
}