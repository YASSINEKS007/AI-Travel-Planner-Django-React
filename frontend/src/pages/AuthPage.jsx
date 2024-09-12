import Background from "../components/ui/Background";
import AuthForms from "../components/AuthForms";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthPage = () => {
  const registerToast = () => {
    toast.success("Registered Successfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };
  return (
    <Background>
      <ToastContainer />
      <AuthForms registerToast={registerToast} />
    </Background>
  );
};
export default AuthPage;
