import { SignupContext } from "context/SignupContext";
import { useContext } from "react";

const useSignupContext = () => {
  const context = useContext(SignupContext);
  if (!context) {
    throw new Error("useSignupContext must be used within the SignupProvider");
  }
  return context;
};

export default useSignupContext;
