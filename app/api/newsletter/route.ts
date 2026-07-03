import { NextResponse } from "next/server"
import { z } from "zod"

const emailSchema = z.object({
  email: z.string().email("Invalid email address"),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email } = emailSchema.parse(body)

    const apiKey = process.env.RESEND_API_KEY
    const audienceId = process.env.NEWSLETTER_AUDIENCE_ID

    if (!apiKey || !audienceId) {
      return NextResponse.json(
        { error: "Newsletter service not configured" },
        { status: 503 }
      )
    }

    const res = await fetch("https://api.resend.com/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        email,
        audience_id: audienceId,
      }),
    })

    if (!res.ok) {
      const error = await res.json()
      if (error.statusCode === 400 && error.message?.includes("already")) {
        return NextResponse.json({ success: true, message: "Already subscribed" })
      }
      return NextResponse.json(
        { error: "Failed to subscribe" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
