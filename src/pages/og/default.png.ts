import type { APIRoute } from "astro";
import { renderOGCard } from "@/components/og-card";

export const GET: APIRoute = async () => {
  const png = await renderOGCard({
    kicker: "Full Stack Developer & Consultant",
    title: "Nhut Duong",
    dot: true,
  });
  return new Response(new Uint8Array(png), {
    headers: { "Content-Type": "image/png" },
  });
};
