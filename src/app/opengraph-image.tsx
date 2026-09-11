import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/data";

export const runtime = "nodejs";
export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const portrait = await readFile(join(process.cwd(), "public/portrait.jpg"));
  const portraitSrc = `data:image/jpeg;base64,${portrait.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#000000",
          color: "#fff8ec",
        }}
      >
        <img
          src={portraitSrc}
          alt=""
          width={560}
          height={630}
          style={{
            width: 560,
            height: 630,
            objectFit: "cover",
            objectPosition: "center 18%",
          }}
        />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "56px 64px",
          }}
        >
          <div
            style={{
              fontSize: 18,
              letterSpacing: 6,
              color: "#f0c56a",
              textTransform: "uppercase",
            }}
          >
            ORBIT // 001
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 72,
                lineHeight: 0.9,
                fontWeight: 600,
                letterSpacing: -2,
              }}
            >
              <div>HARSH</div>
              <div>VARDHAN</div>
              <div>SINGH</div>
            </div>
            <div
              style={{
                marginTop: 22,
                fontSize: 26,
                lineHeight: 1.35,
                color: "#f0d9a4",
                maxWidth: 500,
              }}
            >
              {site.tagline}
            </div>
          </div>
          <div style={{ fontSize: 18, color: "#e4c37a" }}>{site.role}</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
