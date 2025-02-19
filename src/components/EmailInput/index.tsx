"use client";

import { Frame, Text } from "@/atoms";
import { colors } from "@/styles";

interface EmailInputProps {
  email: string;
  onChange: (email: string) => void;
}

const EmailInput = ({ email, onChange }: EmailInputProps) => {
  return (
    <Frame col gap={8}>
      <Text
        fontColor={colors.neutral[900]}
        fontSize={16}
        lineHeight="24px"
        fontWeight={500}
      >
        견적서를 받으실 이메일
      </Text>
      <input
        type="email"
        value={email}
        onChange={(e) => onChange(e.target.value)}
        placeholder="이메일 주소를 입력해주세요"
        style={{
          width: "100%",
          padding: "12px 16px",
          borderRadius: "8px",
          border: `1px solid ${colors.neutral[300]}`,
          fontSize: "16px",
          lineHeight: "24px",
          outline: "none",
        }}
      />
    </Frame>
  );
};

export default EmailInput;
