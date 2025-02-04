import { Resend } from "resend"
import type { APIRoute } from "astro"

export const prerender = false

const resend = new Resend(import.meta.env.RESEND_API_KEY)

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData()

    const name = data.get("name")
    const email = data.get("email")
    const message = data.get("message")

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({
          message: "Missing required fields",
        }),
        { status: 400 }
      )
    }

    await resend.emails.send({
      from: "rafacv23@rafacanosa.dev",
      to: email,
      subject: subject,
      text: message,
    })

    return new Response(
      JSON.stringify({ message: "Email sent successfully" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}

export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify({ message: "Esta ruta solo acepta POST" }),
    { status: 405, headers: { "Content-Type": "application/json" } }
  )
}
