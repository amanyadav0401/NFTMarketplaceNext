"use client";
import EmailVerificationPopup from "@/Component/Model/EmailVerificationPopupModel";
import InputField from "@/Component/Model/InputField";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation"
import TermsAndConditions from "@/Component/Model/TermsAndCondition";
import toastError from "@/Component/Model/Toast";
import toast, { Toaster } from "react-hot-toast";
import { APIClient } from "@/utils/APIClient";
import { IoArrowBackOutline } from "react-icons/io5";

function Personalsignup() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const handleAcceptTerms = () => {
    setAcceptTerms(true);
    setShowTermsModal(false);
  };

  const handleCheckboxClick = () => {
    setAcceptTerms(false);
    setShowTermsModal(true);
  };

  const validate = () => {
    let valid = true;
    const newErrors = {
      username: "",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (username.trim() === "" || username.length < 3 || username.includes(" ")) {
      newErrors.username = "Username is required";
      valid = false;
    }

    if (name.trim() === "") {
      newErrors.name = "Name is required";
      valid = false;
    }

    if (
      //regex for email validation
      !/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(email.trim())
    ) {
      newErrors.email = "Invalid email address";
      valid = false;
    }

    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      valid = false;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleUsernameChange = (value: string) => {
    setUsername(value);
    setErrors((prevErrors) => ({ ...prevErrors, username: "" }));
  };

  const handleNameChange = (value: string) => {
    setName(value);
    setErrors((prevErrors) => ({ ...prevErrors, name: "" }));
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: "" }));
  };

  const handleCloseEmailVerification = () => {
    setShowEmailVerification(false);
  };

  const handleSubmit = async () => {
    if (validate() && acceptTerms) {
      // Submit the form or perform other actions

      const res: any = await APIClient.post('auth/send-otp', {
        json: {
          email: email
        }
      }).json()

      if (res.success) {
        toast.success("OTP sent successfully");
        setShowEmailVerification(true);
      } else {
        toastError("Something went wrong while sending OTP");
      }
    } else if (!acceptTerms) {
      toastError("Please accept the Terms and Conditions.");
    }
  };

  const handleSignup = async () => {
    try {
      const res: any = await APIClient.post('auth/register', {
        json: {
          username: username,
          email: email,
          password: password,
          role: "personal",
          confirmPassword: confirmPassword,
          name: name
        }
      }).json()

      if (res.success) {
        toast.success("Signup successful");
        router.push("/auth/login/personal");
      } else {
        toastError(res.message);
      }

    } catch (err: any) {
      const error = await err.response.json();
      toastError(error.message);
    }
  }

  return (
    <div className="bg-[#3F2D6D] min-h-screen flex justify-center items-center overflow-hidden">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 md:max-w-8xl">
        <div className="md:hidden">
          <div className=" text-white text-center mt-10 mb-10 font-bold text-4xl">NFT - World</div>
        </div>
        <div className="bg-gray-400 bg-opacity-40 flex justify-center rounded-xl flex-shrink-0 ml-2 mr-2">
          <img src="/Images/Saly-10.svg" alt="Saly" />
        </div>

        <div className="p-4 mt-5">
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
          <h1 className="text-white font-bold text-2xl mt-5 mb-4">
            <span className="text-[#E377FF]">SignUp</span> to Personal Account
          </h1>
          <InputField
            label="Username"
            type="text"
            placeholder="Enter your User Name"
            value={username}
            onChange={handleUsernameChange}
            error={errors.username}
          />
          <InputField
            label="Name"
            type="text"
            placeholder="Mention your Name"
            value={name}
            onChange={handleNameChange}
            error={errors.name}
          />
          <InputField
            label="Email ID"
            type="email"
            placeholder="Your  Email ID"
            value={email}
            onChange={handleEmailChange}
            error={errors.email}
          />
          <InputField
            label="Password"
            type="password"
            placeholder="8 digit min"
            value={password}
            onChange={handlePasswordChange}
            error={errors.password}
          />
          <InputField
            label="Confirm Password"
            type="password"
            placeholder="Rewrite the password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            error={errors.confirmPassword}
          />
          <label className="flex items-center gap-2 mt-3">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-[#E377FF] border-[#E377FF] cursor-pointer"
              checked={acceptTerms}
              onChange={handleCheckboxClick}
            />
            <span
              className="text-[#E377FF] cursor-pointer font-Avenir tracking-wide"
              onClick={() => {
                if (!acceptTerms) {
                  setShowTermsModal(true);
                }
              }}
            >
              Terms and Conditions
            </span>
          </label>
          <button
            className="w-full mt-5 text-center bg-[#E377FF] hover:bg-[#E377FF] text-white font-medium text-sm uppercase px-3 py-2 rounded"
            onClick={handleSubmit}
          >
            Sign Up
          </button>


          <div className="mt-20">
            <p className="text-[14px] text-white text-center">
              Already have an account?{" "}
              <Link href={"/auth/login/personal"} passHref>
                <span className="text-[#E377FF] cursor-pointer">
                  Login Here
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
      {showTermsModal && (
        <TermsAndConditions
          isOpen={showTermsModal}
          onClose={() => setShowTermsModal(false)}
          onAccept={handleAcceptTerms}
          size="lg"
        />
      )}
      {showEmailVerification && (
        <EmailVerificationPopup
          email={email}
          onClose={handleCloseEmailVerification}
          isOpen={showEmailVerification}
          handleSignup={handleSignup}
        />
      )}
    </div>
  );
}

export default Personalsignup;
