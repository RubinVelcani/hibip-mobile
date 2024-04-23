import { useMutation, useQuery } from "@tanstack/react-query";
import CourierIcon from "assets/icons/CourierIcon.svg";
import CustomerIcon from "assets/icons/CustomerIcon.svg";
import TextLogo from "assets/icons/TextLogo.svg";
import PrimaryButton from "components/UI/PrimaryButton";
import BackArrow from "components/UI/navigation/BackArrow";
import { SignupContextType } from "context/SignupContext";
import { sign } from "crypto";
import useSignupContext from "hooks/useSignupContext";
import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  Dimensions,
  TouchableOpacity,
  Platform,
  ScrollView,
} from "react-native";
import { SvgProps } from "react-native-svg";
import Toast from "react-native-toast-message";
import signup from "services/auth/signup";
import { SIGNUP_QUERY_KEY } from "services/queryKeys";

type Props = {
  navigation: any;
};

const dimensions = Dimensions.get("window");

const roleCards = [
  {
    Icon: CustomerIcon,
    subtitle: "You want to send packs",
    title: "Customer User",
    value: "customer",
  },
  {
    Icon: CourierIcon,
    subtitle: "You send packs",
    title: "Courier",
    value: "courier",
  },
];

type Role = "customer" | "courier" | "";

type RoleProps = {
  title: string;
  subtitle: string;
  value: Role;
  Icon: React.FC<SvgProps>;
};

type RoleCardProps = {
  isSelected: boolean;
  role: RoleProps;
  onClick: () => void;
};

const RoleCard = ({ isSelected, onClick, role }: RoleCardProps) => {
  const Icon = role.Icon;

  return (
    <TouchableOpacity onPress={onClick}>
      <View
        style={[
          isSelected
            ? roleCardStyles.roleCardSelected
            : roleCardStyles.roleCard,
        ]}
      >
        <View style={roleCardStyles.icon}>{Icon && <Icon />}</View>
        <View>
          <Text style={roleCardStyles.title}>{role.title}</Text>
          <Text style={roleCardStyles.subtitle}>{role.subtitle}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const roleCardStyles = StyleSheet.create({
  icon: {
    backgroundColor: "#25CE7C",
    borderRadius: 100,
    padding: 21,
  },
  roleCard: {
    alignItems: "center",
    borderColor: "#25CE7C",
    borderRadius: 20,
    borderWidth: 2,
    display: "flex",
    flexDirection: "row",
    gap: 20,
    opacity: 0.4,
    padding: 24,
  },
  roleCardSelected: {
    alignItems: "center",
    borderColor: "#25CE7C",
    borderRadius: 20,
    borderWidth: 2,
    display: "flex",
    flexDirection: "row",
    gap: 20,
    opacity: 1,
    padding: 24,
  },
  subtitle: {
    color: "#25CE7C",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.2,
    lineHeight: 22,
  },
  title: {
    color: "#757575",
    fontSize: 18,
    fontWeight: "500",
    letterSpacing: 0.2,
    lineHeight: 25,
    marginTop: 2,
  },
});

const RoleSelection = ({ navigation }: Props) => {
  const { setSignupData, signupData } = useSignupContext();
  const [selectedRole, setSelectedRole] = useState<Role>("");

  const onClick = (role: Role) => setSelectedRole(role);

  const onSubmit = () => {
    if (!selectedRole) return;
    setSignupData((prevState: SignupContextType) => ({
      ...prevState,
      role: selectedRole,
    }));

    navigation.navigate("PersonalInfo");
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headerWrapper}>
          <BackArrow onClick={() => navigation.goBack()} />
          <Text style={styles.header}>Account Role</Text>
        </View>
        <View style={styles.contentWrapper}>
          <TextLogo />
          <Text style={styles.subheader}>
            Select an option based on you application use. If you're a Customer
            or a Corrier.
          </Text>
        </View>
        <View style={styles.cardWrapper}>
          {roleCards.map((role) => (
            <RoleCard
              key={role.value}
              isSelected={
                selectedRole === "" ? true : selectedRole === role.value
              }
              role={{ ...role, value: role.value as Role }}
              onClick={() => onClick(role.value as Role)}
            />
          ))}
        </View>
        <PrimaryButton
          style={{ button: styles.button, label: styles.buttonLabel }}
          onClick={onSubmit}
          label="Continue"
          disabled={selectedRole === ""}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 100,
    width: "100%",
    ...Platform.select({
      android: {
        elevation: 8,
      },
      ios: {
        shadowColor: "#101010",
        shadowOffset: {
          height: 8,
          width: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 24,
      },
    }),
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.2,
    lineHeight: 22,
  },
  buttonsWrapper: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: 15,
  },
  cardWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
  // centerLogo: {a
  // 	marginHorizontal: 'auto',
  container: { height: "100%", padding: 24, width: dimensions.width },
  contentWrapper: {
    alignItems: "center",
    display: "flex",
    gap: 68,
    marginBottom: 24,
    marginHorizontal: "auto",
    marginTop: 105,
    paddingRight: 40,
    width: dimensions.width - 24,
  },
  forwardArrow: {
    backgroundColor: "#0B4D43",
    borderRadius: 100,
    paddingHorizontal: 19,
    paddingVertical: 23,
  },
  header: {
    // color: '#211D1D',
    color: "#111E2D", // colors.darkBlue,
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 28,
  },
  headerWrapper: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: 16,
  },
  skipButton: {
    color: "#DDDDDD",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 20,
  },
  // },
  subheader: {
    alignSelf: "flex-start",
    color: "#111E2D", // colors.darkBlue,
    fontSize: 18,
    fontWeight: "500",
    letterSpacing: 0.2,
    lineHeight: 25,
  },
});

export default RoleSelection;
