import { zodResolver } from "@hookform/resolvers/zod";
import GreenArrowRight from "assets/icons/GreenArrowRight.svg";
import LoginEmailIcon from "assets/icons/LoginEmailIcon.svg";
import Breadcrumbs from "components/Breadcrumbs";
import BackArrow from "components/UI/navigation/BackArrow";
import useForgotPasswordContext from "hooks/useForgotPasswordContext";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { z } from "zod";

type Props = {
  navigation: any;
};

type ForgotPasswordInputs = {
  email: string;
};

type ForgotPasswordOtpInputs = {
  otpCode: string;
};

const forgotPasswordEmailSchema = z.object({ email: z.string().email() });

const forgotPasswordOtpSchema = z.object({ otpCode: z.string().length(6) });

const ForgotPassword = ({ navigation }: Props) => {
  const { forgotPasswordData, setForgotPasswordData } =
    useForgotPasswordContext();
  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    setValue,
    watch,
  } = useForm<ForgotPasswordInputs>({
    defaultValues: {
      email: forgotPasswordData.email,
    },
    resolver: zodResolver(forgotPasswordEmailSchema),
  });

  const onSubmit = () => {
    const data = getValues();
    console.log(data);
    setForgotPasswordData((prevState) => ({ ...prevState, email: data.email }));
    navigation.navigate("ForgotPasswordOtp");
  };

  return (
    <View style={styles.container}>
      <BackArrow onClick={() => navigation.goBack()} />
      <View style={styles.contentWrapper}>
        <Text style={styles.header}>Forgot Password</Text>
        <Text style={styles.subheader}>
          Fill the email field with your account email
        </Text>
      </View>
      <View>
        <Controller
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.textInput}
                placeholder="Email"
                placeholderTextColor="#D9D8D6"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
              <View style={styles.inputIcon}>
                <LoginEmailIcon />
              </View>
            </View>
          )}
          name="email"
        />
        {errors.email && (
          <Text style={styles.errorMessages}>{errors.email.message}</Text>
        )}
      </View>
      <View style={styles.bc}>
        <Breadcrumbs />
        <Pressable style={styles.forwardArrow} onPress={handleSubmit(onSubmit)}>
          <GreenArrowRight />
        </Pressable>
      </View>
    </View>
  );
};

const ForgotPasswordOtp = ({ navigation }: Props) => {
  const { forgotPasswordData, setForgotPasswordData } =
    useForgotPasswordContext();

  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    setValue,
    watch,
  } = useForm<ForgotPasswordOtpInputs>({
    defaultValues: {
      otpCode: forgotPasswordData.otpCode,
    },
    resolver: zodResolver(forgotPasswordOtpSchema),
  });

  const onSubmit = () => {
    const data = getValues();
    setForgotPasswordData((prevState) => ({
      ...prevState,
      otpCode: data.otpCode,
    }));
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <BackArrow onClick={() => navigation.goBack()} />
      <View style={styles.contentWrapper}>
        <Text style={styles.header}>Forgot Password</Text>
        <Text style={styles.subheader}>
          A 6 digit code has been sent to #355*******99
        </Text>
      </View>
      <View style={styles.otpInputWrapper}>
        <Controller
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <OtpInput
              numberOfDigits={6}
              onTextChange={(text: string) => onChange(text)}
              focusColor="#0B4D43"
              focusStickBlinkingDuration={500}
              theme={otpConfig}
              // placeholder='- - - - - -'
              // placeholderTextColor='#111E2D'
              // onChangeText={onChange}
              // onBlur={onBlur}
              // value={value}
            />
          )}
          name="otpCode"
        />
        {errors.otpCode && (
          <Text style={styles.errorMessages}>{errors.otpCode.message}</Text>
        )}
        <Text style={styles.resendCode}>Resend code in 53 s</Text>
      </View>
      <View style={styles.bc}>
        <Breadcrumbs />
        <Pressable style={styles.forwardArrow} onPress={handleSubmit(onSubmit)}>
          <GreenArrowRight />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bc: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "auto",
  },
  container: { height: "100%", padding: 24 },
  contentWrapper: { marginBottom: 24, marginTop: 45, paddingRight: 40 },
  errorMessages: {
    color: "#E53935", // colors.alertRed,
    marginBottom: -12,
    marginTop: 12,
  },
  forwardArrow: {
    backgroundColor: "#0B4D43",
    borderRadius: 100,
    paddingHorizontal: 19,
    paddingVertical: 23,
  },
  header: {
    color: "#0B4D43", // colors.primaryButtonGreen,
    fontSize: 26,
    fontWeight: "700",
    lineHeight: 31,
    marginBottom: 16,
  },
  inputIcon: {
    marginLeft: "auto",
    marginRight: 20,
    paddingHorizontal: 3,
    paddingVertical: 1.7,
  },
  inputWrapper: {
    alignItems: "center",
    backgroundColor: "#FAFAFA", // colors.washedGray,
    borderRadius: 12,
    display: "flex",
    flexDirection: "row",
    gap: 12,
  },
  otpInputWrapper: {
    marginTop: 80,
  },
  pinCodeContainer: {
    backgroundColor: "#FAFAFA",
    borderColor: "#EEEEEE",
    borderRadius: 12,
    borderWidth: 1,
  },
  pinCodeText: {
    color: "#111E2D",
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 29,
  },
  resendCode: {
    color: "#111E2D",
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 28,
  },
  subheader: {
    color: "#111E2D", // colors.darkBlue,
    fontSize: 20,
    fontWeight: "500",
    lineHeight: 28,
  },
  textInput: {
    color: "#111E2D", // colors.darkBlue,
    paddingLeft: 20,
    paddingVertical: 20,
    width: "100%",
  },
});

const otpConfig = {
  containerStyle: styles.container,
  // inputsContainerStyle: styles.inputsContainer,
  pinCodeContainerStyle: styles.pinCodeContainer,
  pinCodeTextStyle: styles.pinCodeText,
  // focusStickStyle: styles.focusStick,
  // focusedPinCodeContainerStyle: styles.activePinCodeContainer,
};

export { ForgotPassword, ForgotPasswordOtp };
