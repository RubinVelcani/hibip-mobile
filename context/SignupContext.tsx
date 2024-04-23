import { createContext, useState } from "react";

type Props = {
  children: React.ReactNode;
};

export type SignupContextType = {
  role: "customer" | "courier" | "";
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  otpVerified?: boolean;
  countryId?: string;
  cityId?: string;
  categories?: [string];
};

type SingupContextValue = {
  signupData: SignupContextType;
  setSignupData: React.Dispatch<React.SetStateAction<SignupContextType>>;
};

const defaultState: SignupContextType = {
  categories: [""],
  cityId: "",
  countryId: "",
  email: "",
  firstName: "",
  lastName: "",
  otpVerified: false,
  phone: "",
  role: "customer",
};

export const SignupContext = createContext<SingupContextValue>({
  setSignupData: () => defaultState,
  signupData: defaultState,
});

const SignupProvider = ({ children }: Props) => {
  const [signupData, setSignupData] = useState(defaultState);

  const value = { setSignupData, signupData };

  return (
    <SignupContext.Provider value={value}>{children}</SignupContext.Provider>
  );
};

export default SignupProvider;
