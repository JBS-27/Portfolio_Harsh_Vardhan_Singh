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
          background: "#0a0a0a",
          color: "#f5f5f5",
        }}
      >
        <div style={{ fontSize: 22, letterSpacing: 4, color: "#22d3ee" }}>
          HVS · PORTFOLIO
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, lineHeight: 0.95, fontWeight: 700 }}>
            Harsh Vardhan
            <br />
            Singh
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
