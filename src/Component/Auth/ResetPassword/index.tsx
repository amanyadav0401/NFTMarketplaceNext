'use client'
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { APIClient } from "@/utils/APIClient";
import InputField from "@/Component/Model/InputField";
import { useSearchParams } from "next/navigation";

type Props = {};

const ResetPassword: React.FC<Props> = (props: Props) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const params = useSearchParams()
  const router = useRouter()

  const token = params.get('token')

  const handleNewPasswordChange = (value: string) => {
    setPassword(value);
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
  };

  if (!token) {
    router.push('/')
  }

  const resetPassword = async () => {
    try {
      if (!password || !confirmPassword) {
        toast.error("Please fill in all fields");
        return;
      }

      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      setLoading(true);

      const res: any = await APIClient.post("auth/reset-password", {
        json: {
          token,
          newPassword: password,
          confirmPassword,
        },
      }).json()

      if (!res) {
        throw new Error("No response received from the server.");
      }
      if (res.success) {
        toast.success("Password reset successfully! Redirecting to login page");
        router.push("/auth/register");
      } else {
        toast.error("Failed to reset password");
      }
    } catch (error) {
      toast.error("An error occurred while resetting the password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[100vh] w-[100vw] relative">
      <div className="h-[100vh] bg-[#3F2D6D] bg-opacity-40 absolute top-0 left-0 z-[1] w-[100vw] flex flex-col justify-center items-center">
        <div className="md:w-[40vw] w-[70vw] p-[2rem] pt-[1.5rem] py-[3rem] rounded-md bg-[#3F2D6D]">
          <div>
            <p className="text-white text-center mt-[1rem] text-2xl font-bold">
              Reset Password
            </p>
            <div className="flex flex-col items-center gap-[1rem] mt-[2rem]">
              <InputField
                label="New Password"
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={handleNewPasswordChange}
                labelColor="text-[#E377FF]"
              />
              <InputField
                label="Confirm Password"
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                labelColor="text-[#E377FF]"
              />
              <button
                disabled={loading}
                onClick={resetPassword}
                className="bg-[#E377FF] border rounded-lg w-40 h-10 text-white"
              >
                Reset Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
