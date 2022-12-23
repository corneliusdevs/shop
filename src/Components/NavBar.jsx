import {Link} from "react-router-dom"
import {navmobile, tablet, mediumextrasmall, large, mobile, smallmobile, mediumsmall} from "../responsive"

import styled, {keyframes} from "styled-components"
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined"
import { InputAdornment } from "@mui/material"

import {Menu, Clear } from "@mui/icons-material"
import Badge from '@mui/material/Badge'
import CartIcon from '@mui/icons-material/ShoppingCart'
import {createTheme} from "@mui/material"
import {ThemeProvider}  from "@mui/material"
import {TextField} from  "@mui/material"


import {useState, useEffect, useRef} from "react"
import {useLocation} from "react-router-dom"
import {useSelector, useDispatch} from "react-redux"
import { removeUser} from "../redux/userRedux"
import {updateSearchResults} from "../redux/productsRedux"
import {Storefront, East, West} from "@mui/icons-material"
import {publicRequest} from "../requestMethods"






const theme = createTheme({
  palette:{
    secondary: {
      main: "#442283"
    }
  }
}) 

const Container = styled.div`
 display: flex;
 align-items: center;
 justify-content: center;
 text-align: center;
 height: 50px;
 overflow: ${props => props.shouldOverflow === true ? "visible" : "hidden"};
//  box-shadow : ${ props => props.shadow === true &&  " 0px 3px 3px 1px rgb(220 220 220)"};
 border-bottom: 1px solid #ddd;
 position: sticky;
 top: 0;
 z-index: 100;
 background-color: #ffffff;
 

 ${ props => props.shouldOverflow === true ? tablet({overflow: "visible"}) : tablet({overflow: "hidden"})};

 ${tablet({width: "100%"})};
 `

const Left = styled.div`
 flex: 1;
 display: flex;
 align-items: center;
 padding-left:10px;
 text-align: center;
 ${tablet({flex: 0.1})};
 ${navmobile({flex: 0.5})};
`
const InputContainer = styled.div`
 display: flex;
 align-items: center;
 justify-content: center;
 font-size: 14px;
 cursor: pointer;
 flex-direction: column;
 position: relative;

 ${tablet({flexDirection: "row"})};
 ${navmobile({display: "none"})};
 
 `

 const MobileInputContainer = styled.div`
 display: flex;
 align-items: center;
 justify-content: center;
 font-size: 14px;
 cursor: pointer;
 flex-direction: row;
 position: relative;

 ${tablet({display: "flex"})};
 ${ props => props.show === true ? navmobile({display: "flex", width: "200px"}) : navmobile({display: "none"}) };

 `

const Center = styled.div`
flex: 1;
${navmobile({flex: 2})};
${ props => props.show === true && props.type === "mobile"? navmobile({display: "none"}) : navmobile({display: "flex"}) };


${large({flex: 0.9})};
${tablet({fontSize: "17.5px"})};
${mediumsmall({fontSize: "15.5px"})};
${smallmobile({display: "none"})};
`

const Right = styled.div`
flex: 1;
display:flex;
align-items: center;
justify-content: flex-end;
box-sizing: border-box;

${large({flex: 1.2})};
${tablet({marginTop: 0, flex: 2})};
${navmobile({flex: 1.5})}
`

const Logo = styled.h2`
 margin: 10px;
 display: flex;
 justify-content: center;
 align-items: center;

 ${large({fontSize: "23px", fontWeight: "490"})};
 ${mediumextrasmall({fontSize: "15px"})};
`
const Language = styled.span`
margin-right: 10px;
font-size: 14px;
cursor: pointer;`

const MenuItem = styled.span`
 margin-right: auto;
 margin-left: auto;
 font-size: 14px;
 cursor: pointer;
 font-weight: ${props =>props.user && 500};

 &:hover{
   background-color: ${props => props.type === "sidebar" && "rgba(68,34,131,0.36)"};

 };

${props => props.type === "user" && large({fontWeight: 490})};
${props => props.component === "isLogggedIn" && large({marginRight: "30px", marginLeft: "25px"})};
${props => props.type === "cart" && large({marginRight: "14px"})};
 ${tablet({display: "flex", alignItems: "center"})};
 ${props => props.type === "cart" && navmobile({marginRight:"15px"})};
 ${props => props.type === "sidebar" && tablet({display: "flex", width: "90%", justifyContent: "center", marginTop: "10px", border: "1px solid #ccc"})}

`

