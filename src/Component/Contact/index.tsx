'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "@/Component/Model/InputField";
import toastError from "@/Component/Model/Toast";
import useWindowWidth from "@/Component/Model/useWindowWidth";
import { APIClient } from "@/utils/APIClient";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useUserStore } from "@/utils/Zustand";
import UpdatePassword from "@/Component/Model/UpdatePasswordModel";
import Image from "next/image";
import { IoArrowBackOutline } from "react-icons/io5";
import ReInput from "../Micro/ReInput";
import Nav from "../Navbar/Nav";
import Footer from "../Footer";

function ContactUs() {
  const router = useRouter();
  const { setUser, user } = useUserStore();
  const { isPhoneScreen } = useWindowWidth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async () => {
    if (!name || !email || !message) {
      toast.error("Please fill all fields");
      return;
    }

    //regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    try {
      setSending(true)
      const res: any = await APIClient.post("auth/contact-us", {
        json: {
          name,
          email,
          message
        }
      }).json();

      if (res.success) {
        toast.success("Message sent successfully");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        toast.error("Something went wrong");
      }
    }
    catch (err: any) {
      const error = await err?.response?.json()
      toast.error(error || 'Something went wrong')
    }
    finally {
      setSending(false)
    }
  }


  return (
    <>
      <div className="bg-[#3F2D6D] min-h-[calc(100vh-100px)] flex justify-center mt-[100px] items-center overflow-hidden">
        <Nav />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 md:min-h-[calc(100vh-100px)]  md:w-[95%]">
          <div className="md:hidden">
            <div className="text-white text-center mt-10 mb-10 font-bold text-4xl">
              NFT - World
            </div>
          </div>
          <div className="bg-gray-400 bg-opacity-40 flex justify-center rounded-xl flex-shrink-0 ml-2 mr-2">
            {/* <img src="/Images/Saly-10.svg" alt="Saly" /> */}
            <Image
              src="/Images/Saly-10.svg"
              alt="Saly"
              width={isPhoneScreen ? 200 : 600}
              height={isPhoneScreen ? 200 : 600}
            />
          </div>

          <div className="p-4 mt-20">
            <div className='hidden gap-[1rem] mb-10 md:flex items-center'>
              <IoArrowBackOutline onClick={() => {
                router.push('/')
              }} className="text-white cursor-pointer text-2xl" />
              <div onClick={() => {
                router.push('/')
              }} className="cursor-pointer  text-white font-bold text-4xl">
                NFT - World
              </div>
            </div>
            <>
              <h1 className="text-white font-bold text-2xl mt-5 mb-4">
                {" "}
                <span className="text-[#E377FF]">Contact</span> Us
              </h1>
              <ReInput
                label="Name"
                type="text"
                isDark={true}
                spaced={true}
                placeholder="Enter your Name"
                value={name}
                onChange={e => setName(e)}
              />
              <ReInput
                label="Email"
                type="email"
                isDark={true}
                spaced={true}
                placeholder="Enter your Email"
                value={email}
                onChange={e => setEmail(e)}
              />
              <ReInput
                label="Message"
                type="text"
                isArea={true}
                isDark={true}
                spaced={true}
                placeholder="Enter your Message"
                value={message}
                onChange={e => setMessage(e)}
              />

              {isPhoneScreen ? (
                <>
                  <div className="mt-40">
                    <button
                      className="w-full mt-5 text-center bg-[#E377FF] hover:bg-[#E377FF] text-white font-medium text-sm uppercase px-3 py-2 rounded"
                      onClick={handleSubmit}
                    >
                      {
                        sending ? 'Sending...' : 'Send'
                      }
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <button
                    className="w-full mt-5 text-center bg-[#E377FF] hover:bg-[#E377FF] text-white font-medium text-sm uppercase px-3 py-2 rounded"
                    onClick={handleSubmit}
                  >
                    {
                      sending ? 'Sending...' : 'Send'
                    }
                  </button>
                </>
              )}
            </>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ContactUs;
