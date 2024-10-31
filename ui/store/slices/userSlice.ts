// store/slices/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Business {
    _id: number;
    name: string;
}


export interface UserData {
    _id: string | undefined;
    name: string | undefined;
    email: string | undefined;
    business: Business[];
    picture: string | undefined;
}
export interface AuthContext {
    user : UserData | undefined;
}
const initialState: AuthContext = {
    user:undefined
};

const userSlice = createSlice({
    name: 'authContext',
    initialState,

    reducers: {
        setUserData(state, action: PayloadAction<UserData>) {
            state.user = action.payload;
        },

        resetBusinessList(state) {
            // state.business = [];
        },

        addBusiness(state, action: PayloadAction<Business>) {
            // state.business.push(action.payload)
        },

        clearUser(state) {
            state.user = undefined;
        },
    },
});

export const { setUserData, clearUser, resetBusinessList, addBusiness } = userSlice.actions;
export default userSlice.reducer;

