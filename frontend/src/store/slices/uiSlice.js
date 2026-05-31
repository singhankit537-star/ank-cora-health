import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  announcementVisible: true,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    dismissAnnouncement(state) {
      state.announcementVisible = false
    },
    showAnnouncement(state) {
      state.announcementVisible = true
    },
  },
})

export const { dismissAnnouncement, showAnnouncement } = uiSlice.actions

export default uiSlice.reducer
