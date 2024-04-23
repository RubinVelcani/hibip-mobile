import { zodResolver } from "@hookform/resolvers/zod";
import GreenArrowRight from "assets/icons/GreenArrowRight.svg";
import SelectChevDown from "assets/icons/SelectChevDown.svg";
import SelectChevUp from "assets/icons/SelectChevUp.svg";
import Breadcrumbs from "components/Breadcrumbs";
import BackArrow from "components/UI/navigation/BackArrow";
import useSignupContext from "hooks/useSignupContext";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { View, StyleSheet, Text, Pressable, TextInput } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { z } from "zod";

type Props = {
  navigation: any;
};

type LocationInputs = {
  state: string;
  city: string;
};

const locationScheema = z
  .object({
    city: z.string().min(2),
    state: z.string().min(2),
  })
  .required();

const countries = [
  { label: "Italy", value: "italy" },
  { label: "Germany", value: "germany" },
  { label: "United Kingdom", value: "unitedkingdom" },
  { label: "France", value: "france" },
  { label: "Netherlands", value: "netherlands" },
];

const italianCities = [
  { label: "Rome", value: "rome" },
  { label: "Milan", value: "milan" },
  { label: "Naples", value: "naples" },
  { label: "Turin", value: "turin" },
  { label: "Palermo", value: "palermo" },
];

const germanCities = [
  { label: "Berlin", value: "berlin" },
  { label: "Hamburg", value: "hamburg" },
  { label: "Munich", value: "munich" },
  { label: "Cologne", value: "cologne" },
  { label: "Frankfurt", value: "frankfurt" },
];

const ukCities = [
  { label: "London", value: "london" },
  { label: "Birmingham", value: "birmingham" },
  { label: "Manchester", value: "manchester" },
  { label: "Glasgow", value: "glasgow" },
  { label: "Liverpool", value: "liverpool" },
];

const frenchCities = [
  { label: "Paris", value: "paris" },
  { label: "Marseille", value: "marseille" },
  { label: "Lyon", value: "lyon" },
  { label: "Toulouse", value: "toulouse" },
  { label: "Nice", value: "nice" },
];

const dutchCities = [
  { label: "Amsterdam", value: "amsterdam" },
  { label: "Rotterdam", value: "rotterdam" },
  { label: "Utrecht", value: "utrecht" },
  { label: "Eindhoven", value: "eindhoven" },
  { label: "Tilburg", value: "tilburg" },
];

const pickerStyles = StyleSheet.create({
  iconContainer: {
    right: 20,
    top: 27,
  },
  inputAndroid: {
    backgroundColor: "#FAFAFA",
    borderRadius: 12,
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  inputIOS: {
    backgroundColor: "#FAFAFA",
    borderRadius: 12,
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
});

const Location = ({ navigation }: Props) => {
  const { setSignupData, signupData } = useSignupContext();

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    setValue,
    watch,
  } = useForm<LocationInputs>({
    defaultValues: {
      city: "",
      state: "",
    },
    resolver: zodResolver(locationScheema),
  });

  const onSubmit: SubmitHandler<LocationInputs> = (data) => console.log(data);

  const editedPickerStyles = {
    ...pickerStyles,
    inputAndroid: {
      ...pickerStyles.inputAndroid,
      color: watch("city") ? "#111E2D" : "#9E9E9E",
    },
    inputIOS: {
      ...pickerStyles.inputIOS,
      color: watch("city") ? "#111E2D" : "#9E9E9E",
    },
  };

  return (
    <View style={styles.container}>
      <BackArrow onClick={() => navigation.goBack()} />
      <View style={styles.contentWrapper}>
        <Text style={styles.header}>Select Location</Text>
        <Text style={styles.subheader}>
          Please select your state and location so we can show you filtered
          items based on it
        </Text>
      </View>
      <Controller
        control={control}
        render={({ field: { onBlur, onChange, value } }) => (
          <RNPickerSelect
            onValueChange={onChange}
            placeholder={{ label: "Select state", value: null }}
            style={editedPickerStyles}
            Icon={SelectChevDown}
            useNativeAndroidPickerStyle={false}
            items={countries}
          />
        )}
        name="state"
      />
      <Controller
        control={control}
        render={({ field: { onBlur, onChange, value } }) => (
          <RNPickerSelect
            onValueChange={onChange}
            placeholder={{ label: "Select city", value: null }}
            style={editedPickerStyles}
            Icon={SelectChevDown}
            useNativeAndroidPickerStyle={false}
            items={
              watch("countries") === "italy"
                ? italianCities
                : watch("countries") === "germany"
                  ? germanCities
                  : watch("countries") === "unitedkingdom"
                    ? ukCities
                    : watch("countries") === "france"
                      ? frenchCities
                      : watch("countries") === "netherlands"
                        ? dutchCities
                        : italianCities
            }
          />
        )}
        name="city"
      />
      <View style={styles.bc}>
        <Breadcrumbs />
        <View style={styles.buttonsWrapper}>
          <Pressable onPress={() => navigation.navigate("SignupCategories")}>
            <Text style={styles.skipButton}>Skip</Text>
          </Pressable>
          <Pressable
            style={styles.forwardArrow}
            onPress={() => navigation.navigate("SignupCategories")}
          >
            <GreenArrowRight />
          </Pressable>
        </View>
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
  buttonsWrapper: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: 15,
  },
  container: { height: "100%", padding: 24 },
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
  skipButton: {
    color: "#DDDDDD",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 20,
  },
  subheader: {
    color: "#111E2D", // colors.darkBlue,
    fontSize: 20,
    fontWeight: "500",
    lineHeight: 28,
  },
});

export default Location;
