import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

/**
 * <ai_context>
 * 스크린샷에 맞게 이메일 템플릿을 업데이트했습니다.
 * 로고, 예상 기간, 예상 견적, 개발 범위, 예산 범위, 상세 기능 범위, 경력자 참고사항 등을 포함합니다.
 * 이미지 경로를 수정했습니다.
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
      minDuration,
      maxDuration,
      totalMinCost,
      totalMaxCost,
      scopes,

      selectedOptions,
      additionalNotes,
    } = await req.json();

    // 쉼표로 구분된 텍스트 대신 HTML 리스트 아이템으로 변환
    const scopesHtml =
      scopes && scopes.length > 0
        ? scopes
            .map(
              (scope: string) =>
                `<li style="color: #101828; font-size: 12px; margin-bottom: 4px;">${scope}</li>`
            )
            .join("\n")
        : '<li style="color: #101828; font-size: 12px;">선택안됨</li>';

    // 예산 범위 (만원 단위)
    let budgetText = "아직 모르겠어요.";
    if (totalMinCost && totalMaxCost) {
      const formattedMinBudget = totalMinCost.toLocaleString("ko-KR") + "만원";
      const formattedMaxBudget = totalMaxCost.toLocaleString("ko-KR") + "만원";
      budgetText = `${formattedMinBudget} ~ ${formattedMaxBudget}`;
    }

    // 선택된 옵션들을 쉼표로 구분하는 대신 HTML 리스트 아이템으로 변환
    const selectedOptionsHtml =
      (selectedOptions || []).length > 0
        ? (selectedOptions || [])
            .map(
              (opt: any) =>
                `<li style="color: #101828; font-size: 12px; margin-bottom: 4px;">${opt.label.replace(
                  /,\s*/g,
                  ",<br/>"
                )}</li>`
            )
            .join("\n")
        : '<li style="color: #101828; font-size: 12px;">없음</li>';

    // 기간 범위 계산
    let durationRangeText = "약 " + minDuration + "~" + maxDuration + "개월";

    // selectedOptions에서 durationMin과 durationMax 추출
    if (selectedOptions && selectedOptions.length > 0) {
      const durationMin = selectedOptions[0].durationMin;
      const durationMax = selectedOptions[0].durationMax;

      if (durationMin && durationMax) {
        durationRangeText = `약 ${durationMin}~${durationMax}개월`;
      } else if (
        durationRangeText === "약 0~0개월" ||
        !durationMin ||
        !durationMax
      ) {
        durationRangeText = "약 13~26개월";
      }
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "jihwan.yun@hingoray.com, msj@hingoray.com, hrk@hingoray.com",
      subject: "흰고래 컴퍼니에 요청하신 개발 견적을 보내드립니다. 📝",
      html: `
        <div style="font-family: 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; color: #101828;">
          <!-- 로고 -->
          <div style="margin-bottom: 16px;">
            <img src="https://hingoray.com/images/logo/blackwhale.png" alt="흰고래 로고" width="45" height="20" />
          </div>

          <h1>from: ${email} 고객님</h1>
          
          <!-- 메인 타이틀 -->
          <h1 style="font-size: 24px; font-weight: 700; margin-bottom: 32px; line-height: 1.4;">
            흰고래 컴퍼니에<br />
            요청하신 개발 견적을 보내드립니다. 📝
          </h1>
          
          <!-- 견적 정보 카드 -->
          <div style="display: flex; flex-direction: row; gap: 16px; margin-bottom: 24px;">
            <!-- 예상 기간 카드 -->
            <div style="flex: 1; background-color: #F2F4F7; border-radius: 12px; padding: 20px;">
              <p style="color: #6B7280; font-size: 14px; margin: 0 0 8px 0;">예상 기간</p>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 20px; font-weight: 700;">${durationRangeText}</span>
                <img src="https://hingoray.com/images/logo/calendar.png" alt="캘린더" width="40" height="40" />
              </div>
              <p style="color: #6B7280; font-size: 14px; margin: 8px 0 0 0;">*개발 난이도 및 범위에 따라 변동될 수 있습니다.</p>
            </div>
            
            <!-- 예상 견적 카드 -->
            <div style="flex: 1; background-color: #F2F4F7; border-radius: 12px; padding: 20px;">
              <p style="color: #6B7280; font-size: 14px; margin: 0 0 8px 0;">예상 견적</p>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <span style="font-size: 20px; font-weight: 700;">${budgetText}</span>
                  <span style="font-size: 14px; color: #6B7280;">(부가세 별도)</span>
                </div>
                <img src="https://hingoray.com/images/logo/money.png" alt="돈" width="40" height="40" />
              </div>
              <p style="color: #6B7280; font-size: 14px; margin: 8px 0 0 0;">*실제 계약시 요구사항에 따라 변동될 수 있습니다.</p>
            </div>
          </div>
          
          <!-- 자세한 내용이 궁금하시다면 -->
          <div style="background-color: #2167F7; border-radius: 8px; padding: 19px 16px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
            <p style="font-size: 14px; font-weight: 500; margin: 0; color: #FFFFFF;">자세한 내용이 궁금하시다면!</p>
            <a href="https://hingoray.com/inquiry" style="background-color: #000000; color: #FFFFFF; border-radius: 6px; padding: 7px 12px; text-decoration: none; font-size: 14px; font-weight: 600;">커피챗 신청하기</a>
          </div>
          
          <!-- 개발 범위 -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #F0F3F8; border-radius: 12px; margin-bottom: 16px;">
            <tr>
              <td style="padding: 20px; position: relative;">
                <!-- 개발 범위 내용 -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="width: 85%;">
                      <!-- 개발 범위 -->
                      <p style="font-size: 14px; font-weight: 600; color: #101828; margin: 0 0 8px 0;">개발 범위:</p>
                      <ul style="margin: 0 0 16px 0; padding-left: 20px;">
                        ${scopesHtml}
                      </ul>
                      
                      <!-- 예산 범위 -->
                      <p style="font-size: 14px; font-weight: 600; color: #101828; margin: 0 0 8px 0;">예산 범위:</p>
                      <ul style="margin: 0 0 16px 0; padding-left: 20px;">
                        <li style="color: #101828; font-size: 12px;">${budgetText}</li>
                      </ul>
                      
                      <!-- 상세 기능 범위 -->
                      <p style="font-size: 14px; font-weight: 600; color: #101828; margin: 0 0 8px 0;">상세 기능 범위:</p>
                      <ul style="margin: 0; padding-left: 20px;">
                        ${selectedOptionsHtml}
                      </ul>
                    </td>
                    <td style="width: 15%; vertical-align: top; text-align: right;">
                      <!-- 스탬프 로고 -->
                      <img src="https://hingoray.com/images/logo/stamp.png" alt="스탬프" width="54" height="44" style="margin-top: 0;" />
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>

          ${
            additionalNotes
              ? `
              <div style="margin-top: 20px; padding: 16px; border-radius: 8px; background-color: #f1f5f9; margin-bottom: 20px;">
                <h3 style="margin: 0 0 8px 0; font-size: 18px;">추가 문의 사항</h3>
                <p style="margin: 0; white-space: pre-line; color: #000;">${additionalNotes}</p>
              </div>
            `
              : ""
          }
          
          <!-- 견적시 참고하세요 -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #FFFFFF; border: 1px solid #D0D5DD; border-radius: 12px; margin-bottom: 24px;">
            <tr>
              <td style="padding: 16px;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="vertical-align: top; width: 24px;">
                      <img src="https://hingoray.com/images/logo/warning.png" alt="경고" width="20" height="20" />
                    </td>
                    <td style="padding-left: 4px;">
                      <p style="font-size: 16px; font-weight: 600; margin: 0 0 8px 0;">견적시 참고하세요!</p>
                      <ul style="margin: 0; padding-left: 20px;">
                        <li style="color: #4B5563; font-size: 14px; margin-bottom: 4px;">
                          본 견적은 인건비, 제경비, 기술료 기술 포함도가 포함된 예상 금액으로 실제 금액과 상이할 수 있습니다.
                        </li>
                        <li style="color: #4B5563; font-size: 14px;">
                          PM 1명, UX/UI 디자이너 1명, 프론트엔드 1명, 백엔드 1명 기준으로 예상기간을 산정합니다.
                        </li>
                      </ul>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          
          
          
          <!-- 푸터 -->
          <div style="border-top: 1px solid #E5E7EB; padding-top: 16px; font-size: 12px; color: #6B7280; margin-top: 24px;">
            Hingoray Company | 71, Banpo-daero 14-gil, Seocho-gu, Seoul | info@hingoray.com | +82 10 8407 2469 | © 2024 Hingoray Company.
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
