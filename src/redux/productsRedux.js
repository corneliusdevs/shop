import {createSlice} from "@reduxjs/toolkit"



const productsSlice = createSlice({
    name: "products",
    initialState: {
        allProducts: [],
        allProductsCount: 0,
        searchResults: [],
        productListSearchError: false,
        
    },
    reducers: {
        populateProducts: (state, action)=>{
            state.allProducts = [...action.payload.products]
            state.allProductsCount = action.payload.productCount
        },
        setProductListSearchError: (state, action)=>{
            state.productListSearchError = action.payload
        },
        updateSearchResults: (state, action)=>{
            return {
                ...state,
                searchResults: action.payload
            }
        },
    }
})



export const {populateProducts} = productsSlice.actions

export const {updateSearchResults} = productsSlice.actions
export const { setProductListSearchError } = productsSlice.actions

export default productsSlice.reducer


