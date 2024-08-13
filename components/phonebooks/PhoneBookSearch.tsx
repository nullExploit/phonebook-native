import {
  faArrowUpAZ,
  faArrowUpZA,
  faMagnifyingGlass,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Link } from "expo-router";
import { StyleSheet, TextInput, TouchableHighlight, View } from "react-native";

export default function PhoneBookSearch({
  setKeyword,
  keyword,
  setSort,
  sort,
}: {
  setKeyword: any;
  keyword: string;
  setSort: any;
  sort: boolean;
}) {
  return (
    <View style={styles.container}>
      <TouchableHighlight
        accessibilityLabel="sort"
        underlayColor="#987303"
        style={styles.button}
        onPress={() => setSort((prev: boolean) => !prev)}
      >
        <FontAwesomeIcon
          icon={sort ? faArrowUpAZ : faArrowUpZA}
        ></FontAwesomeIcon>
      </TouchableHighlight>

      <TextInput
        accessibilityLabel="search"
        style={styles.input}
        autoCapitalize="none"
        onChangeText={(val) => setKeyword(val)}
        defaultValue={keyword}
      />
      <FontAwesomeIcon
        style={styles.searchIcon}
        icon={faMagnifyingGlass}
      ></FontAwesomeIcon>

      <Link href="/add" asChild>
        <TouchableHighlight style={styles.button} underlayColor="#987303">
          <FontAwesomeIcon icon={faUserPlus}></FontAwesomeIcon>
        </TouchableHighlight>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#ad8304",
    width: 39,
    height: 39,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  input: {
    marginTop: 45,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    paddingLeft: 30,
    width: "50%",
  },
  searchIcon: {
    position: "absolute",
    top: 65,
    left: 100,
  },
  container: {
    backgroundColor: "#fff",
    height: 120,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    paddingTop: 30,
  },
});
