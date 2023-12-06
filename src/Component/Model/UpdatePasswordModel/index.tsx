import React, { useState } from "react";
import { APIClient } from "@/utils/APIClient";
import { Modal, ModalContent, ModalBody } from "@nextui-org/react";
import { FiX } from "react-icons/fi";
import { toast } from "react-hot-toast";
import InputField from "../InputField";
import toastError from "../Toast";

interface UpdatePasswordProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
}

const UpdatePassword: React.FC<UpdatePasswordProps> = ({
  isOpen,
  onClose,
}) => {
  const [email, setEmail] = useState("");

  const handleResendCode = () => {
    // Implement resend code logic here
  };

  const handleEmailSend = async () => {
    try {
      if (!email) {
        throw new Error("Please provide an email address.");
      }

      const res: any = await APIClient.post("auth/forgot-password", {
        json: {
          email,
          frontendURI: window.location.origin,
        },
      });

      if (!res) {
        throw new Error("No response received from the server.");
      }

      const responseData = await res.json();

      if (responseData.success) {
        console.log(responseData, "response");
        toast.success("Reset password link sent successfully");
        onClose();
      } else {
        toastError("Failed to send reset password link");
      }
    } catch (error) {
      toastError("An error occurred while sending the reset password link.");
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
                  <FiX className="w-10 h-10 cursor-pointer" />
                </button>
              </div>
              <div className="flex justify-center">
                <img src="/Images/email.svg" alt="Email" />
              </div>
              <h2 className="text-xl font-semibold">Reset Password</h2>
              <p className="text-gray-600">Reset Link will be shared to</p>
              <div className="flex justify-center mt-5">
                <InputField
                  label={""}
                  textColor="text-black"
                  type={"email"}
                  value={email}
                  placeholder="Enter Email ID"
                  onChange={(value: string) => setEmail(value)}
                />
              </div>
              <div className="flex justify-center">
                <button
                  className="bg-[#E377FF] hover:bg-[#E377FF] text-white font-medium text-sm uppercase px-3 py-2 rounded ml-2"
                  onClick={handleEmailSend}
                >
                  Send
                </button>
              </div>
              <p
                className="text-gray-600 mb-4 mt-5 cursor-pointer"
                onClick={handleResendCode}
              >
                Did not receive the security code? <br />
                <span className="text-[#E377FF]">Resend</span>
              </p>
            </ModalBody>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default UpdatePassword;
