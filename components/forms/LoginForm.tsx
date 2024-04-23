import { zodResolver } from "@hookform/resolvers/zod";
import HideIcon from "assets/icons/HideIcon.svg";
import LoginEmailIcon from "assets/icons/LoginEmailIcon.svg";
import LoginPasswordIcon from "assets/icons/LoginPasswordIcon.svg";
import ShowIcon from "assets/icons/ShowIcon.svg";
import PrimaryButton from "components/UI/PrimaryButton";
import Checkbox from "expo-checkbox";
import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { View, TextInput, StyleSheet, Text, Pressable } from "react-native";
import { z } from "zod";

type LoginInputs = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const loginScheema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
  })
  .required();

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<LoginInputs>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginScheema),
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const onSubmit: SubmitHandler<LoginInputs> = (data) => console.log(data);

  return (
    <View>
      <View style={styles.formWrapper}>
        <Controller
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <>
              <View style={styles.inputWrapper}>
                <View style={styles.inputIcon}>
                  <LoginEmailIcon />
                </View>
                <TextInput
                  style={styles.textInput}
                  placeholder="Email"
                  placeholderTextColor="#D9D8D6"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              </View>
              {errors.email && (
                <Text style={styles.errorMessages}>{errors.email.message}</Text>
              )}
            </>
          )}
          name="email"
        />
        <Controller
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <>
              <View style={styles.inputWrapper}>
                <View style={styles.inputIcon}>
                  <LoginPasswordIcon />
                </View>
                <TextInput
                  style={styles.textInput}
                  placeholder="Password"
                  placeholderTextColor="#D9D8D6"
                  secureTextEntry={!showPassword}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
                <Pressable
                  style={styles.showPassword}
                  onPress={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <HideIcon color="#D9D8D6" />
                  ) : (
                    <ShowIcon color="#D9D8D6" />
                  )}
                </Pressable>
              </View>
              {errors.password && (
                <Text style={styles.errorMessages}>
                  {errors.password.message}
                </Text>
              )}
            </>
          )}
          name="password"
        />
      </View>
      <View style={styles.checkboxWrapper}>
        <Checkbox
          style={styles.checkbox}
          value={watch("rememberMe")}
          onValueChange={(value) => setValue("rememberMe", value)}
          color="#111E2D"
        />
        <Text style={styles.checkboxLabel}>Remember me</Text>
      </View>
      <PrimaryButton
        style={{ button: styles.submitButton }}
        label="Sign in"
        onClick={handleSubmit(onSubmit)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    borderRadius: 8,
    borderWidth: 2,
  },
  checkboxLabel: {
    color: "#111E2D", // colors.darkBlue,
  },
  checkboxWrapper: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
    marginTop: "2.6%",
  },
  errorMessages: {
    color: "#111E2D", // colors.darkBlue,
  },
  formWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
  inputIcon: {
    marginLeft: 20,
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
  showPassword: {
    marginLeft: "auto",
    marginRight: 20,
    paddingHorizontal: 1.7,
    paddingVertical: 3,
  },
  submitButton: {
    borderRadius: 100,
  },
  textInput: {
    color: "#111E2D", // colors.darkBlue,
    paddingVertical: 20,
  },
});

export default LoginForm;
