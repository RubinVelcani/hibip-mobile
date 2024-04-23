import { ForgotPasswordContext } from "context/ForgotPasswordContext";
import { useContext } from "react";

const useForgotPasswordContext = () => {
  const context = useContext(ForgotPasswordContext);
  if (!context) {
    throw new Error(
      "useForgotPasswordContext must be used within the ForgotPasswordProvider",
    );
  }
  return context;
};

export default useForgotPasswordContext;
