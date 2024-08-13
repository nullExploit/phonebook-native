import { StyleSheet, Text, TextInput, View } from "react-native";
import PhoneBookButton from "./PhoneBookButton";
import { useState } from "react";

export default function PhoneBookDetail({
  name,
  phone,
  id,
}: {
  name: string;
  phone: string;
  id: number;
}) {
  const [deleteValidate, setDeleteValidate] = useState<boolean>(false);
  const [onEdit, setOnEdit] = useState<boolean>(false);
  const [tempName, setTempName] = useState<string>(name);
  const [tempPhone, setTempPhone] = useState<string>(phone);

  if (onEdit) {
    return (
      <View style={styles.details}>
        <View>
          <TextInput
            onChangeText={(val) => setTempName(val)}
            defaultValue={tempName}
            style={styles.inputs}
          />
          <TextInput
            onChangeText={(val) => setTempPhone(val)}
            defaultValue={tempPhone}
            keyboardType="phone-pad"
            style={styles.inputs}
          />
        </View>
        <PhoneBookButton
          id={id}
          name={tempName}
          phone={tempPhone}
          deleteValidate={deleteValidate}
          setDeleteValidate={setDeleteValidate}
          onEdit={onEdit}
          setOnEdit={setOnEdit}
        />
      </View>
    );
  }

  return (
    <View style={styles.details}>
      <View>
        <Text>{name}</Text>
        <Text>{phone}</Text>
      </View>
      <PhoneBookButton
        id={id}
        name={tempName}
        phone={tempPhone}
        deleteValidate={deleteValidate}
        setDeleteValidate={setDeleteValidate}
        onEdit={onEdit}
        setOnEdit={setOnEdit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  details: {
    marginLeft: 20,
    display: "flex",
    gap: 10,
  },
  inputs: {
    borderWidth: 1,
    backgroundColor: "#fff",
    paddingLeft: 3,
    width: 150,
    marginTop: 1,
    height: 20,
  },
});
