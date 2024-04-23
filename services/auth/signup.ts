import { SignupContextType } from "context/SignupContext";
import { userSchema } from "types/schemas/user";

import { instance } from "../instance";

export default async (signupData: SignupContextType) => {
  const response = await instance
    .post("/register", { json: signupData })
    .json();
  console.log("response - ", response);
  return userSchema.parse(response);
};
