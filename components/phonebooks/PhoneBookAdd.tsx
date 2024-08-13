import { useState } from "react";
import { Link } from "expo-router";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { createPhoneBook } from "@/lib/redux/phonebooks/PhoneBookSlice";

export default function PhoneBookAdd() {
  const dispatch: any = useDispatch();
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  return (
    <View style={styles.phoneBookAddStyle}>
      <TextInput
        style={styles.inputStyle}
        placeholder="Input your name"
        onChangeText={(val) => setName(val)}
        defaultValue={name}
      ></TextInput>
      <TextInput
        style={styles.inputStyle}
        keyboardType="phone-pad"
        placeholder="Input your phone"
        onChangeText={(val) => setPhone(val)}
        defaultValue={phone}
      ></TextInput>
      <View style={styles.buttonContainer}>
        <Link href=".." asChild>
          <TouchableHighlight
            style={styles.buttons}
            underlayColor="#987303"
            onPress={() => dispatch(createPhoneBook(name, phone))}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableHighlight>
        </Link>
        <Link href=".." asChild>
          <TouchableHighlight style={styles.buttons} underlayColor="#987303">
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableHighlight>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  phoneBookAddStyle: {
    padding: 40,
    backgroundColor: "#fff",
    height: "100%",
  },
  inputStyle: {
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  buttons: {
    backgroundColor: "#ad8304",
    borderRadius: 5,
    height: 35,
    width: 130,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
    height: 70,
  },
  buttonText: {
    color: "#fff",
  },
});