const Input = styled.input`
border:none`

const MenuLink = styled(Link)`
   text-decoration: none;
   color: black;
   &:link, &:visited, &:hover, &:active{
     color: black;
   };
   &:focus{
    color: black;
   };

   width: ${props => props.type === "sidebar" &&  "100%"};
`
const StyledSearchOutlinedIcon = styled(SearchOutlinedIcon)`
// color:  ${ props => props.location === "checkout" ? "white" : "black" }; 
  color: inherit;
  &:hover{
    color: white;

    }
`
const SearchIconContainer = styled.div`
display: flex;
color: black;
justify-content: center;
align-items: center;
padding: 0.5rem;
margin-right: -14px;
background-color: white;


&:hover{
  background-color: ${ props => props.location === "checkout" ? "rgba(68, 34, 131, 1)" : "rgba(68, 34, 131, 0.6)"};
  color: white;
  cursor: pointer;
  };
`

const SearchResultContainer = styled.div`
  display: flex;
  position: absolute;
  top: 70px;
  width: ${props => props.result === false ? "200px" : "25vw"};
  max-height: 33.33vh;
  background-color: white;
  box-shadow: 0px 0px 7px 0px rgb(0, 0, 0, 0.45);
  
  ${tablet({width: "47vw", top: "50px"})};
  ${props => props.result === false && tablet({width: "200px"})};
  ${navmobile({width: "80vw", top: "50px"})};
  ${props => props.result === false && navmobile({width: "200px"})};
  
`
const SearchResult = styled.div`
  color: gray;
  text-align: ${ props => props.result === false && "center"};
  display: flex;
  flex-direction: ${ props => props.result === false ? "row" : "column"};
  justify-content: ${ props => props.result === false && "center"};
  align-items: ${ props => props.result === false && "center"}; 
  width: 100%;
  padding-top: ${ props => props.result === false ? 0 : "35px"};

  max-height: 33.3333 vh;
  overflow-y: scroll;
  overflow-x: hidden;
  width: { props => props.result === false ? "fit-content": "25vw"};
  background-color: white;
  box-shadow: outset 0px 0px 1px 1px rgba(100,100,100,1);

  &::-webkit-scrollbar{
    width: 5px;
  };

  &::-webkit-scrollbar-track{
    background: #f1f1f1;
  };

  &::-webkit-scrollbar-thumb{
    background: #888;
  };

  &::-webkit-scrollbar-thumb:hover{
    background: #555;
  };


 ${tablet({padding: "0.5rem", width: "100%", marginTop: "10px"})};
 ${ props => props.result === false && tablet({marginTop: 0})};
  
`

const SearchItem = styled.div`
   display: flex;
   align-items: center;
   width: 100%;
   height: 35px;
   padding: 0.1rem;
   border-top: 1px solid lightgray;
   position: ${props => props.type === "see more" && "absolute"};
   top: ${props => props.type === "see more" && "25px"};
   left: ${props => props.type === "see more" && "0"};

   &:hover{
    background-color: #eee;
    box-sizing: border-box;
    border: 1.5px solid black;
    cursor: pointer;
   };
`

const SearchItemImageContainer = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 1px solid lightgray;
  margin-right: 2vw;
  overflow: hidden;
  margin-left: 1vw;
  

`
const SearchItemImageWrapper = styled.div`
 flex: 1;
 display: flex;
 align-items: center;
`

const SearchItemImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`

const SearchCount = styled.div`
  width: 100%;
  height: 100%;
  padding: 0.1rem;
  width: 24vw;
  color: gray;
  text-align: center;
  display: flex;
  justify-content: flex-end;
  margin-right: 3vw;
  align-items: center;
  margin-right: 2vw;
  height: 25px;
  background-color: white;

  position: absolute;
  top: 0;
  left: 0;
   
 

  ${tablet({width: "100%"})};
`

