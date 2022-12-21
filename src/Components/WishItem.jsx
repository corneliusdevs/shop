import styled from "styled-components"
import {Link} from "react-router-dom"
import CancelIcon from "@mui/icons-material/Clear"
import SearchIcon from "@mui/icons-material/Search"
import {useSelector, useDispatch} from "react-redux"
import { addProduct, removeFromWishlist } from "../redux/cartRedux"
import AddShoppingCart from '@mui/icons-material/AddShoppingCart'


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items:center;  
  padding-right: 0.5rem;
  padding-left: 0.5rem;
`
const Icons = styled.div`
  display: none;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  top: 0;
  height: 100%; 
  

`
const Icon = styled.div`
display: flex;
align-items: center;
justify-content: center;
border-radius: 50%;
background-color: rgba(255,255,255, 0.9);
font-size: 10px !important;
padding: 3px;
cursor:pointer;
margin: 0 5px;

&:hover{
   transition: all 0.5s ease;
   transform: scale(1.2);
}
`

const WishContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
position: relative;
width: 100%;

&:hover ${Icons}{
   display: flex;
   background-color: rgba(100, 100, 100, 0.2);
}

`
const Left = styled.div`
//  flex: 1;
display: flex;
justify-content: center;
align-items: flex-start;
padding: 0 2vw;
`
const Right = styled.div`
  flex: 5;
 display: flex;
 justify-content: center;
 flex-direction: column;
 align-items: flex-start;
 padding: 0 5vw;
`
const ImageContainer = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 3px solid lightgray;
  overflow: hidden;
`

const Image = styled.img`
  width: 100%;
  object-fit: contain;
`
const ExtraInfo = styled.div`
 display: flex;
 width: 100%;
 justify-content: flex-start;
`

const Span = styled.span`
  font-size: ${props => props.component ==="title" ? "1.2rem" : "1rem"};
  display: ${props => props.component ==="title" ? "block" : "inline"};
  font-weight: ${props => props.component ==="title" || props.component === "total" ? "500" : "300"};
  margin-right: ${props => props.extrainfo === "info" && "4vw"
  };
`
const CancelIconContainer = styled.div`
display: flex;
justify-content: center;
transition: all 0.5s ease-in;
padding-right: 

`
const StyledCancelIcon = styled(CancelIcon)`

`
const IconsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  top: 0;
  height: 97%; 
  background-color: rgba(0,0,255, 0.1);
`  
const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:hover, &:focus{
    color: black;
  };
  &:active{
  color: black;
  };
`

const WishItem = ({image, title, desc, index, product})=>{

  const cartState = useSelector ( state => state.cart)
 
  // const cartState = JSON.parse(JSON.parse( localStorage.getItem("persist:root")).cart)

  const parentIndex = index
  const dispatch = useDispatch()
 
  const addToCart = ()=>{
    if(typeof product.size !== "undefined" && typeof product.color !== "undefined" ){
      
      dispatch(
        addProduct({
          product: {
            ...product,
            selected:{
              selectedSize: "",
              selectedColor: "",
              toggleSize: false
            },
            quantity: 1
              }
        }))

    }else if (typeof product.size !== "undefined" ){

      dispatch(
        addProduct({
          product: {
            ...product,
            selected:{
              selectedSize: "",
              toggleSize: false
            },
            quantity: 1
              }
        }))


    }else if( typeof product.color !== "undefined" ){

      dispatch(
        addProduct({
          product: {
            ...product,
            selected:{
              selectedColor: "",
              toggleSize: false
            },
            quantity: 1
              }
        }))
    }else if( typeof product.color === "undefined" &&typeof product.color ==="undefined" ){

      dispatch(
        addProduct({
          product: {
            ...product,
            selected:{
              toggleSize: false
            },
            quantity: 1
              }
        }))
    }

    }

  const handleRemoveWish = ()=>{
    console.log("parent Index: ", parentIndex)
    const product = cartState.products[parentIndex]
   
  
    dispatch(
        removeFromWishlist(
        {
           product,
           index
        }
      )
    )
    
  }

    

    return (
       <Container>
        <WishContainer>
            <Left>
            <ImageContainer>
                <Image  src = {image} />
            </ImageContainer>
            </Left>
            <Right>
            <Span component  = "title">{title.toUpperCase()}</Span>
            <ExtraInfo>
                <Span extrainfo = "info">Desc: {desc}</Span>
                
            </ExtraInfo>
            
            </Right>
            <IconsWrapper>
                  <Icons className="Icons">
                  
                  <Icon onClick = {()=>{
                    addToCart()
                  }}
                  title = "add to cart"
                  >
                      <AddShoppingCart/>
                  </Icon>
                  <StyledLink to = {`/product/${product._id}`}
                   title = "search"
                  >
                    <Icon >
                        <SearchIcon/>
                    </Icon>
                  </StyledLink>
                  <Icon onClick = { ()=>{
                    handleRemoveWish()
                    }}
                    title = "remove from wishlist">
                        <StyledCancelIcon />
                    </Icon>
                  </Icons>
            </IconsWrapper>
        </WishContainer>
       </Container>

    )
}

export default WishItem