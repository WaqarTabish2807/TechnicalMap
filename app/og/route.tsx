import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { SITE } from "~/lib/config";

export const runtime = "edge";

// Social preview card for posts: /og?title=...&client=...
export function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = (searchParams.get("title") ?? SITE.name).slice(0, 140);
  const client = searchParams.get("client")?.slice(0, 40);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#ededed",
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(0,0,0,0.035) 0 2px, transparent 2px 14px)",
          color: "#171717",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 34 }}>{SITE.name}</span>
          {client && (
            <span
              style={{
                fontSize: 22,
                fontFamily: "sans-serif",
                fontWeight: 700,
                letterSpacing: 3,
                textTransform: "uppercase",
                padding: "8px 20px",
                borderRadius: 999,
                background: "linear-gradient(135deg, #FFFDF5 0%, #FCE8B3 50%, #F5CE6C 100%)",
                color: "#3D2602",
                border: "1px solid rgba(212, 158, 37, 0.5)",
              }}
            >
              {client}
            </span>
          )}
        </div>
        <div style={{ fontSize: title.length > 70 ? 60 : 76, lineHeight: 1.12, display: "flex" }}>
          {title}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            fontFamily: "sans-serif",
            color: "#525252",
          }}
        >
          <span>{SITE.author}</span>
          <span>{SITE.tagline}</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
