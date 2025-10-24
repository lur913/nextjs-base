// app/otp-page.tsx
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";  // 如果你想在提交后导航
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function OTPPage() {
  const [otpValue, setOtpValue] = React.useState<string>("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted OTP:", otpValue);
    // 比如发送给后端
    router.push("/button");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md w-full">
        <h1 className="text-2xl font-bold">Enter Your OTP</h1>
        <InputOTP
          maxLength={6}
          value={otpValue}
          onChange={(value) => setOtpValue(value)}
          className="w-full"
        >
          {/* 假设我们分两组：3 位 + 分隔 + 3 位 */}
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={otpValue.length < 6}
        >
          Submit
        </button>

        {otpValue && (
          <div className="text-sm text-gray-600">
            Current value: <strong>{otpValue}</strong>
          </div>
        )}
      </form>
    </div>
  );
}
