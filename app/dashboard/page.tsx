"use client"

import { useState } from "react"

export default function Dashboard() {
  const [code, setCode] = useState("// AI generated code will appear here")

  return (
    <div style={{
      display: "flex",
      height: "100vh",
      background: "#0a0a0a",
      color: "white"
    }}>
      
      {/* Chat Panel */}
      <div style={{
        width: "30%",
        borderRight: "1px solid #222",
        padding: "20px"
      }}>
        <h2>AI Chat</h2>
        <textarea
          placeholder="Describe the app you want..."
          style={{
            width: "100%",
            height: "200px",
            marginTop: "20px",
            background: "#111",
            color: "white",
            border: "1px solid #333",
            padding: "10px"
          }}
        />
        <button
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            background: "white",
            color: "black",
            border: "none"
          }}
        >
          Generate
        </button>
      </div>

      {/* Code Panel */}
      <div style={{
        flex: 1,
        padding: "20px"
      }}>
        <h2>Code Output</h2>
        <pre style={{
          marginTop: "20px",
          background: "#111",
          padding: "20px",
          overflow: "auto",
          height: "80%"
        }}>
          {code}
        </pre>
      </div>

    </div>
  )
}
