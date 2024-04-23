import { createStackNavigator } from "@react-navigation/stack";
import ForgotPasswordProvider from "context/ForgotPasswordContext";
import { ForgotPassword, ForgotPasswordOtp } from "screens/Auth/ForgotPassword";
import { ForgotPasswordStackParamList } from "types/navigation";

const Stack = createStackNavigator<ForgotPasswordStackParamList>();

const ForgotPasswordNavigator = () => {
  return (
    <ForgotPasswordProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="ForgotPasswordOtp" component={ForgotPasswordOtp} />
      </Stack.Navigator>
    </ForgotPasswordProvider>
  );
};

export default ForgotPasswordNavigator;
