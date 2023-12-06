import React, { useState, useRef } from "react";
import { Modal, ModalContent, ModalBody, ModalHeader } from "@nextui-org/react";
import { FiX } from "react-icons/fi";
import { APIClient } from "@/utils/APIClient";
import { toast } from "react-hot-toast";

interface EmailVerificationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  email: string,
  handleSignup?: () => Promise<void>
}

const EmailVerificationPopup: React.FC<EmailVerificationPopupProps> = ({
  isOpen,
  onClose,
  email,
  handleSignup
}) => {

  const [securityCode, setSecurityCode] = useState<string[]>(["", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChangeSecurityCode = (index: number, value: string) => {
    const updatedSecurityCode = [...securityCode];
    if (value.length <= 1) {
      updatedSecurityCode[index] = value;
      setSecurityCode(updatedSecurityCode);

      // Focus the next input field
      if (value !== "" && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    }

    // Check if all inputs are filled
    if (!updatedSecurityCode.includes("")) {
      submitForVerification(updatedSecurityCode.join(""));
    }
  };

  const handleResendCode = () => {
    // Implement the logic to resend the security code
  };

  const submitForVerification = async (code: string) => {
    // Implement the logic to verify the security code
    try {

      const res: any = await APIClient.post('auth/verify-otp', {
        json: {
          email: email,
          otp: code
        }
      }).json()

      if (res.success) {
        toast.success("Email verified successfully")
        //signup
        await handleSignup?.()
        onClose()

      } else {
        toast.error("Invalid OTP")
      }

    } catch (err: any) {
      const error = await err.response.json();
      toast.error(error.message);
    }

  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <div className="fixed inset-0 flex items-center text-center justify-center bg-black bg-opacity-70 z-10">
          <div className="bg-white w-[600px] h-[500px] p-5 rounded-lg">
            <ModalBody>
              <div className="flex justify-end">
                <button onClick={onClose}>
                  <FiX className=" w-10 h-10 cursor-pointer" />
                </button>
              </div>
              <div className="flex justify-center">
                <img src="/Images/email.svg" alt="Email" />
              </div>
              <h2 className="text-xl font-semibold mt-2 mb-5">
                Verify Email ID
              </h2>
              <p className="text-gray-600">
                4-digit security code sent to{" "}
                <span className="font-semibold">{email}</span>
              </p>

              <div className="flex space-x-2 justify-center mt-8 mb-8">
                {Array.from({ length: 4 }).map((_, index) => (
                  <input
                    key={index}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    className="w-12 h-12 text-center border rounded bg-[#E3E3E3] shadow-xl"
                    maxLength={1}
                    value={securityCode[index]}
                    onChange={(e) => handleChangeSecurityCode(index, e.target.value)}
                  />
                ))}
              </div>
              <p
                className="text-gray-600 mb-4 mt-5 cursor-pointer"
                onClick={handleResendCode}
              >
                Did not receive the security code? <br />
                <span className="text-[#E377FF]"> Resend</span>
              </p>
            </ModalBody>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default EmailVerificationPopup;
