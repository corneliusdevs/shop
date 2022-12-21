import styled from "styled-components"
import CancelIcon from "@mui/icons-material/CancelOutlined"
import {useSelector, useDispatch} from "react-redux"
import { removeProduct } from "../redux/cartRedux"

import {tablet} from "../responsive"


const Container = styled.div`
  display: flex;
  align-items:center;  
  padding-top: 0.5em;
  padding-right: 0.5rem
`
const Left = styled.div`

display: flex;
justify-content: center;
align-items: flex-start;
padding-left: 2vw;
`
const Right = styled.div`
  flex: 5;
 display: flex;
 justify-content: center;
 flex-direction: column;
 align-items: flex-start;
 padding: 0 5vw;
 word-break: break-all;
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
 flex-wrap: wrap;
 width: 100%;
 justify-content: flex-start;
 word-break: break-all;
`

const Span = styled.span`
  font-size: ${props => props.component ==="title" ? "1.2rem" : "1rem"};
  display: ${props => props.component ==="title" ? "block" : "inline"};
  font-weight: ${props => props.component ==="title" || props.component === "total" ? "500" : "300"};
  margin-right: ${props => props.extrainfo === "info" && "4vw"
  };
  margin-right: ${props => props.component === "title" && "10px" };

`
const CancelIconContainer = styled.div`
display: flex;
justify-content: center;
transition: all 0.5s ease-in;

${tablet({position: "absolute", right: "10px", marginTop: "-50px"})};

`
const StyledCancelIcon = styled(CancelIcon)`
color: gray;

&:hover{
  cursor: pointer;
  transform: scale(0.9);
  color: black;
 }
`

const OrderItem = ({image, title, total, quantity, selected, index})=>{

  const cartState = useSelector ( state => state.cart)
  // const cartState = JSON.parse(JSON.parse( localStorage.getItem("persist:root")).cart)
  const dispatch = useDispatch()

  const parentIndex = index
 

  const handleRemoveProduct = ()=>{
    console.log("parent Index: ", parentIndex)
    const product = cartState.products[parentIndex]
   
    let quantity = parseInt(product.quantity)
    let price = parseInt(product.price)
    
  
    dispatch(
      removeProduct(
        {
           product,
           amount: price * quantity,
           index
        }
      )
    )
    
  }

    const showSelected = ()=>{
       
       const order = []
       if(selected.selectedColor !== ""){
         order.push(
          <Span extrainfo = "info">color : {selected.selectedColor}</Span>
         )
       } 
       if(selected.selectedSize !== ""){
        order.push(
         <Span extrainfo = "info">size : {selected.selectedSize}</Span>
        )
      } 
       
        
       return order
    }

    return (
       <Container>
        <Left>
          <ImageContainer>
            <Image  src = {image} />
          </ImageContainer>
        </Left>
        <Right>
          <Span component  = "title">{title.toUpperCase()}</Span>
          <ExtraInfo>
            <Span extrainfo = "info">Quantity: {quantity}</Span>
            
            
            {
              Object.keys(selected).length !== 0 && showSelected()
            }
            <Span extrainfo = "info" component = "total">Total: ${total}</Span>
          </ExtraInfo>
          
        </Right>
        <CancelIconContainer
        onClick = { ()=>{
          handleRemoveProduct()
        }}
        title = "remove product">
          <StyledCancelIcon />
        </CancelIconContainer>
       </Container>

    )
}

export default OrderItem