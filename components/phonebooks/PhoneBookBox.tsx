import { Dimensions, ScrollView, View } from "react-native";
import PhoneBookItem from "./PhoneBookItem";
import PhoneBookSearch from "./PhoneBookSearch";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadPhoneBookAsync,
  selectPhoneBook,
  total,
} from "@/lib/redux/phonebooks/PhoneBookSlice";

export default function PhoneBookBox() {
  const dispatch: any = useDispatch();
  const [sort, setSort] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [limit, setLimit] = useState(10);

  const phonebooks: PhoneBook[] = useSelector(selectPhoneBook);
  const totalData: number = useSelector(total);
  const screen = Dimensions.get("screen");
  const totalHeight = phonebooks.length * 100 + 300 + phonebooks.length * 10;

  const loadWhileScrolling = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: {
    layoutMeasurement: any;
    contentOffset: any;
    contentSize: any;
  }) => {
    if (
      Math.ceil(layoutMeasurement.height + contentOffset.y) >=
        contentSize.height &&
      limit < totalData
    ) {
      setLimit((prev) => prev + 10);
    }
  };

  useEffect(() => {
    dispatch(loadPhoneBookAsync({ sort, keyword, limit }));
  }, [dispatch, sort, keyword, limit]);

  const nodeList = phonebooks.map((item: any) => (
    <PhoneBookItem
      name={item.name}
      phone={item.phone}
      avatar={
        item.avatar
          ? { uri: `http://192.168.1.27:3001/${item.avatar}` }
          : require("@/assets/images/avatar.png")
      }
      id={item.id}
      key={item.id}
    />
  ));

  return (
    <View>
      <PhoneBookSearch
        setKeyword={setKeyword}
        keyword={keyword}
        setSort={setSort}
        sort={sort}
      />
      <ScrollView
        style={{ backgroundColor: "#fff" }}
        onScroll={({ nativeEvent }) => loadWhileScrolling(nativeEvent)}
      >
        <View
          style={{
            display: "flex",
            gap: 10,
            height: totalHeight < screen.height ? screen.height : totalHeight,
          }}
        >
          {nodeList}
        </View>
      </ScrollView>
    </View>
  );
}
