import { LocationTypeEnum } from "@/__generated__/graphql";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type LocationSlice = {
    id?: number;
    name: string;
    type: LocationTypeEnum
};
export type LocationInitialState = {
    locations: LocationSlice[];
};

export const locationInitialState: LocationInitialState = {
    locations: [],
};

const locationSlice = createSlice({
    name: "location",
    initialState: locationInitialState,
    reducers: {
        setLocations(state, action: PayloadAction<LocationSlice[]>) {
            state.locations = action.payload;
        },
        addLocations(state, action: PayloadAction<LocationSlice[]>) {
            state.locations.push(...action.payload);
        },
        removeLocationByType(state, action: PayloadAction<LocationTypeEnum>) {
            state.locations = state.locations.filter((x) => x.type !== action.payload);
        },
    },
});

// Action creators are generated for each case reducer function
export const { addLocations, setLocations } = locationSlice.actions;

export default locationSlice;