const SearchItemInfoContainer = styled.div`
 display: flex;
 justify-content: space-evenly;
 align-items: center;
 flex: 6;
`

const SearchItemInfo = styled.div`
  color: gray;
  font-weight: ${ props => props.component === "price" ? 550 : 400};
`

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
   color: black;
   &:hover, &:focus{
     color: black;
   };
   &:active{
    color: black;
   };
`
const DeleteIconContainer = styled.div`
  display: flex;
  justify-content: center;
  transition: all 0.5s ease-in;
  color: gray;
  font-size: 12px;
  margin-right: 2rem;

  &:hover{
    cursor: pointer;
    transform: scale(0.8);
    color: black;
   };

   ${tablet({marginRight: 0})};
`

const StyledCancelIcon =styled(Clear)`
  color: inherit;

`
const SpanSearchCount = styled.span`
  margin-right: 2rem;
  color: inherit;

`

const FloatingLink = styled.div`
  position: fixed;
  bottom: ${props => props.location === "searchresults" ? "0.5vh" : "2.5vh"} ;
  right: 5vw;
  display: ${props => props.location === "products" ? "none" : "flex"};
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
  background-color: rgba(255,255,255,0.8);
  border-radius: 50%;
  transition: all 0.2s ease-in;
  padding: 1rem;
  border: 1px solid darkgray;

  &:hover{
    cursor: pointer;
    transform: scale(1.2)
  }
`

const StyledShopIcon = styled(Storefront)`

`
const SideBar = styled.div`
  display: ${props => props.show === true ? "flex" : "none"};
  position: fixed;
  width: 30%;
  height: 100%;
  background-color: white;
  top:0;
  left:0;
  flex-direction: column;
  z-index: 120;
  padding-top: 10vh;

  ${tablet({width: "40%"})};
  ${navmobile({width: "50%"})};
  ${mediumextrasmall({width: "75%"})};
`
const MenuIcon = styled(Menu)`
  color: #ccc;
`
const MenuIconContainer = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;

   &:hover ${SideBar}{
    display: flex;
 }
`
const MenuSearchIconContainer = styled.div`
  display:none;
  ${tablet({display: "none"})};
  ${props => props.show === false && navmobile({display: "flex", alignItems: "center", justifyContent: "center", marginLeft: "1rem"})};
`
const MenuSearchIcon = styled(SearchOutlinedIcon)``
const SideBarClearIcon = styled(Clear)`
  color: #ccc;
  &:hover{
    border: 1px solid #778899;
  }
`
  
const SideBarClearIconContainer = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   transition: background 1s;

   &:hover{
     background-color: #ddd;
   };
   &:hover ${SideBar}{
    display: none;
  };

  ${tablet({position: "absolute", top: "3.5vh", right: "10px"})}
`
const MenuSearchClearIcon = styled(Clear)`
  color: #ccc;
  


`
  
const MenuSearchClearIconContainer = styled.div`
   display: none;
   justify-content: center;
   align-items: center;
   transition: background 1s;

   &:hover{
     background-color: #ddd;
   };

  ${navmobile({display: "flex"})}
`
const NavArrowContainer = styled.div`
position: fixed;
bottom: 10vh;
right: 5vw;
display:flex;
flex-direction: column;
align-items: center;
justify-content: center;
z-index: 40;
margin-top: -10px;


`

const ArrowContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: 1rem;
margin-top: 7px;
height: 1rem;
background-color: rgba(255,255,255,0.8);
border-radius: 50%;
transition: all 0.2s ease-in;
padding: 1rem;
border: 1px solid darkgray;

&:hover{
   cursor: pointer;
   transform: scale(0.9);
 };
`
const ArrowRight = styled(East)`
  color: gray;
`

const ArrowLeft = styled(West)`
  color: gray;
`

