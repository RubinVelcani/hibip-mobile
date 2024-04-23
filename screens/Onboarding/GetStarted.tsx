import { NavigationProp } from "@react-navigation/native";
import GoogleLogo from "assets/icons/GoogleLogo.svg";
import heroImage from "assets/onboardingImages/getstarted.png";
import PrimaryButton from "components/UI/PrimaryButton";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type RootStackParamList = {
  Login: undefined;
  SignupNavigation: undefined;
  SSO: undefined;
};

type Props = {
  navigation: NavigationProp<RootStackParamList>;
};

const dimensions = Dimensions.get("window");

const GetStarted = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={heroImage} style={styles.image} />
      </View>
      <View style={styles.ctaWrapper}>
        <Text style={styles.title}>Let's get started</Text>
        <Text style={styles.subtitle}>
          Send your package with us, start registering as a member and get other
          benefits
        </Text>
        <PrimaryButton
          style={{ button: styles.primaryButtonExtraStyles }}
          label="Continue with email"
          onClick={() => navigation.navigate("Login")}
        />
        <Pressable
          style={styles.googleCta}
          onPress={() => navigation.navigate("Login")}
        >
          <GoogleLogo />
          <Text style={styles.ctaLabel}>Sign in with Google</Text>
        </Pressable>
        <View style={styles.signup}>
          <Text style={styles.signupText}>Don’t have an account? </Text>
          <Pressable>
            <Text
              style={styles.signupLink}
              onPress={() =>
                navigation.navigate("SignupNavigator", {
                  screen: "RoleSelection",
                })
              }
            >
              Sign Up
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: dimensions.width,
  },
  ctaLabel: {
    color: "#171717", // colors.darkGrey,
    fontWeight: "500",
    paddingVertical: 14,
  },
  ctaWrapper: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    marginHorizontal: "5%",
    marginTop: "6%",
  },
  googleCta: {
    alignItems: "center",
    borderColor: "#F3FFF0",
    borderRadius: 9,
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    gap: 9,
    justifyContent: "center",
    marginTop: 13,
    width: "100%",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  imageContainer: {
    height: dimensions.height / 2,
  },
  primaryButtonExtraStyles: {
    width: "100%",
  },
  signup: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    marginTop: "6%",
  },
  signupLink: {
    color: "#004D43", // colors.primaryButtonGreen,
  },
  signupText: {
    color: "#7A7A7A",
    lineHeight: 23,
  },
  subtitle: {
    color: "#111E2D", // colors.darkBlue,
    fontSize: 16,
    lineHeight: 27,
    textAlign: "center",
  },
  title: {
    color: "#111E2D", // colors.darkBlue,
    fontSize: 32,
    fontWeight: "500",
    lineHeight: 46,
    marginBottom: 20,
    textAlign: "center",
  },
});

export default GetStarted;
