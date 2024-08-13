import {
  fireEvent,
  screen,
  render,
  waitFor,
} from "@testing-library/react-native";
import Providers from "@/lib/redux/Provider";
import PhoneBookBox from "../phonebooks/PhoneBookBox";
import PhoneBookButton from "../phonebooks/PhoneBookButton";
import PhoneBookAdd from "../phonebooks/PhoneBookAdd";
import PhoneBookDetail from "../phonebooks/PhoneBookDetail";
import PhoneBookItem from "../phonebooks/PhoneBookItem";
import PhoneBookSearch from "../phonebooks/PhoneBookSearch";

describe("Should render all phonebooks correctly", () => {
  it("Should render phonebook button", () => {
    const setEdit = jest.fn();
    const validateDelete = jest.fn();

    const tree = render(
      <Providers>
        <PhoneBookButton
          id={1}
          name="#TESTING#"
          phone="0811111"
          deleteValidate={false}
          setDeleteValidate={validateDelete}
          onEdit={false}
          setOnEdit={setEdit}
        />
      </Providers>
    ).toJSON();
    expect(tree).toMatchSnapshot();
    fireEvent.press(screen.getByLabelText("oneditbutton"));
    expect(setEdit).toHaveBeenCalledWith(true);
    fireEvent.press(screen.getByLabelText("ondeletebutton"));
    expect(validateDelete).toHaveBeenCalledWith(true);
    expect(tree).toMatchSnapshot();
  });

  it("Should render phonebook detail", () => {
    const tree = render(
      <Providers>
        <PhoneBookDetail name="TESTING" phone="081111111" id={1} />
      </Providers>
    ).toJSON();
    expect(tree).toMatchSnapshot();
    expect(screen.getByText("TESTING").props.children).toBe("TESTING");
    expect(screen.getByText("081111111").props.children).toBe("081111111");
  });

  it("Should render phonebook item", () => {
    const tree = render(
      <Providers>
        <PhoneBookItem name="TESTING" phone="081111111" id={1} avatar={null} />
      </Providers>
    ).toJSON();
    expect(tree).toMatchSnapshot();
    expect(screen.getByLabelText("image").props.source).toBe(null);
    expect(screen.getByText("TESTING").props.children).toBe("TESTING");
    expect(screen.getByText("081111111").props.children).toBe("081111111");
    expect(screen.getByText("TESTING").type).toBe("Text");
    expect(screen.getByText("081111111").type).toBe("Text");
  });

  it("Should render phonebook search", () => {
    const setKeyword = jest.fn();
    const setSort = jest.fn();
    const tree = render(
      <Providers>
        <PhoneBookSearch
          setKeyword={setKeyword}
          setSort={setSort}
          keyword=""
          sort={false}
        />
      </Providers>
    ).toJSON();
    expect(tree).toMatchSnapshot();
    expect(screen.getByLabelText("search").props.autoCapitalize).toBe("none");
    expect(screen.getByLabelText("search").type).toBe("TextInput");
    expect(screen.getByLabelText("search").props.defaultValue).toBe("");
    fireEvent(screen.getByLabelText("search"), "changeText", "TEST");
    expect(setKeyword).toHaveBeenCalledWith("TEST");
    fireEvent.press(screen.getByLabelText("sort"));
    fireEvent.press(screen.getByLabelText("sort"));
    expect(setSort).toHaveReturnedTimes(2);
  });

  it("Should render phonebook add", () => {
    const tree = render(
      <Providers>
        <PhoneBookAdd />
      </Providers>
    ).toJSON();
    expect(tree).toMatchSnapshot();
    fireEvent(
      screen.getByPlaceholderText("Input your name"),
      "changeText",
      "TEST Name"
    );
    expect(
      screen.getByPlaceholderText("Input your name").props.defaultValue
    ).toBe("TEST Name");
    fireEvent(
      screen.getByPlaceholderText("Input your phone"),
      "changeText",
      "TEST Phone"
    );
    expect(
      screen.getByPlaceholderText("Input your phone").props.defaultValue
    ).toBe("TEST Phone");
  });

  it("Should render phonebook home", async () => {
    const tree = render(
      <Providers>
        <PhoneBookBox />
      </Providers>
    ).toJSON();
    await waitFor(() => {
      expect(tree).toMatchSnapshot();
    });
  });
});
