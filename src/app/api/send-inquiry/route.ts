import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

/**
 * <ai_context>
 * Route handler to receive inquiry info and send a mail via Nodemailer
 * </ai_context>
 */

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(req: Request) {
  try {
    const { email, message } = await req.json();

    if (!email || !message) {
      return NextResponse.json(
        { error: "이메일 혹은 메시지가 누락되었습니다." },
        { status: 400 }
      );
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "jihwan.yun@hingoray.com, msj@hingoray.com, hrk@hingoray.com",
      subject: "문의사항 도착",
      html: `
        <div>
          <h2>문의가 도착했습니다.</h2>
          <p><strong>문의자 이메일:</strong> ${email}</p>
          <p><strong>문의 내용:</strong></p>
          <pre>${message}</pre>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("문의 메일 전송 실패:", error);
    return NextResponse.json(
      { error: "문의 메일 전송에 실패했습니다." },
      { status: 500 }
    );
  }
}
