import Link from "next/link";
import { AiFillCaretDown } from "react-icons/ai";


function AgencyNav() {
  return (
      <div
        style={{
          boxShadow: "0px 8px 16px rgba(255, 255, 255, 0.25)",
        }}
        className="h-[80px] z-[10] bg-purple-950 px-[2rem] fixed top-[0] left-[0] w-[100vw] cursor-pointer"
      >
        <div className="flex justify-between items-center mt-5">
          <div>
            <h4 className="font-Avenir font-semibold tracking-wide text-2xl text-white">
              NFT - World.one
            </h4>
          </div>
          <div className="flex items-center gap-10">
           
            <div>
              <Link href={"/auth/signup/agency"}>
                <div className="font-Avenir font-semibold tracking-wide text-white">
                  SignUp
                </div>
              </Link>
            </div>
            <div>
              <Link href={'/auth/login/agency'}>
                <div className="font-Avenir font-semibold tracking-wide text-white">
                  Login
                </div>
              </Link>
            </div>
            <div className="">
              <img
                src="/Images/Avatar.png"
                alt="A"
                className="w-10 h-10 rounded-full"
              />
            </div>
            {/* <div className="cursor-pointer">
                <MdOutlineShoppingCart className="text-white w-10 h-10"/>
            </div> */}
          </div>
        </div>
      </div>
  );
}

export default AgencyNav;
