import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LANGUAGE_OPTIONS, DEFAULT_LANGUAGE_KEY } from 'utils/languages';

const initialState = {
  language: LANGUAGE_OPTIONS[DEFAULT_LANGUAGE_KEY],
  previousLanguage: {},
};

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, { payload: key }) => {
      const language = LANGUAGE_OPTIONS[key];

      state.previousLanguage = state.language;
      state.language = language;
    },
  },
});

export const { setLanguage } = languageSlice.actions;

export const selectLanguage = (state) => state.language.language;
export const selectPreviousLanguage = (state) => state.language.previousLanguage;

export default languageSlice.reducer;
