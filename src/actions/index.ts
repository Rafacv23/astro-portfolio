import { ActionError, defineAction } from "astro:actions"
import { Resend } from "resend"

const resend = new Resend(import.meta.env.RESEND_API_KEY)

export const server = {
  send: defineAction({
    accept: "form",
    handler: async (formData) => {
      // Extraer datos del formulario
      const email = formData.get("email") as string
      const subject = formData.get("subject") as string
      const message = formData.get("message") as string

      if (!email || !subject || !message) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "Todos los campos son requeridos.",
        })
      }

      const { data, error } = await resend.emails.send({
        from: "Rafa Canosa <noreply@rafacanosa.dev>",
        to: [email], // Envía el correo a la dirección proporcionada
        subject,
        html: `<p>${message}</p>`,
      })

      if (error) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: error.message,
        })
      }

      return data
    },
  }),
}
