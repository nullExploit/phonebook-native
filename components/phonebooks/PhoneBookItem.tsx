import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import PhoneBookDetail from "./PhoneBookDetail";
import { launchCameraAsync, launchImageLibraryAsync } from "expo-image-picker";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { updateAvatarPhoneBookAsync } from "@/lib/redux/phonebooks/PhoneBookSlice";

export default function PhoneBookItem({
  name,
  phone,
  avatar,
  id,
}: {
  name: string;
  phone: string;
  avatar: any;
  id: number;
}) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [imageUri, setImageUri] = useState<any>(null);
  const dispatch: any = useDispatch();

  const launchCam = async () => {
    try {
      const res = await launchCameraAsync({
        allowsEditing: true,
        quality: 1,
      });
      if (!res.canceled) {
        const data = {
          uri: res.assets[0].uri,
          type: res.assets[0].mimeType,
          name: res.assets[0].fileName,
        };
        setImageUri({ uri: data.uri });
        dispatch(updateAvatarPhoneBookAsync({ id, data }));
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const launchLib = async () => {
    try {
      const res = await launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
      });
      if (!res.canceled) {
        const data = {
          uri: res.assets[0].uri,
          type: res.assets[0].mimeType,
          name: res.assets[0].fileName,
        };
        setImageUri({ uri: data.uri });
        dispatch(updateAvatarPhoneBookAsync({ id, data }));
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setModalVisible((prev) => !prev)}>
        <Image
          accessibilityLabel="image"
          style={styles.avatar}
          source={imageUri ? imageUri : avatar}
        ></Image>
      </Pressable>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Pressable
            style={styles.close}
            onPress={() => setModalVisible(false)}
          >
            <FontAwesomeIcon icon={faXmark} />
          </Pressable>
          <TouchableHighlight
            style={styles.button}
            underlayColor="#987303"
            onPress={() => {
              launchCam();
              setModalVisible(false);
            }}
          >
            <Text style={styles.buttonText}>Camera</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.button}
            underlayColor="#987303"
            onPress={() => {
              launchLib();
              setModalVisible(false);
            }}
          >
            <Text style={styles.buttonText}>Select Image</Text>
          </TouchableHighlight>
        </View>
      </Modal>
      <PhoneBookDetail name={name} phone={phone} id={id} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightgray",
    height: 100,
    marginHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  avatar: {
    marginLeft: 10,
    width: 80,
    height: 80,
    borderRadius: 100,
  },
  modalContainer: {
    backgroundColor: "#fff",
    height: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
    flexDirection: "row",
    marginHorizontal: 30,
    borderRadius: 10,
    marginVertical: "100%",
    borderWidth: 1,
  },
  button: {
    backgroundColor: "#ad8304",
    width: 100,
    height: 50,
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
  },
  close: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});
