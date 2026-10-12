import { NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error("Missing RESEND_API_KEY environment variable.")
      return NextResponse.json(
        { error: "El servidor de correo no está configurado correctamente." },
        { status: 500 }
      )
    }

    const resend = new Resend(apiKey)
    const body = await request.json()
    const { name, email, message } = body

    // Validación básica de campos obligatorios
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Todos los campos obligatorios (nombre, email, mensaje) son requeridos." },
        { status: 400 }
      )
    }

    const senderEmail = process.env.CONTACT_SENDER_EMAIL || "onboarding@resend.dev"
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || "trvinternacional@gmail.com"

    // Enviar el correo usando Resend
    const { data, error } = await resend.emails.send({
      from: `Formulario de Contacto <${senderEmail}>`,
      to: receiverEmail,
      subject: `Nuevo mensaje de ${name}`,
      replyTo: email, // Permite responder al correo directamente al usuario
      text: `Nombre: ${name}\nEmail: ${email}\nMensaje:\n${message}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 30px; color: #2d3748; max-width: 600px; margin: 20px auto; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);">
          <div style="text-align: center; margin-bottom: 25px;">
            <h2 style="color: #1b2a67; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.025em;">TRVSite</h2>
            <p style="color: #4a5568; margin: 5px 0 0 0; font-size: 14px;">Nuevo mensaje de contacto recibido</p>
          </div>
          
          <hr style="border: 0; border-top: 1px solid #edf2f7; margin-bottom: 25px;" />
          
          <div style="margin-bottom: 20px;">
            <p style="margin: 0 0 6px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #718096; font-weight: 600;">Remitente</p>
            <p style="margin: 0; font-size: 16px; font-weight: 500; color: #1a202c;">${name}</p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <p style="margin: 0 0 6px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #718096; font-weight: 600;">Correo Electrónico</p>
            <p style="margin: 0; font-size: 16px; font-weight: 500; color: #4460b8;"><a href="mailto:${email}" style="color: #4460b8; text-decoration: none; border-bottom: 1px dashed #4460b8;">${email}</a></p>
          </div>
          
          <div style="margin-bottom: 25px;">
            <p style="margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #718096; font-weight: 600;">Mensaje</p>
            <div style="padding: 16px; border-left: 4px solid #f1d16b; background-color: #f7fafc; border-radius: 4px 8px 8px 4px;">
              <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #2d3748; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          
          <hr style="border: 0; border-top: 1px solid #edf2f7; margin-top: 25px; margin-bottom: 20px;" />
          
          <div style="text-align: center;">
            <p style="font-size: 11px; color: #a0aec0; margin: 0;">Este correo fue generado automáticamente por TRVSite utilizando Resend.</p>
            <p style="font-size: 11px; color: #a0aec0; margin: 5px 0 0 0;">Puedes hacer clic en "Responder" para contestar directamente a ${name}.</p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error("Resend API Error:", error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, data }, { status: 200 })
  } catch (err: any) {
    console.error("Internal Server Error in contact API:", err)
    return NextResponse.json(
      { error: "Ocurrió un error inesperado al procesar tu solicitud." },
      { status: 500 }
    )
  }
}
