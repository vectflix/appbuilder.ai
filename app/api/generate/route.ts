import Groq from "groq-sdk"

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json()

    if (!process.env.GROQ_API_KEY) {
      return Response.json(
        { error: "Missing GROQ_API_KEY" },
        { status: 500 }
      )
    }

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY
    })

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are an expert full-stack developer. Return only clean production-ready code. No explanations."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3
    })

    return Response.json({
      output: completion.choices[0]?.message?.content || "No response"
    })
  } catch (error: any) {
    return Response.json(
      { error: error.message || "Unknown server error" },
      { status: 500 }
    )
  }
}
