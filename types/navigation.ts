import type { StackScreenProps } from "@react-navigation/stack";

export type ApplicationStackParamList = {
  // Startup: undefined;
  // Example: undefined;
  Onboarding: undefined;
  GetStarted: undefined;
  Login: undefined;
  ForgotPasswordNavigation: ForgotPasswordStackParamList;
  SignupNavigator: SignupStackParamList;
};

export type ForgotPasswordStackParamList = {
  ForgotPassword: undefined;
  ForgotPasswordOtp: undefined;
};

export type SignupStackParamList = {
  RoleSelection: undefined;
  PersonalInfo: undefined;
  SignupOtp: undefined;
  Location: undefined;
  SignupCategories: undefined;
};

export type ApplicationScreenProps =
  StackScreenProps<ApplicationStackParamList>;
