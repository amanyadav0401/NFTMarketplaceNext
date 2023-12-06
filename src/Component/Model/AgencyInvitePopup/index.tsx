import React, { useState, useRef } from "react";
import { Modal, ModalContent, ModalBody, ModalHeader } from "@nextui-org/react";
import { FiX } from "react-icons/fi";
import { APIClient } from "@/utils/APIClient";
import { toast } from "react-hot-toast";
import { useUserStore } from "@/utils/Zustand";

interface AgencyInviteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AgencyInviteModal: React.FC<AgencyInviteModalProps> = ({
  isOpen,
  onClose,
}) => {

  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useUserStore()

  const handleSendInvite = async () => {
    //verify email
    if (!email) {
      toast.error("Please enter email")
      return
    }

    if (!(user?.userInformation as AgencyUser).subdomain) {
      toast.error("Please create subdomain first")
      return
    }

    //regex for email validation
    const emailRegex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/
    if (!emailRegex.test(email)) {
      toast.error("Please enter valid email")
      return
    }

    try {
      setLoading(true)

      const reqObj = {
        email: email
      }

      const res = await APIClient.post('auth/agency-invite-by-email', {
        json: reqObj,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      const resJson: any = await res.json()
      if (resJson.success) {
        toast.success("Invite sent successfully")
        onClose()
      }

    } catch (err: any) {
      const error = await err?.response?.json()
      toast.error(error?.message || "Something went wrong")
    }
    finally {
      setLoading(false)
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
                Enter Email ID to Invite a Brand
              </h2>
              {/* <p className="text-gray-600">
                {" "}
                <span className="font-semibold">{email}</span>
              </p> */}

              <div className="flex flex-col space-x-2 items-center mt-8 mb-8">
                <input autoComplete="new-password" className="border border-gray-300 w-96 h-12 rounded-md px-4 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Enter Email ID"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button onClick={handleSendInvite} disabled={loading} className="bg-[#E377FF] disabled:opacity-50 w-96 h-12 rounded-md text-white font-bold font-Avenir mt-5">
                  {loading ? "Sending..." : "Send Invite"}
                </button>

              </div>

            </ModalBody>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default AgencyInviteModal;
