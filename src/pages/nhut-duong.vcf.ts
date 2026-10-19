import type { APIRoute } from "astro";
import { buildVCard } from "@/lib/vcard";

export const GET: APIRoute = () => {
  return new Response(buildVCard(), {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'attachment; filename="nhut-duong.vcf"',
    },
  });
};
