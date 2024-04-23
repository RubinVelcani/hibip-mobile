import { createStackNavigator } from "@react-navigation/stack";
import SignupProvider from "context/SignupContext";
import Location from "screens/Auth/Signup/Location";
import PersonalInfo from "screens/Auth/Signup/PersonalInfo";
import RoleSelection from "screens/Auth/Signup/RoleSelection";
import SignupCategories from "screens/Auth/Signup/SignupCategories";
import SignupOtp from "screens/Auth/Signup/SignupOtp";
import { SignupStackParamList } from "types/navigation";

const Stack = createStackNavigator<SignupStackParamList>();

const SignupNavigator = () => {
  return (
    <SignupProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="RoleSelection" component={RoleSelection} />
        <Stack.Screen name="PersonalInfo" component={PersonalInfo} />
        <Stack.Screen name="SignupOtp" component={SignupOtp} />
        <Stack.Screen name="Location" component={Location} />
        <Stack.Screen name="SignupCategories" component={SignupCategories} />
      </Stack.Navigator>
    </SignupProvider>
  );
};

export default SignupNavigator;
