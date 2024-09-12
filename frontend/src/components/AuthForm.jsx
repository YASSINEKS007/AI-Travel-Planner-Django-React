import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthForm = ({ formType, handleSwap, registerToast }) => {
  return (
    <div className="w-full h-full flex justify-center items-center bg-white shadow-lg">
      {formType === "register" ? (
        <RegisterForm
          formType={formType}
          handleSwap={handleSwap}
          registerToast={registerToast}
        />
      ) : (
        <LoginForm
          formType={formType}
          handleSwap={handleSwap}
        />
      )}
      ;
    </div>
  );
};

export default AuthForm;
