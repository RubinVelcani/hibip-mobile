import ArrowLeft from "assets/icons/arrowLeft.svg";
import { TouchableOpacity, StyleSheet } from "react-native";

type Props = {
  onClick: () => void;
};

const BackArrow = ({ onClick }: Props) => {
  return (
    <TouchableOpacity style={styles.wrapper} onPress={onClick}>
      <ArrowLeft width={16} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 6,
  },
});

export default BackArrow;
