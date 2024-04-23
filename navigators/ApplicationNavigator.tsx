import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "screens/Auth/Login";
import GetStarted from "screens/Onboarding/GetStarted";
import Onboarding from "screens/Onboarding/Onboarding";
import type { ApplicationStackParamList } from "types/navigation";

import ForgotPasswordNavigator from "./ForgotPasswordNavigator";
import SignupNavigator from "./SignupNavigator";

const Stack = createStackNavigator<ApplicationStackParamList>();

const ApplicationNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="GetStarted" component={GetStarted} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="ForgotPasswordNavigation"
          component={ForgotPasswordNavigator}
        />
        <Stack.Screen name="SignupNavigator" component={SignupNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ApplicationNavigator;
