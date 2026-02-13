"use client";

export const GooglePreview = ({ title }: { title: string }) => {
    const truncatedTitle = title.length > 60 ? title.substring(0, 57) + "..." : title;

    return (
        <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "100%" }}>
            {/* Breadcrumb */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px" }}>
                <div style={{
                    width: "28px",
                    height: "28px",
                    backgroundColor: "#f3f4f6",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    border: "1px solid #e5e7eb"
                }}>
                    <span style={{ fontSize: "10px", fontWeight: "bold", color: "#525252" }}>TTM</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: "14px", color: "#202124", fontWeight: 500, marginBottom: "2px" }}>
                        The Technical Map
                    </span>
                    <span style={{ fontSize: "12px", color: "#5f6368" }}>
                        https://thetechnicalmap.vercel.app › blog
                    </span>
                </div>
            </div>

            {/* Title */}
            <h3 style={{
                fontSize: "20px",
                lineHeight: "26px",
                color: "#1a0dab",
                fontWeight: "normal",
                marginBottom: "4px",
                cursor: "pointer",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
            }}>
                {truncatedTitle || "Your Awesome Blog Post Title Goes Here"}
            </h3>

            {/* Snippet */}
            <div style={{ fontSize: "14px", lineHeight: "22px", color: "#4d5156" }}>
                <span style={{ color: "#5f6368" }}>Jan 24, 2026 — </span>
                This is exactly how your post will look in search results.
                Google typically truncates titles after ~60 characters.
            </div>
        </div>
    );
};
