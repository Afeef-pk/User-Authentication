import { configureStore } from "@reduxjs/toolkit";
import userSlice from '../app/userSlice'

export default configureStore({
    reducer: {
        user: userSlice,
    }
})