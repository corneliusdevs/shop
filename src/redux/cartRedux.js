import {createSlice} from "@reduxjs/toolkit"



const cartSlice = createSlice({
    name: "cart",
    initialState:  {
      products: [],
      quantity: 0,
      total: 0,
      wishlist: []
  },
    // initialState: {
    //     products: [],
    //     quantity: 0,
    //     total: 0,
    //     wishlist: []
    // },

    reducers:{
      addProduct: (state, action)=>{
        state.quantity += 1
        state.products.push(action.payload.product)
        state.total += action.payload.product.price 
      },
      updateProduct: (state, action)=>{
        if(action.payload.field === "color"){

          let products = [...state.products]
           products[action.payload.index] = action.payload.product
           const newState = {
            ...state,
            products
           }
  
          return  newState
        }if(action.payload.field === "size"){

          let products = [...state.products]
           products[action.payload.index] = action.payload.product
           const newState = {
            ...state,
            products
           }
  
          return  newState
        }

        },
        toggleSize: (state, action)=>{
          let products = [...state.products]
           products[action.payload.index] = action.payload.product
           const newState = {
            ...state,
            products
           }
  
          return  newState 
        },
        updateQtyAndTotal : (state, action)=>{
          let products = [...state.products]
          products[action.payload.index] = action.payload.updatedProduct
          const newState = {
           ...state,
           products,
           total: action.payload.newTotal
          }
 
         return  newState
        },
        removeProduct: (state, action)=>{
          let products = [...state.products]
          let filteredProducts = []
          
          products.forEach((item, index)=>{
            if( index !== action.payload.index){
                filteredProducts.push(item)
            }
          })
          
          const newState = {
           ...state,
           quantity: state.quantity - 1,
           products: filteredProducts,
           total: state.total - action.payload.amount
          }
 
         return  newState
        },
        clearCart: (state, action)=>{
           
           return {
             ...state,
             products: [],
             quantity: 0,
              total: 0,
             
           }
        },
        clearCartCompletely: (state, action)=>{
          return  {
            products: [],
            quantity: 0,
            total: 0,
            wishlist: []
        }
        },
        clearWishlist: (state, action)=>{
            return {
              ...state,
              wishlist: []
            }
        },
        removeFromWishlist: (state, action)=>{
          let products = [...state.wishlist]
          let filteredProducts = []
          
          products.forEach((item, index)=>{
            if( index !== action.payload.index){
                filteredProducts.push(item)
            }
          })
      
          const newState = {
           ...state,
           wishlist: filteredProducts
          }
 
         return  newState
        },
        addToWishlist: (state, action)=>{
          
          state.wishlist.push(action.payload.product)
        }
    }
})





export const { addProduct } = cartSlice.actions
export const {updateProduct} = cartSlice.actions
export const {toggleSize} = cartSlice.actions
export const {updateQtyAndTotal} = cartSlice.actions
export const { removeProduct } = cartSlice.actions
export const { clearCart } = cartSlice.actions
export const { clearWishlist } = cartSlice.actions
export const { removeFromWishlist } = cartSlice.actions
export const { addToWishlist } = cartSlice.actions
export const { clearCartCompletely } = cartSlice.actions

export default cartSlice.reducer