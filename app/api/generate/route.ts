// app/api/generate/route.ts

import { runAgent } from "@/lib/agent"

export async function POST(req: Request) {
  const { messages } = await req.json()

  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const result = await runAgent(messages)

        // Send phase
        controller.enqueue(
          encoder.encode(
            JSON.stringify({
              type: "phase",
              phase: result.phase,
              estimated_time: result.estimated_time
            }) + "\n"
          )
        )

        // Send message
        controller.enqueue(
          encoder.encode(
            JSON.stringify({
              type: "message",
              content: result.message
            }) + "\n"
          )
        )

        // Send files if exist
        if (result.files) {
          controller.enqueue(
            encoder.encode(
              JSON.stringify({
                type: "files",
                files: result.files
              }) + "\n"
            )
          )
        }

        // Done
        controller.enqueue(
          encoder.encode(
            JSON.stringify({ type: "done" }) + "\n"
          )
        )

        controller.close()
      } catch (error: any) {
        controller.enqueue(
          encoder.encode(
            JSON.stringify({
              type: "error",
              message: error.message
            }) + "\n"
          )
        )
        controller.close()
      }
    }
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked"
    }
  })
}
