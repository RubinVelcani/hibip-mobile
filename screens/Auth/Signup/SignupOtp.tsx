import { zodResolver } from "@hookform/resolvers/zod";
import GreenArrowRight from "assets/icons/GreenArrowRight.svg";
import LoginEmailIcon from "assets/icons/LoginEmailIcon.svg";
import Breadcrumbs from "components/Breadcrumbs";
import BackArrow from "components/UI/navigation/BackArrow";
import useSignupContext from "hooks/useSignupContext";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { z } from "zod";

type Props = {
  navigation: any;
};

type SignupOtpInputs = {
  otpCode: string;
};

const signupOtpScheema = z
  .object({
    otpCode: z.string().length(6),
  })
  .required();

const SignupOtp = ({ navigation }: Props) => {
  const { setSignupData, signupData } = useSignupContext();

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    setValue,
    watch,
  } = useForm<SignupOtpInputs>({
    defaultValues: {
      otpCode: "",
    },
    resolver: zodResolver(signupOtpScheema),
  });

  const onSubmit: SubmitHandler<SignupOtpInputs> = (data) => console.log(data);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <BackArrow onClick={() => navigation.goBack()} />
        <View style={styles.contentWrapper}>
          <Text style={styles.header}>Enter your 6 digit code</Text>
          <Text style={styles.subheader}>
            A 6 digit code has been sent to you to +355******99
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
            // rules={{ required: true }}
          />
          {/* <Controller
				control={control}
				render={({ field: { onChange, onBlur, value } }) => (
					<TextInput
						style={styles.otpInput}
						placeholder='- - - - - -'
						placeholderTextColor='#111E2D'
						onChangeText={onChange}
						onBlur={onBlur}
						value={value}
					/>
				)}
				name='otpCode'
				// rules={{ required: true }}
			/> */}
          {errors.otpCode && <Text>{errors.otpCode.message}</Text>}
          <Text style={styles.resendCode}>Resend code in 53 s</Text>
        </View>
      </View>
      <View style={styles.bc}>
        <Breadcrumbs />
        <Pressable
          style={styles.forwardArrow}
          onPress={() => navigation.navigate("Location")}
        >
          <GreenArrowRight />
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  bc: {
    alignItems: "center",
    // bottom: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    // margin: 20,
    // position: "absolute",
    marginVertical: 25,
    width: "100%",
  },
  container: { flex: 1, justifyContent: "space-between", padding: 24 },
  contentWrapper: { marginBottom: 24, marginTop: 45, paddingRight: 40 },
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
  otpContainer: { width: "100%" },
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
    marginTop: 10,
  },
  subheader: {
    color: "#111E2D", // colors.darkBlue,
    fontSize: 20,
    fontWeight: "500",
    lineHeight: 28,
  },
});

const otpConfig = {
  containerStyle: styles.otpContainer,
  // inputsContainerStyle: styles.inputsContainer,
  pinCodeContainerStyle: styles.pinCodeContainer,
  pinCodeTextStyle: styles.pinCodeText,
  // focusStickStyle: styles.focusStick,
  // focusedPinCodeContainerStyle: styles.activePinCodeContainer,
};

export default SignupOtp;
