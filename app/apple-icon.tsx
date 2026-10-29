import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Home-screen icon for iOS; matches app/icon.svg.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#171717",
          color: "#ededed",
          fontFamily: "serif",
          fontSize: 124,
        }}
      >
        <span style={{ lineHeight: 1 }}>M</span>
        <div style={{ width: 100, height: 8, borderRadius: 4, background: "#F5CE6C", marginTop: 6 }} />
      </div>
    ),
    size
  );
}
