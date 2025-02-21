import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

/**
 * <ai_context>
 * Updated: formatting budgetRange and cost range as "xxx만원 ~ xxx만원" by dividing by 10000
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
    const {
      email,
      totalDuration,
      totalMinCost,
      totalMaxCost,
      scopes,
      budgetRange,
      selectedOptions,
    } = await req.json();

    const scopesText =
      scopes && scopes.length > 0 ? scopes.join(", ") : "선택안됨";

    // 예산 범위 (만원 단위)
    let budgetText = "아직 모르겠어요.";
    if (budgetRange) {
      const [rawMin, rawMax] = budgetRange;
      const formattedMinBudget = rawMin.toLocaleString("ko-KR") + "만원";
      const formattedMaxBudget = rawMax.toLocaleString("ko-KR") + "만원";
      budgetText = `${formattedMinBudget} ~ ${formattedMaxBudget}`;
    }

    const selectedOptionsText = (selectedOptions || [])
      .map((opt: any) => opt.label)
      .join(", ");

    // 총 비용 범위 (만원 단위)
    const minMan = Math.round(totalMinCost / 10000);
    const maxMan = Math.round(totalMaxCost / 10000);
    const formattedMinCost = minMan.toLocaleString("ko-KR") + "만원";
    const formattedMaxCost = maxMan.toLocaleString("ko-KR") + "만원";

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "웹사이트 개발 견적 안내",
      html: `
        <div style="font-family: 'Apple SD Gothic Neo', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #1a1a1a; font-size: 24px; margin-bottom: 30px;">웹사이트 개발 견적 안내</h1>

          <div style="background-color: #f1f5f9; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
            <h3 style="margin: 0 0 8px 0; font-size: 18px;">선택하신 개발 범위</h3>
            <p style="margin: 0; color: #000;">${scopesText}</p>
          </div>

          <div style="background-color: #f1f5f9; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
            <h3 style="margin: 0 0 8px 0; font-size: 18px;">선택하신 예산 범위</h3>
            <p style="margin: 0; color: #000;">${budgetText}</p>
          </div>

          <div style="background-color: #f1f5f9; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
            <h3 style="margin: 0 0 8px 0; font-size: 18px;">선택하신 상세 기능</h3>
            <p style="margin: 0; color: #000;">${
              selectedOptionsText || "없음"
            }</p>
          </div>

          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #1a1a1a; font-size: 18px; margin-bottom: 15px;">예상 기간</h2>
            <p style="color: #1a1a1a; font-size: 24px; font-weight: bold; margin: 0;">약 ${totalDuration}개월</p>
            <p style="color: #6b7280; font-size: 14px; margin-top: 5px;">(개발 난이도 및 범위에 따라 변동 가능)</p>
          </div>

          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
            <h2 style="color: #1a1a1a; font-size: 18px; margin-bottom: 15px;">예상 견적 범위</h2>
            <p style="color: #1a1a1a; font-size: 24px; font-weight: bold; margin: 0;">약 ${formattedMinCost} ~ ${formattedMaxCost}</p>
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