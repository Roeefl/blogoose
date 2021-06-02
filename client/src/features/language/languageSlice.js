import { createSlice } from '@reduxjs/toolkit';
import { LANGUAGE_OPTIONS, DEFAULT_LANGUAGE_KEY } from 'utils/languages';

const initialState = {
  language: LANGUAGE_OPTIONS[DEFAULT_LANGUAGE_KEY],
};

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, { payload: key }) => {
      const language = LANGUAGE_OPTIONS[key];
      state.language = language;
    },
  },
});

export const { setLanguage } = languageSlice.actions;

export const selectLanguage = (state) => state.language.language;

export default languageSlice.reducer;
