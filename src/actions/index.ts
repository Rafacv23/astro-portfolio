import { ActionError, defineAction } from "astro:actions"
import { Resend } from "resend"

const resend = new Resend(import.meta.env.RESEND_API_KEY)

export const server = {
  send: defineAction({
    accept: "form",
    handler: async (formData) => {
      // Extraer datos del formulario
      const email = formData.get("email") as string
      const name = formData.get("name") as string
      const subject = formData.get("subject") as string
      const message = formData.get("message") as string

      if (!email || !subject || !message || !name) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "Todos los campos son requeridos.",
        })
      }

      const { data, error } = await resend.emails.send({
        from: "Rafa Canosa <noreply@rafacanosa.dev>",
        to: "rafacanosa@gmail.com",
        subject,
        html: `<h2>from: ${name}</h2><p>${message}</p>`,
      })

      if (error) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: error.message,
        })
      }

      // now we send a confirmation email to the user
      const confirmationEmail = await resend.emails.send({
        from: "Rafa Canosa <noreply@rafacanosa.dev>",
        to: [email], // Envía el correo a la dirección proporcionada
        subject: "Confirmación de contacto",
        html: `<h2>Hola${name}</h2><p>Gracias por contactar con nosotros. Le responderemos lo antes posible.</p>`,
      })

      if (confirmationEmail.error) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: confirmationEmail.error.message,
        })
      }

      return data
    },
  }),
}
