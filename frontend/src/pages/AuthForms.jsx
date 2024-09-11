import { useState } from "react";
import AuthForm from "../components/AuthForm";

const AuthForms = () => {
  const [isSwapped, setIsSwapped] = useState(false);

  const handleSwap = () => {
    setIsSwapped(!isSwapped);
  };

  return (
    <div className="relative w-full flex justify-center items-center mt-10">
      <div
        className={`w-[500px] h-[500px] flex justify-center items-center bg-blue-500 text-white  cursor-pointer transform transition-transform duration-500 ${
          isSwapped ? "translate-x-[500px]" : ""
        }`}
      >
        <AuthForm />
      </div>

      {/* Right Div */}
      <div
        className={`w-[500px] h-[500px] flex justify-center items-center bg-blue-500 text-white  cursor-pointer transform transition-transform duration-500 ${
          isSwapped ? "-translate-x-[500px]" : ""
        }`}
      >
        <a
          href="#"
          onClick={handleSwap}
        >
          Click to Swap
        </a>
      </div>
    </div>
  );
};

export default AuthForms;