const MessageDialog = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   z-index: 110;
   position: fixed;
   top: 0;
   left: 0;
   width: 100vw;
   height: 100vh;
   background-color: rgba(50, 50, 50, 0.5);
   transition: all 3s ease-in;
`
const DialogBox = styled.div`
   background-color: white;
   padding: 60px;
   padding-bottom: 20px;
   border: 3px solid #442283;
   display: flex;
   flex-direction: column;
   align-items: center;
`
const rotate = keyframes`
 from{
  transfrom: rotate(0deg);
 }

 to{
  transform: rotate(360deg);
 }

`
const Loader = styled.div`
   border: 0.5rem dotted #442283;
   border-top: 0.5rem dotted grey;
   border-bottom: 0.5rem dotted #ff1717;
   border-right: 0.5rem dotted green;
   border-radius: 50%;

   width: 1rem;
   height: 1rem;
   margin-top: -40px;
  
   animation:${rotate} 0.9s linear infinite;
   
   ${mobile({ width: "1.2rem",  height: "1.2rem"})}
`





const NavBar = ({shadow, location})=>{


  const currentLocation = useLocation().pathname.split("/")[1];

  const [onMobile, setOnMobile] = useState(false)
  const [loading, setLoading] = useState(false)
  let currentWidth = window.innerWidth;
  currentWidth <= 769 && onMobile === false && setOnMobile(true);
  currentWidth > 769 && onMobile === true && setOnMobile(false);

 const searchResults = useSelector( state => state.products.searchResults)
  

  useEffect(()=>{
     function handleWindowResize(){

      currentWidth = window.innerWidth

      currentWidth <= 768 && onMobile === false && setOnMobile(true);
      currentWidth > 768 && onMobile === true && setOnMobile(false);
       console.log("This is resized: ", window.innerWidth)
     }
      
     window.addEventListener("resize", handleWindowResize)

     return ()=>{
      window.removeEventListener("resize", handleWindowResize)
     }
    
    

  })

  const quantity = useSelector( state => state.cart.quantity)
  // const quantity = JSON.parse(JSON.parse( localStorage.getItem("persist:root")).cart).quantity
  // console.log("this is local Storage",JSON.parse( localStorage.getItem("persist:root")).cart)

  const [searchTerm, setSearchTerm] = useState("")
  const items = useSelector( state => state.products.allProducts)
const userState = useSelector(state => state.user)
const page = useRef(0)
const searchResultsState = useSelector( state => state.products.searchResults)
// const userState = JSON.parse( localStorage.getItem("persist:root")).user
const [matchedItems, setMatchedItems] = useState([])
const [showSearchResults, setShowSearchResults] = useState(false)

const [searchFailed, setSearchFailed] = useState("")
const dispatch = useDispatch()

const [showSideBar, setShowSideBar] = useState(false)
const [showSearch, setShowSearch] = useState(false)



const logOut = ()=>{
   dispatch(
     removeUser()
   )
}

  const getItems = async()=>{
    setLoading(true)
    const searchString = searchTerm.toLowerCase()
     

     publicRequest.get(`/products/search/${searchString}?p=${page.current}`).then((res)=>{
     
      setMatchedItems(res.data)
      dispatch(
        updateSearchResults(res.data)
      )
      console.log(res.data)
      setLoading(false)
      setShowSearchResults(true)
      
     }).catch(err =>{

      dispatch(
        updateSearchResults([])
      )
      
      if(!err.status && !err.response){
        setSearchFailed("Please Check Your Internet Connection")
        setLoading(false)
        setShowSearchResults(true)
      }
      else{
        setMatchedItems([])
        setLoading(false)
        setShowSearchResults(true)
        
      } 
     })


  }

  const getSearchResults = ()=>{
    const ui = []

     matchedItems.forEach((item)=>{
        ui.push(
          <StyledLink to = {`/product/${item._id}`}>

              <SearchItem>
                <SearchItemImageWrapper>
                  <SearchItemImageContainer>
                    <SearchItemImage src = {item.img}/>
                  </SearchItemImageContainer>
                </SearchItemImageWrapper>
                <SearchItemInfoContainer>
                  <SearchItemInfo title>
                    {item.title}
                  </SearchItemInfo>
                  <SearchItemInfo component = "price"> 
                    ${item.price}
                  </SearchItemInfo>
                </SearchItemInfoContainer>
              </SearchItem>
          </StyledLink>
        )
     })
     return ui
  }

  const getNavArrows = ()=>{
    // basically, do a modulo division on matchedItems.length if it's less than 0 it means we dont have more results to show, if its 0, it means that 20 products which is the reuslt limit per query was returned and we most likely have more results in the db to show
    let doWeHaveMoreResults = false 
    let isArrayFull = matchedItems.length % 20;

    if (isArrayFull === 0){
      doWeHaveMoreResults = true
    } 
    
    return (
 
    <NavArrowContainer>
    {
       page.current > 0 && matchedItems.length !== 0 &&<ArrowContainer title = "Previous page" onClick = {()=>{
         let clicked = false
          if(page.current > 0 && clicked === false){ 
 
             page.current = page.current - 1
             getItems()
             clicked = true

          }
       }}>
          <ArrowLeft/>
       </ArrowContainer>
    }
    {
       
       doWeHaveMoreResults === true && matchedItems.length !== 0 && <ArrowContainer title = "Next page" onClick = {()=>{
        let clicked = false
          if(doWeHaveMoreResults === true && clicked === false){
             page.current = page.current + 1
             getItems()
             clicked = true
          }
       }}>
          <ArrowRight/>
       </ArrowContainer>
    }
 </NavArrowContainer>
    )
 }

  

    return(
      <ThemeProvider  theme = {theme}>

          {
            onMobile === true ? 
            <Container shouldOverflow= {showSearchResults}>
              <Left>
                <MenuIconContainer onClick = {()=>{
                  setShowSideBar(true)
                }
                }>
                  <MenuIcon/>
                </MenuIconContainer>
                <SideBar show={showSideBar}>
                      {
                    userState.isLoggedIn === true &&
                    <MenuItem  user={true}>
                      {
                        
                        `${userState.username.toUpperCase()}`
                      }
                  </MenuItem> 
                     }
                  <MenuItem type="sidebar">
                    <MenuLink to="/" type="sidebar"> 
                      HOME
                    </MenuLink>
                  </MenuItem>
                  <MenuItem type="sidebar">
                    <MenuLink to="/searchresults" type="sidebar">
                      SEARCH
                    </MenuLink>
                  </MenuItem>
                  <MenuItem type="sidebar">
                    <MenuLink to="/products" type="sidebar">
                     ALL PRODUCTS
                    </MenuLink>
                  </MenuItem>
                  <MenuItem type="sidebar">
                    <MenuLink to="/cart" type="sidebar">
                      CART
                    </MenuLink>
                  </MenuItem>
                  <MenuItem type="sidebar" >
                    <MenuLink to="/wishlist" type="sidebar">
                     WISHLIST
                    </MenuLink>
                  </MenuItem>
                    {
                      userState.isLoggedIn === false &&
                      <MenuItem type="sidebar">
                        <MenuLink to ="/register" type="sidebar">
                           REGISTER
                        </MenuLink>
                      </MenuItem>
                       
                  }
                  {
                    userState.isLoggedIn === false ? 
                    <MenuItem type="sidebar">
                      <MenuLink to ="/login" component = "isLogggedIn" type="sidebar">
                        LOGIN
                      </MenuLink>
                    </MenuItem>
                      : 
                    <MenuItem type = "sidebar" component = "isLogggedIn" onClick = {()=>{
                      logOut()
                    }}>
                      
                        LOGOUT
                      
                    </MenuItem>
                  }
                  <SideBarClearIconContainer onClick = {()=>{

                    setShowSideBar(false)
                  }
                }>
                    <SideBarClearIcon/>
                  </SideBarClearIconContainer>
                </SideBar>
              </Left>
              <Center type = "mobile" show = {showSearch}>
                <MenuLink to="/">
                    CORNELIUS DEVS.
                </MenuLink>
              </Center> 
              <Right>
                <MenuSearchIconContainer show= {showSearch} onClick = {()=>{
                  // show search toggles the search component in the input container on mobie screens with max-width 500px
                  setShowSearch(true);
                  setMatchedItems([]);
                  setShowSearchResults(false);
                }}>
                  <MenuSearchIcon/>
                </MenuSearchIconContainer>
                <MobileInputContainer mobile = {true} show = {showSearch}>
                  <TextField
                    name = "search prducts"
                    placeholder = "search"
                    id ="search"
                    sx = {{height: {
                      lg: "5"
                    }, m: 0, color:"#442283" }}
                    color= "secondary"
                    size = "small"
                    onChange = {(e)=>{
                      setSearchTerm(e.target.value)
                    }}
                    InputProps={{
                      endAdornment: <InputAdornment position = "end"
                      sx = {{
                        backgroundColor: "#442283"
                      }}
                      > 
                      <SearchIconContainer location = {location}
                      onClick = {()=>{
                        page.current = 0
                        getItems()
                      }}
                      >
                        <StyledSearchOutlinedIcon 
                          
                          location = {location}
                          
                        />
                      </SearchIconContainer>
                      </InputAdornment> 
                    }}
                  />{

                    showSearchResults === true && currentLocation !== "searchresults" &&
                    <SearchResultContainer result={matchedItems.length !== 0 ? true : false }>
                      {
                        matchedItems.length !== 0 ?

                        <SearchResult result={matchedItems.length !== 0 ? true : false } >

                        <SearchCount result = {true}>
                            <SpanSearchCount>
                              <MenuLink to = "/searchresults">
                            {
                              matchedItems.length === 20 ? `20+ result(s) found` : `${matchedItems.length} result(s) found`
                            }
                            </MenuLink>

                            </SpanSearchCount>
                            <DeleteIconContainer 
                            onClick={()=>{
                              setMatchedItems([])
                              setShowSearchResults(false)
                            }}>

                              <StyledCancelIcon/>
                            </DeleteIconContainer>

                       </SearchCount>
                          {
                            getSearchResults()
                          }
                      </SearchResult> :
                        <SearchResult result={matchedItems.length !== 0 ? true : false }>

                            <SpanSearchCount result = {false}>
                          <MenuLink to ="/searchresults">
                            {
                              searchFailed === "" ? "No Match Found" : searchFailed
                            }
                            </MenuLink>
                            </SpanSearchCount>
                                <DeleteIconContainer 
                                onClick={()=>{
                                  setMatchedItems([])
                                  setSearchFailed("")
                                  setShowSearchResults(false)
                                }}>
                                  <StyledCancelIcon/>
                                </DeleteIconContainer>
                          </SearchResult>
                      }
                      
                    </SearchResultContainer>
                  }

                  <MenuSearchClearIconContainer onClick = {()=>{
                  // show search toggles the search component in the input container on mobie screens with max-width 500px
                  setShowSearch(false)
                }}>
                    <MenuSearchClearIcon/>
                  </MenuSearchClearIconContainer>
                    
                </MobileInputContainer>
                <MenuItem type = "cart">
                  <MenuLink to="/cart">
                    <Badge badgeContent ={quantity} color="primary">
                      <CartIcon/>
                    </Badge> 
                  </MenuLink>
                </MenuItem>
                {

                  currentLocation === "searchresults" && getNavArrows()
               }
                <MenuLink to = "/products">
              

                <FloatingLink title = "all products" location = {currentLocation}>
                  <StyledShopIcon/>
                </FloatingLink>
         </MenuLink>
              </Right>             
              {
            loading === true && currentLocation === "searchresults" && 
            <MessageDialog>
              <DialogBox>
                 
                     <Loader/>
                    
              </DialogBox>
             </MessageDialog>
           }
            </Container> :
         <Container shadow = {shadow} shouldOverflow= {showSearchResults}>

            <Left>
            <Language>
               EN
            </Language>
            <InputContainer>
              {/* <Input/>
              <SearchOutlinedIcon style={{color:"gray", fontSize:"14px"}}/> */}
              <TextField
                name = "search prducts"
                placeholder = "search"
                id ="search"
                sx = {{height: {
                  lg: "5"
                }, m: 0, color:"#442283" }}
                color= "secondary"
                size = "small"
                onChange = {(e)=>{
                  setSearchTerm(e.target.value)
                }}
                InputProps={{
                  endAdornment: <InputAdornment position = "end"
                  sx = {{
                    backgroundColor: "#442283"
                  }}
                  > 
                  <SearchIconContainer location = {location}
                   onClick = {()=>{
                    page.current = 0
                    getItems()
                   }}
                  >
                    <StyledSearchOutlinedIcon 
                      
                      location = {location}
                      
                    />
                  </SearchIconContainer>
                  </InputAdornment> 
                }}
              />{

                showSearchResults === true && currentLocation !== "searchresults" &&
                <SearchResultContainer result={matchedItems.length !== 0 ? true : false }>
                  {
                    matchedItems.length !== 0 ?
                    <SearchResult result={matchedItems.length !== 0 ? true : false }>
                     <SearchCount result = {true}>

                            <SpanSearchCount>
                              <MenuLink to="/searchresults">
                              {
                              matchedItems.length === 20 ? `20+ result(s) found` : `${matchedItems.length} result(s) found`
                            }
                              </MenuLink>
                            </SpanSearchCount>
                        <DeleteIconContainer 
                          onClick={()=>{
                            setMatchedItems([])
                            setShowSearchResults(false)
                          }}>
                            <StyledCancelIcon/>
                          </DeleteIconContainer>

                     </SearchCount>
                    
                      {
                        getSearchResults()
                      }
                   </SearchResult> :
                   <SearchResult result={ matchedItems.length !== 0 ? true : false }>

                      <SpanSearchCount result= {false}>
                      <MenuLink to="/searchresults">
                      {
                        searchFailed === "" ? "No Match Found" : searchFailed
                        }
                      </MenuLink>
                      </SpanSearchCount>
                        <DeleteIconContainer 
                        onClick={()=>{
                          setMatchedItems([])
                          setSearchFailed("")
                          setShowSearchResults(false)
                        }}>
                          <StyledCancelIcon/>
                        </DeleteIconContainer>
                  </SearchResult>
                  }
                  
                </SearchResultContainer>
              }
            </InputContainer>
          </Left>
          <Center>
              <Logo>
                <MenuLink to="/">
                   CORNELIUS DEVS.
                </MenuLink>
              </Logo>
          </Center>
          <Right>
            {
              userState.isLoggedIn? 
              <MenuItem user={true} type = "user">
                {
                  
                  `${userState.username.toUpperCase()}`
                }
             </MenuItem> 
                 : 
             <MenuItem>
              <MenuLink to="/register">
               REGISTER
              </MenuLink>
            </MenuItem> 
            }
            {
              userState.isLoggedIn === false ? 
              <MenuItem>
                <MenuLink to ="/login">
                  LOGIN
                </MenuLink>
              </MenuItem>
                 : 
              <MenuItem onClick = {()=>{
                logOut()
              }}>
                
                  LOGOUT
                
              </MenuItem>
            }
            
            <MenuItem>
              <MenuLink to="/cart">
                <Badge badgeContent ={quantity} color="primary">
                  <CartIcon/>
                </Badge> 
              </MenuLink>
            </MenuItem>
          </Right>
          {

          currentLocation === "searchresults" && getNavArrows()

         }
          <MenuLink to = "/products">
            <FloatingLink title = "all products" location = {currentLocation}>
              <StyledShopIcon/>
            </FloatingLink>
         </MenuLink>
         {
            loading === true && currentLocation === "searchresults" && 
            <MessageDialog>
              <DialogBox>
                 
                     <Loader/>
                    
              </DialogBox>
             </MessageDialog>
           }
        </Container> 
        
      }
      </ThemeProvider>
    )
}



export default NavBar
