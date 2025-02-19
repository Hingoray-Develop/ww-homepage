import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(req: Request) {
  try {
    const { email, totalDuration, totalCost } = await req.json();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "웹사이트 개발 견적 안내",
      html: `
        <div style="font-family: 'Apple SD Gothic Neo', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #1a1a1a; font-size: 24px; margin-bottom: 30px;">웹사이트 개발 견적 안내</h1>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #1a1a1a; font-size: 18px; margin-bottom: 15px;">예상 기간</h2>
            <p style="color: #1a1a1a; font-size: 24px; font-weight: bold; margin: 0;">약 ${totalDuration}개월</p>
            <p style="color: #6b7280; font-size: 14px; margin-top: 5px;">희망 기간: 4개월</p>
          </div>

          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
            <h2 style="color: #1a1a1a; font-size: 18px; margin-bottom: 15px;">예상 견적</h2>
            <p style="color: #1a1a1a; font-size: 24px; font-weight: bold; margin: 0;">약 ${totalCost.toLocaleString()}원</p>
            <p style="color: #6b7280; font-size: 14px; margin-top: 5px;">(부가세 별도)</p>
          </div>

          <div style="margin-top: 30px; color: #6b7280; font-size: 14px;">
            <p>* 본 견적은 기본적인 기준으로 산출된 예상 금액입니다.</p>
            <p>* 실제 계약 시 요구사항에 따라 금액이 변동될 수 있습니다.</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("이메일 전송 실패:", error);
    return NextResponse.json(
      { error: "이메일 전송에 실패했습니다." },
      { status: 500 }
    );
  }
}
