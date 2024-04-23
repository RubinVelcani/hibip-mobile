import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";

const Breadcrumbs = () => {
  const navigation = useNavigation();

  const [stackScreens, setStackScreens] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const getNavigationState = async () => {
        const state = await navigation.getState();
        const { index, routeNames } = state;
        setStackScreens(routeNames);
        setCurrentIndex(index);
      };

      const unsubscribe = navigation.addListener("state", () => {
        getNavigationState();
      });

      getNavigationState();

      return unsubscribe;
    }, [navigation]),
  );

  return (
    <View style={styles.container}>
      {stackScreens.map((stack, index) => {
        const isActive = index === currentIndex;
        return (
          <View
            style={[styles.breadcrumb, isActive && styles.activeBreadcrumb]}
            key={stack}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  activeBreadcrumb: {
    backgroundColor: "#0B4D43", // colors.primaryButtonGreen,
    borderRadius: 30,
    height: 5,
    width: 20,
  },
  breadcrumb: {
    backgroundColor: "#DDDDDD",
    borderRadius: 100,
    height: 7,
    width: 7,
  },
  container: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
  },
});

export default Breadcrumbs;
