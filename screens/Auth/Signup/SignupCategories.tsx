import { useQuery } from "@tanstack/react-query";
import GreenArrowRight from "assets/icons/GreenArrowRight.svg";
import Logistics from "assets/icons/Logistics.svg";
import Breadcrumbs from "components/Breadcrumbs";
import BackArrow from "components/UI/navigation/BackArrow";
import useSignupContext from "hooks/useSignupContext";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ImageSourcePropType,
  ScrollView,
} from "react-native";
import Toast from "react-native-toast-message";
import signup from "services/auth/signup";
import { SIGNUP_QUERY_KEY } from "services/queryKeys";

const categories = [
  { id: 1, image: Logistics, title: "Pizza" },
  { id: 2, image: Logistics, title: "Burgers" },
  { id: 3, image: Logistics, title: "Chinese" },
  { id: 4, image: Logistics, title: "Indian" },
  { id: 5, image: Logistics, title: "Mexican" },
  { id: 6, image: Logistics, title: "Thai" },
  { id: 7, image: Logistics, title: "Japanese" },
  { id: 8, image: Logistics, title: "Mediterranean" },
  { id: 9, image: Logistics, title: "Vegan" },
  { id: 10, image: Logistics, title: "Desserts" },
  { id: 11, image: Logistics, title: "Beverages" },
  { id: 12, image: Logistics, title: "Breakfast" },
  { id: 13, image: Logistics, title: "Lunch" },
  { id: 14, image: Logistics, title: "Dinner" },
];

type CategoryCardProps = {
  title: string;
  image: ImageSourcePropType;
  onClick: () => void;
  isSelected: boolean;
};

const CategoryCard = ({
  image,
  isSelected,
  onClick,
  title,
}: CategoryCardProps) => {
  return (
    <Pressable
      style={
        isSelected
          ? categoryStyles.selectedCategoryCard
          : categoryStyles.categoryCard
      }
      onPress={onClick}
    >
      <Logistics style={categoryStyles.categoryImage} width={10} height={50} />
      <Text
        style={
          isSelected
            ? categoryStyles.selectedCategoryCardText
            : categoryStyles.categoryCardText
        }
      >
        {title}
      </Text>
    </Pressable>
  );
};

const categoryStyles = StyleSheet.create({
  categoryCard: {
    backgroundColor: "#FAFAFA",
    borderRadius: 23,
    flex: 1,
    height: 270,
    paddingHorizontal: 16,
    paddingVertical: 14,
    position: "relative",
  },
  categoryCardText: {
    color: "#9E9E9E",
    fontSize: 22,
    fontWeight: "700",
    lineHeight: 26,
  },
  categoryImage: {
    bottom: 0,
    left: 0,
    margin: "auto",
    position: "absolute",
    right: 0,
    top: 0,
  },
  selectedCategoryCard: {
    backgroundColor: "#0B4D43",
    borderRadius: 23,
    flex: 1,
    height: 270,
    paddingHorizontal: 16,
    paddingVertical: 14,
    position: "relative",
  },
  selectedCategoryCardText: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "700",
    lineHeight: 26,
  },
});

type Props = {
  navigation: any;
};

const SignupCategories = ({ navigation }: Props) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { setSignupData, signupData } = useSignupContext();
  const { data, isFetching, isSuccess } = useQuery({
    enabled: false,
    queryFn: () => {
      return signup(signupData);
    },
    queryKey: [SIGNUP_QUERY_KEY],
  });

  useEffect(() => {
    if (isSuccess) {
      Toast.show({
        text1: "Signup successful",
        text2: "You have successfully signed up!",
        type: "success",
      });
    } else {
      Toast.show({
        text1: "Signup failed",
        text2: "Please try again",
        type: "error",
      });
    }
  }, [isSuccess, data]);

  const evenData = categories?.filter(({ id }) => id % 2 === 0);
  const oddData = categories?.filter(({ id }) => id % 2 !== 0);

  const categoryClickHandler = (selectedCategory) => {
    const isAlreadySelected = !!selectedCategories.find(
      (category) => category.id === selectedCategory.id,
    );
    if (!isAlreadySelected) {
      setSelectedCategories((prevState) => [...prevState, selectedCategory]);
    } else {
      setSelectedCategories((prevState) =>
        prevState.filter((category) => category.id !== selectedCategory.id),
      );
    }
  };

  console.log(selectedCategories);

  const onSubmit = () => {
    setSignupData((prevState) => {
      return { ...prevState, categories: selectedCategories };
    });

    console.log(signupData);
  };

  return (
    <View style={styles.container}>
      <BackArrow onClick={() => navigation.goBack()} />
      <View style={styles.contentWrapper}>
        <Text style={styles.header}>Select Categories</Text>
        <Text style={styles.subheader}>
          Please select your categories so we can help you by focusing on your
          interests.
        </Text>
      </View>
      <ScrollView>
        {/* <ScrollView contentContainerStyle={{ backgroundColor: "#DDDD" }}> */}
        <View style={styles.staggerContainer}>
          <View style={styles.categoryColumn}>
            {evenData.map((item: any) => (
              <CategoryCard
                key={item.title}
                title={item.title}
                image={item.image}
                onClick={() => categoryClickHandler(item)}
                isSelected={selectedCategories.find(
                  (category) => category.id === item.id,
                )}
              />
            ))}
          </View>
          <View style={styles.categoryColumn}>
            {oddData.map((item: any) => (
              <CategoryCard
                key={item.title}
                title={item.title}
                image={item.image}
                onClick={() => categoryClickHandler(item)}
                isSelected={selectedCategories.find(
                  (category) => category.id === item.id,
                )}
              />
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={styles.bc}>
        <Breadcrumbs />
        <Pressable
          style={styles.forwardArrow}
          onPress={() => {
            onSubmit();
            navigation.navigate("Login");
          }}
        >
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
  buttonsWrapper: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: 15,
  },
  categoryColumn: { flex: 1, gap: 10 },
  container: { flex: 1, padding: 24, width: "100%" },
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
  staggerContainer: {
    flexDirection: "row",
    gap: 10,
  },
  subheader: {
    color: "#111E2D", // colors.darkBlue,
    fontSize: 20,
    fontWeight: "500",
    lineHeight: 28,
  },
});

export default SignupCategories;
