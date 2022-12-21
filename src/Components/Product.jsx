import {Link} from "react-router-dom"
import styled from "styled-components"
import AddShoppingCart from '@mui/icons-material/AddShoppingCart'
import SearchIcon from "@mui/icons-material/Search"
import FavouriteBorderIcon from "@mui/icons-material/FavoriteBorder"

import { addProduct, addToWishlist } from "../redux/cartRedux"
import  { useDispatch } from "react-redux"
import { navmobile} from "../responsive"



const Icons = styled.div`
  display: none;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  top: 0;
  height: 100%; 
  background-color: rgba(0,0,0, 0.2);


`

const Category = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 300px;
  position: relative;

  &:hover ${Icons}{
     display: flex;
  };

  ${navmobile({height: "200px"})};
  

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
};

 
`

const IconsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  top: 0;
  height: 97%; 
  background-color: rgba(0,0,255, 0.09);
`  

const Item = styled.div`
  width: 100%;
`

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
const TextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
const Text = styled.span`
  display: none;
`
const Img = styled.img`
 width: 100%;
 height: 250px;
 object-fit: contain;

 ${navmobile({height: "150px"})};
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

const Product = ({product})=>{
 
  const dispatch = useDispatch()
  const addToCart = ()=>{
    if(product.size && product.color ){
      
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

    return(
          <Category key= {product._id}>
            <Item >
            <ImageContainer>
              <Img src = {product.img} />
              </ImageContainer>
              <TextContainer>
                  <Text>
                    {product.title}
                  </Text>
              </TextContainer>
            </Item>
            <IconsWrapper>
              <Icons className="Icons">
              
              <Icon onClick = {()=>{
                addToCart()
                }}>
                  <AddShoppingCart/>
              </Icon>
              <StyledLink to = {`/product/${product._id}`}>
                <Icon >
                    <SearchIcon/>
                </Icon>
              </StyledLink>
              <Icon onClick = {()=>{
                dispatch(
                  addToWishlist({
                    product
                  }))
              }}>
                  <FavouriteBorderIcon/>
              </Icon>
              </Icons>
            </IconsWrapper>
      </Category> 
    )
}


export default Product