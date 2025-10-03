// src/store/apartment.slice.ts
import { Apartment } from "@/lib/types/apartment.type";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

// Types
interface ApartmentState {
    items: Apartment[];
    selected?: Apartment;
    loading: boolean;
    loaderSingle: boolean;
    error?: string;
    total: number;
    page: number;
    limit: number;
}

const initialState: ApartmentState = {
    items: [],
    loading: false,
    loaderSingle: false,
    error: undefined,
    total: 0,
    page: 1,
    limit: 12,
};

// Async actions
export const fetchApartments = createAsyncThunk(
    "apartment/fetchAll",
    async (
        { page = 1, limit = 10, search = "", project = "" }: any,
        { rejectWithValue }
    ) => {
        try {
            const res = await axios.get(`${API_URL}/apartments`, {
                params: { page, limit, search, project },
            });
            return res.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to fetch apartments");

            return rejectWithValue(error.response?.data || error.message);
        }
    }
);
//get single aprtment
export const fetchApartmentById = createAsyncThunk(
    "apartment/fetchById",
    async (id: string, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${API_URL}/apartments/${id}`);
            return res.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to get single apartment");

            return rejectWithValue(error.response?.data || error.message);
        }
    }
);
//create
export const createApartment = createAsyncThunk(
    "apartment/create",
    async (data: FormData, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${API_URL}/apartments`, data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            toast.success("Apartment created successfully!");

            return res.data;
        } catch (error: any) {
            console.log(error);

            toast.error(error.response?.data?.message || "Failed to create apartment");

            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Slice
const apartmentSlice = createSlice({
    name: "apartment",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // list
            .addCase(fetchApartments.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchApartments.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.data;
                state.total = action.payload.meta.total;
                state.page = action.payload.meta.page;
                state.limit = action.payload.meta.limit;
            })
            .addCase(fetchApartments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

        builder
            // get by id

            .addCase(fetchApartmentById.pending, (state) => {
                state.loaderSingle = true;
            })
            .addCase(fetchApartmentById.fulfilled, (state, action) => {
                state.loaderSingle = false;
                state.selected = action.payload;
            })
            .addCase(fetchApartmentById.rejected, (state, action) => {
                state.loaderSingle = false;
                state.error = action.error.message;
            })


        builder
            // create
            .addCase(createApartment.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(createApartment.fulfilled, (state, action) => {
                state.loading = false;
                // state.items.unshift(action.payload);
            })
            .addCase(createApartment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default apartmentSlice.reducer;
