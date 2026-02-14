import Link from "next/link"

export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#0a0a0a",
      color: "white",
      flexDirection: "column"
    }}>
      <h1 style={{ fontSize: "3rem" }}>
        AppBuilderAI 🚀
      </h1>

      <Link
        href="/dashboard"
        style={{
          marginTop: "30px",
          padding: "12px 24px",
          background: "white",
          color: "black",
          textDecoration: "none"
        }}
      >
        Enter Dashboard
      </Link>
    </main>
  )
}
