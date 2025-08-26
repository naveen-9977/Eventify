import { NextResponse } from "next/server";

export async function middleware(request) {
  const verifyToken = async (token) => {
    let req = await fetch("http://localhost:3000/api/verify", {
      body: JSON.stringify({ token }),
      method: "POST",
    });
    return req;
  };

  if (request.nextUrl.pathname.startsWith("/login")) {
    const token = request.cookies.get("token");

    if (token) {
      const response = await verifyToken(token.value);
      if (response.status == 200) {
        return NextResponse.redirect(new URL("/admin/contact", request.url)); // if token is vailed redirect the user
      }
    }
  }
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const token = request.cookies.get("token");

    if (token) {
      const response = await verifyToken(token.value);
      if (response.status != 200) {
        return NextResponse.redirect(new URL("/login", request.url)); // if token is vailed redirect the user
      }
    }
  }

  if (request.nextUrl.pathname == "/admin") {
    return NextResponse.redirect(new URL("/admin/services", request.url)); // if token is vailed redirect the user
  }
}
