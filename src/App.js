import {BrowserRouter as Router,Routes, Route, Navigate} from "react-router-dom"
import HomePage from "./Pages/HomePage"
import ProductsListPage from "./Pages/ProductsListPage"
import ProductPage from "./Pages/ProductPage"
import RegisterPage from "./Pages/RegisterPage";
import WishlistPage from "./Pages/WishlistPage";
import LoginPage from "./Pages/LoginPage";
import CartPage from "./Pages/CartPage";
import ProductUploadPage from "./Pages/ProductUploadPage"
import CheckoutPage from "./Pages/Checkout"
import {useSelector} from "react-redux"


import SearchResultsPage from "./Pages/SearchResultsPage"
import {useEffect} from "react"

import {clearCartCompletely} from "./redux/cartRedux"

import {useDispatch} from "react-redux"

function App() {
  const isLoggedIn = useSelector( state => state.user.isLoggedIn)
  const dispatch = useDispatch()
  
  useEffect(()=>{
    const storage = localStorage.getItem("persist:root")
    if(typeof storage === "string") {
  
      if(storage.length > 5100000) {
        localStorage.clear("persist:root")
      dispatch(
        clearCartCompletely()
      )
    }
    }
  }, [])
  
    return (
        <div className="App" style= {{display: "flex", flexDirection: "column", alignItems: "center"}}>
          <Router>
            <Routes>
              <Route exact path="/" element={<HomePage/>}/>
              <Route  path="cart" element={<CartPage/>}/>
              <Route  path="searchresults" element={<SearchResultsPage/>}/>
              <Route  path="wishlist" element={<WishlistPage/>}/>
              <Route  path="checkout" element={isLoggedIn?   <CheckoutPage/>:<LoginPage/>}/>
              <Route  path="register" element={isLoggedIn?   <Navigate to="/"/>:<RegisterPage/>}/>
              <Route  path="product" element={<ProductPage/>}>
                <Route path = ":id" element= {<ProductsListPage/>}/>
              </Route>
              <Route  path="productupload" element={<ProductUploadPage/>}/>
              <Route  path="login" element={isLoggedIn?   <Navigate to="/"/>:<LoginPage/>}/>
              <Route  path="products" element={<ProductsListPage/>}>
                <Route path = ":category" element= {<ProductsListPage/>}/>
              </Route>
            </Routes>     
          </Router>
          
        </div>
  );
}

export default App;
