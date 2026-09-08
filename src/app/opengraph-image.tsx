import { ImageResponse } from "next/og";
import { site } from "@/lib/data";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#000000",
          color: "#f4f4f5",
        }}
      >
        <div style={{ fontSize: 20, letterSpacing: 6, color: "#22d3ee" }}>
          ORBIT // 001
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 86,
              lineHeight: 0.88,
              fontWeight: 500,
            }}
          >
            <div>HARSH</div>
            <div>SINGH</div>
          </div>
          <div style={{ marginTop: 24, fontSize: 28, color: "#a3a3a3", maxWidth: 860 }}>
            {site.tagline}
          </div>
        </div>
        <div style={{ fontSize: 20, color: "#737373" }}>{site.role}</div>
      </div>
    ),
    { ...size },
  );
}
