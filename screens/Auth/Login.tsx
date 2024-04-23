import AppleLogo from "assets/icons/AppleLogo.svg";
import FacebookLogo from "assets/icons/FacebookLogo.svg";
import GoogleLogo from "assets/icons/GoogleLogo.svg";
import BackArrow from "components/UI/navigation/BackArrow";
import LoginForm from "components/forms/LoginForm";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  navigation: any;
};

const Login = ({ navigation }: Props) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <BackArrow onClick={() => navigation.goBack()} />
      <View style={styles.contentWrapper}>
        <Text style={styles.header}>Login to your account</Text>
        <LoginForm />
        <View style={styles.ctaWrapper}>
          <Pressable
            onPress={() =>
              navigation.navigate("ForgotPasswordNavigation", {
                screen: "ForgotPassword",
              })
            }
          >
            <Text style={styles.forgotPassword}>Forgot the password?</Text>
          </Pressable>
          <View style={styles.dividerWrapper}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.divider} />
          </View>
          <View style={styles.socialWrapper}>
            <TouchableOpacity style={styles.socialButton}>
              <FacebookLogo />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <GoogleLogo />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <AppleLogo />
            </TouchableOpacity>
          </View>
          <View style={styles.bottomWrapper}>
            <Text style={styles.bottomText}>Don't have an account?</Text>
            <Text
              onPress={() =>
                navigation.navigate("SignupNavigator", {
                  screen: "PersonalInfo",
                })
              }
              style={styles.bottomLink}
            >
              Sign up
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  bottomLink: {
    color: "#111E2D", // colors.darkBlue,
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.2,
    lineHeight: 20,
  },
  bottomText: {
    color: "#D9D8D6", // colors.lightGray,
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 0.2,
    lineHeight: 20,
  },
  bottomWrapper: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: 8,
    marginTop: "5.6%",
  },
  container: { padding: 24 },
  contentWrapper: { marginTop: 45 },
  ctaWrapper: {
    alignItems: "center",
    display: "flex",
  },
  divider: {
    backgroundColor: "#EEEEEE", // colors.lightGray,
    flex: 1,
    height: 1,
  },
  dividerText: {
    color: "#616161",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 0.2,
    lineHeight: 25,
  },
  dividerWrapper: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: 16,
    justifyContent: "space-evenly",
    marginTop: "5.6%",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  forgotPassword: {
    color: "#111E2D", // colors.darkBlue,
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.2,
    lineHeight: 22,
    marginTop: "2.6%",
  },
  header: {
    color: "#0B4D43", // colors.primaryButtonGreen,
    fontSize: 48,
    fontWeight: "700",
    lineHeight: 58,
    marginBottom: "5%",
  },
  socialButton: {
    borderColor: "#EEEEEE", // colors.lightGray,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 32,
    paddingVertical: 18,
  },
  socialWrapper: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: 20,
    justifyContent: "center",
    marginTop: 20,
  },
});

export default Login;
