import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
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
import Toast from "react-native-toast-message";
import signup from "services/auth/signup";
import { z } from "zod";

type Props = {
  navigation: any;
};

type PersonalInfoInputs = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

const personalInfoScheema = z
  .object({
    email: z.string().email("Email must be a valid email address").trim(),
    firstName: z
      .string()
      .min(2, "First name must be at least 2 characters long")
      .trim(),
    lastName: z
      .string()
      .min(2, "Last name must be at least 2 characters long")
      .trim(),
    phone: z
      .string()
      .min(10, "Phone number must be at least 10 digits long")
      .trim(),
  })
  .required();

const PersonalInfo = ({ navigation }: Props) => {
  const { setSignupData, signupData } = useSignupContext();
  const mutation = useMutation({
    mutationFn: () => {
      return signup(signupData);
    },
    onError: () => {
      console.log("error");
      Toast.show({
        text1: "Signup failed",
        text2: "Please try again",
        type: "error",
      });
    },
    onSuccess: () => {
      console.log("success");
      Toast.show({
        text1: "Signup successful",
        text2: "You have successfully signed up!",
        type: "success",
      });
      setTimeout(() => {
        navigation.navigate("SignupOtp");
      }, 3000);
    },
  });

  const { email, firstName, lastName, phone } = signupData;
  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit,
    // register,
    // setValue,
    // watch,
  } = useForm<PersonalInfoInputs>({
    defaultValues: {
      email,
      firstName,
      lastName,
      phone,
    },
    resolver: zodResolver(personalInfoScheema),
  });

  const onSubmit: SubmitHandler<PersonalInfoInputs> = (data) => {
    // if (Object.keys(errors).length === 0) {
    setSignupData((prevState) => ({ ...prevState, ...getValues() }));
    navigation.navigate("SignupOtp");
    // mutation.mutate(signupData)
    // }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <BackArrow onClick={() => navigation.goBack()} />
      <View style={styles.contentWrapper}>
        <Text style={styles.header}>Personal information</Text>
        <Text style={styles.subheader}>
          Please fill the fields with your personal information and try to keep
          as accurate as possible
        </Text>
      </View>
      <View style={styles.formWrapper}>
        <View>
          <Controller
            control={control}
            render={({ field: { onBlur, onChange, value } }) => (
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  placeholder="First Name"
                  placeholderTextColor="#D9D8D6"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value || ""}
                />
              </View>
            )}
            name="firstName"
          />
          {errors.firstName && (
            <Text style={styles.errorMessages}>{errors.firstName.message}</Text>
          )}
        </View>
        <View>
          <Controller
            control={control}
            render={({ field: { onBlur, onChange, value } }) => (
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Last Name"
                  placeholderTextColor="#D9D8D6"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value || ""}
                />
              </View>
            )}
            name="lastName"
          />
          {errors.lastName && (
            <Text style={styles.errorMessages}>{errors.lastName.message}</Text>
          )}
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
                  value={value || ""}
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
        <View>
          <Controller
            control={control}
            render={({ field: { onBlur, onChange, value } }) => (
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Phone Number"
                  placeholderTextColor="#D9D8D6"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value || ""}
                />
              </View>
            )}
            name="phone"
          />
          {errors.phone && (
            <Text style={styles.errorMessages}>{errors.phone.message}</Text>
          )}
        </View>
      </View>
      <View style={styles.bc}>
        <Breadcrumbs />
        <Pressable style={styles.forwardArrow} onPress={handleSubmit(onSubmit)}>
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
  errorMessages: {
    color: "#E53935", // colors.alertRed,
    marginBottom: -12,
    marginTop: 12,
  },
  formWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
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

export default PersonalInfo;
