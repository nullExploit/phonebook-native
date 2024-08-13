import {
  deletePhoneBook,
  editPhoneBook,
} from "@/lib/redux/phonebooks/PhoneBookSlice";
import {
  faCheck,
  faFloppyDisk,
  faPenToSquare,
  faTrashCan,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Pressable, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";

export default function PhoneBookButton({
  id,
  name,
  phone,
  deleteValidate,
  setDeleteValidate,
  onEdit,
  setOnEdit,
}: {
  id: number;
  name: string;
  phone: string;
  deleteValidate: boolean;
  setDeleteValidate: any;
  onEdit: boolean;
  setOnEdit: any;
}) {
  const dispatch: any = useDispatch();

  if (onEdit) {
    return (
      <View style={styles.container}>
        <Pressable
        accessibilityLabel="savebutton"
          onPress={() => {
            dispatch(editPhoneBook(id, name, phone));
            setOnEdit((prev: boolean) => !prev);
          }}
        >
          <FontAwesomeIcon icon={faFloppyDisk}></FontAwesomeIcon>
        </Pressable>
      </View>
    );
  }

  if (deleteValidate) {
    return (
      <View style={styles.container}>
        <Pressable
          onPress={() => dispatch(deletePhoneBook(id))}
        >
          <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
        </Pressable>
        <Pressable
          onPress={() => setDeleteValidate((prev: boolean) => !prev)}
        >
          <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Pressable
        accessibilityLabel="oneditbutton"
        onPress={() => setOnEdit(true)}
      >
        <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
      </Pressable>
      <Pressable
        accessibilityLabel="ondeletebutton"
        onPress={() => setDeleteValidate(true)}
      >
        <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
});
