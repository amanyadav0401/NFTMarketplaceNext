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

function Personallogin() {
  const router = useRouter();
  const { setUser, user } = useUserStore();

  const [username, setUsername] = useState("");
  const { isPhoneScreen } = useWindowWidth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showUpdatePassword, setShowUpdatePassword] = useState(false);

  const handleForgetPasswordClick = () => {
    setShowUpdatePassword(true);
  };

  const handleCloseUpdatePassword = () => {
    setShowUpdatePassword(false);
  };

  const validate = () => {
    let valid = true;
    const newErrors = {
      username: "",
      name: "",
      email: "",
      password: "",
      newPassword: "",
      confirmPassword: "",
    };

    if (username.trim() === "") {
      newErrors.username = "Username is required";
      valid = false;
    }

    // if (name.trim() === "") {
    //   newErrors.name = "Name is required";
    //   valid = false;
    // }

    // if (!/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(email.trim())) {
    //   newErrors.email = "Invalid email address";
    //   valid = false;
    // }

    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      valid = false;
    }

    if (newPassword !== confirmPassword) {
      newErrors.newPassword = "Passwords do not match";
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

  const handleNewPasswordChange = (value: string) => {
    setNewPassword(value);
    setErrors((prevErrors) => ({ ...prevErrors, newPassword: "" }));
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: "" }));
  };

  const handleSubmit = async () => {
    if (validate()) {
      try {
        const res: any = await APIClient.post("auth/login", {
          json: {
            username: username,
            password: password,
            role: "personal",
          },
        }).json();

        if (res.success) {
          toast.success("Login successful");
          localStorage.setItem("token", res.token);
          await setUser(res.token);
          router.push('/')
        } else {
          toastError("Invalid credentials");
        }
      } catch (err: any) {
        const error = await err.response.json();
        toastError(error.message);
      }
    }
  };

  const handleUpdatePassword = async () => {
    if (newPassword === confirmPassword) {
      try {
        const authToken = localStorage.getItem("token");
        const res: any = await APIClient.put("auth/update-password", {
          json: {
            newPassword: newPassword,
            confirmPassword: confirmPassword,
          },
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }).json();

        if (res.success) {
          toast.success("Password updated successfully");
        } else {
          toastError("Failed to update password");
        }
      } catch (err: any) {
        toastError("Failed to update password");
      }
    } else {
      setErrors({
        ...errors,
        newPassword: "Passwords do not match",
        confirmPassword: "Passwords do not match",
      });
    }
  };


  return (
    <div className="bg-[#3F2D6D] min-h-screen flex justify-center items-center overflow-hidden">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 md:max-w-8xl">
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
              <span className="text-[#E377FF]">Login</span> to Personal Account
            </h1>
            <InputField
              label="Username"
              type="text"
              placeholder="Enter your Name"
              value={username}
              onChange={handleUsernameChange}
              error={errors.username}
            />
            <InputField
              label="Password"
              type="password"
              placeholder="8 digit min"
              value={password}
              onChange={handlePasswordChange}
              error={errors.password}
            />
            <p className="text-white cursor-pointer">
              <span onClick={handleForgetPasswordClick}>
                Forget Password ?
              </span>
            </p>
            {isPhoneScreen ? (
              <>
                <div className="mt-40">
                  <button
                    className="w-full mt-5 text-center bg-[#E377FF] hover:bg-[#E377FF] text-white font-medium text-sm uppercase px-3 py-2 rounded"
                    onClick={handleSubmit}
                  >
                    Next
                  </button>
                </div>
                <div className="mt-10">
                  <p className="text-[14px] text-white text-center">
                    Need a New Account ?{" "}
                    <Link href={"/auth/signup/personal"} passHref>
                      <span className="text-[#E377FF] cursor-pointer">
                        Signup
                      </span>
                    </Link>
                  </p>
                </div>
              </>
            ) : (
              <>
                <button
                  className="w-full mt-5 text-center bg-[#E377FF] hover:bg-[#E377FF] text-white font-medium text-sm uppercase px-3 py-2 rounded"
                  onClick={handleSubmit}
                >
                  Next
                </button>

                <div className="mt-40">
                  <p className="text-[14px] text-white font-Avenir tracking-wide text-center">
                    Need a New Account ?{" "}
                    <Link href={"/auth/signup/personal"} passHref>
                      <span className="text-[#E377FF] font-Avenir tracking-wide cursor-pointer">
                        Signup
                      </span>
                    </Link>
                  </p>
                </div>
              </>
            )}
          </>
        </div>
      </div>
      <UpdatePassword
        isOpen={showUpdatePassword}
        onClose={handleCloseUpdatePassword}
        email={email}
      />
    </div>
  );
}

export default Personallogin;
