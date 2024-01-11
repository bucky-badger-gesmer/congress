import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state using that type
interface DarkModeState {
  isDarkMode: boolean;
}

const initialState: DarkModeState = {
  isDarkMode: false, // Default mode
};

export const darkModeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    // Optionally, add more actions here if needed
  },
});

// Export the actions
export const { toggleDarkMode } = darkModeSlice.actions;

// Export the reducer as a default export
export default darkModeSlice.reducer;
