// store/slices/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Business {
    _id: string;
    name: string;
    catagory:string;
    logo:string;
}


export interface UserData {
    _id: string | undefined;
    name: string | undefined;
    email: string | undefined;
    business: Business[];
    picture: string | undefined;
}
export interface AuthContext {
    user: UserData | undefined;
    activeBusiness: Business;
}
const initialState: AuthContext = {
    user: undefined,
    activeBusiness:{
        _id:"1H",
        name:"Strix Invoice",
        catagory:"Retail",
        logo:"/img/strix.png"
    }
};

const userSlice = createSlice({
    name: 'authContext',
    initialState,

    reducers: {
        setUserData(state, action: PayloadAction<UserData>) {
            state.user = action.payload;
            if (typeof window !== undefined) {
                window.localStorage.removeItem("userData")
                window.localStorage.setItem("userData", JSON.stringify(action.payload))
            }
        },

        resetBusinessList() {
            // state.business = [];
        },

        addBusiness(state, action: PayloadAction<Business>) {
            state.user?.business.push(action.payload)
            if (typeof window !== undefined) {
                window.localStorage.removeItem("userData")
                window.localStorage.setItem("userData", JSON.stringify(state.user))
            }
        },
        updateBusinessList(state, action: PayloadAction<Business>) {
            const updatedBusiness = action.payload;
            if (state.user) {
                const businessIndex = state.user.business.findIndex(b => b._id === updatedBusiness._id);
                if (businessIndex !== -1) {
                    state.user.business[businessIndex] = updatedBusiness;
                    if (typeof window !== "undefined") {
                        window.localStorage.setItem("userData", JSON.stringify(state.user));
                    }
                }
                // if(state.activeBusiness._id === updatedBusiness._id){
                //     setActiveBusiness(updatedBusiness)
                // }
            }
        },

        setActiveBusiness(state, action:PayloadAction<Business>){
            state.activeBusiness = action.payload;
            if (typeof window !== undefined) {
                window.localStorage.removeItem("activeBusiness")
                window.localStorage.setItem("activeBusiness", JSON.stringify(action.payload))
            }
        },

        clearUser(state) {
            state.user = undefined;
            if (typeof window !== undefined) {
                window.localStorage.removeItem("userData")
                window.localStorage.removeItem("activeBusiness")
            }
        },
    },
});

export const { setUserData, clearUser, resetBusinessList, addBusiness, setActiveBusiness,updateBusinessList } = userSlice.actions;
export default userSlice.reducer;
