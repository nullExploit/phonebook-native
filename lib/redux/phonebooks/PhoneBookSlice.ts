import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  load,
  add,
  remove,
  update,
  updateAvatar,
} from "@/lib/redux/phonebooks/PhoneBookApi";

const initialState: { value: PhoneBook[]; status: string; total: number } = {
  value: [],
  status: "idle",
  total: 0,
};

export const loadPhoneBookAsync = createAsyncThunk(
  "phonebooks/load",
  async ({
    sort,
    keyword,
    limit,
  }: {
    sort: boolean;
    keyword: string;
    limit: number;
  }) => {
    const response = await load(sort, keyword, limit);
    const total = await load(sort, keyword, null);
    return {
      data: response.data.phonebooks,
      total: total.data.phonebooks.length,
    };
  }
);

export const addPhoneBookAsync = createAsyncThunk(
  "phonebooks/add",
  async ({ id, name, phone }: { id: number; name: string; phone: string }) => {
    const response = await add(name, phone);
    return { data: response.data, id };
  }
);

export const removePhoneBookAsync = createAsyncThunk(
  "phonebooks/remove",
  async (id: number) => {
    const response = await remove(id);
    return { data: response.data, id };
  }
);

export const updatePhoneBookAsync = createAsyncThunk(
  "phonebooks/update",
  async ({ id, name, phone }: { id: number; name: string; phone: string }) => {
    const response = await update(id, name, phone);
    return { data: response.data, id };
  }
);

export const updateAvatarPhoneBookAsync = createAsyncThunk(
  "phonebooks/avatar",
  async ({ id, data }: { id: number; data: any }) => {
    const formData: any = new FormData();
    formData.append("file", data);
    formData.append("avatar", data.name);
    const response = await updateAvatar(id, formData);
    return { data: response.data, id };
  }
);

export const phoneBookSlice = createSlice({
  name: "phonebooks",
  initialState,
  reducers: {
    addPhoneBook: (state, action) => {
      if (action.payload.name && action.payload.phone) {
        state.value.unshift({
          id: action.payload.id,
          name: action.payload.name,
          phone: action.payload.phone,
          avatar: null,
        });
      }
    },
    removePhoneBook: (state, action) => {
      state.value = state.value.filter((item) => item.id !== action.payload.id);
    },
    updatePhoneBook: (state, action) => {
      state.value = state.value.map((item) => {
        if (item.id === action.payload.id) {
          item.name = action.payload.name;
          item.phone = action.payload.phone;
        }
        return item;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPhoneBookAsync.fulfilled, (state, action) => {
        state.value = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(loadPhoneBookAsync.rejected, (state) => {
        state.value = [];
      })
      .addCase(addPhoneBookAsync.fulfilled, (state, action) => {
        state.value = state.value.map((item) => {
          if (item.id === action.payload.id) {
            item.id = action.payload.data.id;
          }
          return item;
        });
      })
      .addCase(updateAvatarPhoneBookAsync.fulfilled, (state, action) => {
        state.value = state.value.map((item) => {
          if (item.id === action.payload.id) {
            item.avatar = action.payload.data.avatar;
          }
          return item;
        });
      });
  },
});

export const { addPhoneBook, removePhoneBook, updatePhoneBook } =
  phoneBookSlice.actions;
export const selectPhoneBook = (state: any) => state.phonebooks.value;
export const total = (state: any) => state.phonebooks.total;

export const createPhoneBook =
  (name: string, phone: string) => (dispatch: any) => {
    const id = Date.now();
    dispatch(addPhoneBook({ id, name, phone }));
    dispatch(addPhoneBookAsync({ id, name, phone }));
  };

export const deletePhoneBook = (id: number) => (dispatch: any) => {
  dispatch(removePhoneBook({ id }));
  dispatch(removePhoneBookAsync(id));
};

export const editPhoneBook =
  (id: number, name: string, phone: string) => (dispatch: any) => {
    dispatch(updatePhoneBook({ id, name, phone }));
    dispatch(updatePhoneBookAsync({ id, name, phone }));
  };

export default phoneBookSlice.reducer;
