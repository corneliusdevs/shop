import styled from "styled-components"
import NavBar from "../Components/NavBar"
import Announcement from "../Components/Announcement"
import Footer from "../Components/Footer"
import Add from "@mui/icons-material/Add"
import ArrowDown from "@mui/icons-material/ArrowDropDown"
import ArrowUp from "@mui/icons-material/ArrowDropUp"
import Remove from "@mui/icons-material/Remove"
import CancelIcon from "@mui/icons-material/CancelOutlined"
import {Link, useNavigate} from "react-router-dom"


import {useState} from "react"
import {useSelector, useDispatch} from "react-redux"

import {hexcodes, colorNames} from "../Helper/colorCodes"

import {updateProduct, toggleSize, updateQtyAndTotal,  removeProduct, clearCart} from "../redux/cartRedux"

import {navmobile, tablet, large} from "../responsive"





const Container = styled.div`
 position: relative;

 ${tablet({width: "100%"})};
`;
const Wrapper = styled.div`
 ${tablet({display: "flex", flexDirection: "column", alignItems: "center"})};
`;
const Title = styled.h1`
 font-weight: 300;
 text-align: center;
 margin: 10px 0;
`;
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;

  ${tablet({width: "80%"})};
`;
const TopButtons = styled.button`
   padding: 5px;
   border: ${props => props.type === "filled" && "none"};
   background-color: ${props => props.type === "filled" ? "black" : "transparent"};
   color: ${props => props.type === "filled" && "white"};
   font-size: 12px;
   

   &:hover{
     cursor: pointer;
     outline: 1.5px solid black;
   };
   ${tablet({width: "80%", maxWidth: "200px"})};
   ${navmobile({maxWidth: "100px", padding: "10px 0"})};
  ${ props => props.type === "continue shopping" && tablet({display: "none"})};
`;
const TopTextsContainer = styled.div``;
const TopTexts = styled.span`
  margin: 0 5px;
  cursor: pointer;
  text-decoration: underline;

  ${props => props.type ===  "shopping cart" && tablet({display: "none"})};
`;
const Bottom = styled.div`
  display: flex;
  padding: 20px; 

  ${tablet({padding: "0", flexDirection: "column", alignItems: "center", borderSizing: "border-sizing", width: "100%"})};
`;
const Left = styled.div`
  flex: 3;
  ${tablet({width: "100%", boxSizing: "border-box"})};
`;
const Product = styled.div`
  display: flex;

  ${tablet({maxWidth: "100%", alignItems: "center"})};
`;
const ImageContainer = styled.div`
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${tablet({})};
  ${navmobile({overflow: "hidden", width: "40vw", height: "30vw", borderRadius: "50%", border : "2px solid lightgray"})};
`;
const Image = styled.img`
  width: 100%;
  height: 100px;
  object-fit: contain;

  ${tablet({width: "100%"})};
`;
const ProductDetails = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const ProductText = styled.span`
  
`;
const ProductColor = styled.div`
  width: 15px;
  height: 15px;
  
  border: ${props => props.selectedColor === props.colorName? '2.5px solid #ff1717' :'1.5px solid lightgray'};
  margin-right: 10px;
  background-color: #${props => props.colorHexCode};
  border-radius: 50%;

  &:hover{
  border: 2.5px solid #ff1717;
 }
`;
const ProductInfo = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  

  ${tablet({paddingLeft: "10px", fontSize: "80%"})};
`;
const ExtraInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const ProductControls = styled.div`
  display: flex;
  align-items: center; 
  font-size: 18px;

  cursor: pointer;
`;
const Price = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  padding-left: 4px;
`;


const Right = styled.div`
  flex: 1;
  border: 1px solid gray;
  padding: 20px;
  border-radius: 10px;
  height: fit-content;
  box-sizing: border-box;
  margin-bottom: 10px;

  ${tablet({ borderRadius: "0", width: "90%", marginTop: "10vh"})};
`;
const RightTitle = styled.h2`
  font-weight: 300;
  margin: 0;
  text-align: center;
`;
const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const OrderDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const Info = styled.span`
  font-size: ${props => props.type === "total"? "18px" : "14px"};
  font-weight: ${props => props.type === "total" && "500"};
  margin-bottom: 10px;
`;
const GrandTotal = styled.div`
 font-size: 18px;
 font-weight: 500;

 ${large({display: "none"})};
`
const Button = styled.button`
  width: 100%;
  background-color: black;
  color: white;
  padding: 5px 0;
  font-size: 14px;
  border: none;
  transition: all 0.2s ease-in;

  &:hover{
    cursor: pointer;
    transform: scale(0.95);
  };

  ${tablet({position: "fixed", bottom: "0", height: "10vh" })};
`;
const Hr = styled.hr`
 background-color: #eee;
`;

const ProductColorContainer = styled.div`
  display: flex;
  align-items: center;

  ${navmobile({flexDirection: "column" })}
`
const SizeContainer = styled.div`
  
`;


const CustomSelectContainer = styled.div`
  width: 5vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${tablet({minWidth: "50px"})};
`;

const CustomSelect = styled.div`
  border: 1px solid gray;
  width: 5vw;
  display: ${ props => props.toggleState === false ? "none" : "flex"};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
  box-shadow: 1.5px 1px 2px 2px lightgray;
  transition: height 1.5s;
  
  ${tablet({minWidth: "50px"})};

`;
const CustomOption = styled.div`
   width: 100%;
   text-align: center;
   border:  1px solid gray  ;
   display: flex;
   justify-content: space-evenly;
   align-items: center;
   margin-bottom: 2px;
   font-size: 12px;
   padding: 2px 3px;

   &:hover{
    background-color: #442288;
    color: white;
   };

   ${navmobile({padding: 0})};
`;
   
const CustomOption1 = styled.div`
   width: 100%;
   text-align: center;
   border-top: ${ props => props.index !== 0  && "1px solid gray"  };
   display: ${ props => props.toggleState === false ? "none" : "flex"};
   justify-content: center;
   align-items: center;
  

   &:hover{
    background-color: #442288;
    color: white;
   }
`;

const TextInfo = styled.span`
   color: red;
   font-weight: 400;
`
const DeleteIconContainer = styled.div`
  display: flex;
  justify-content: center;
  transition: all 0.5s ease-in;

  &:hover{
    cursor: pointer;
    transform: scale(0.9);
    color: black;
   };

  ${tablet({justifyContent: "flex-start", marginLeft: "10px"})}
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

   ${ props => props.type === "continue shopping" && tablet({display: "none"})};
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
`
const DialogButtonContainer = styled.div`
   display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  margin-right: -30px;
`

const DialogButton = styled.button`
  color: white;
  background-color: #442283;
  font-weight: 400;
  padding: 10px 25px;
  border: none;
  box-shadow: inset 0px 0px 1px 1px rgba(255,255,255,0.75);

  &:hover{
  cursor: pointer;
  };
 
`
const Message = styled.span`
  font-size: 1.5rem;
`

const TextContainer = styled.div`

${props => props.type === "color text" && tablet({display: "flex", justifyContent: "flex-start", width: "100%", marginBottom: "5px"})};

${navmobile({marginBottom: "8px"})};
`

const PayButtonContainer = styled.div`
 display: flex;
 align-items: center;
 justify-content: center;
`
const ProductColorsList = styled.div`
 
 ${tablet({display: "flex", alignItems: "center", justifyContent: "flex-start", width: "100%", marginBottom: "5"})};
`





const CartPage = ()=>{
const cartState = useSelector( state => state.cart)
// const cartState = JSON.parse(JSON.parse( localStorage.getItem("persist:root")).cart)

 const [dialog, setDialog] = useState(false)
console.log("cart state: ", cartState)
const dispatch = useDispatch()

const navigate = useNavigate()




const validateCart = ()=>{
  let unSelected = [];
  
  if(cartState.products.length === 0){

     return setDialog(true)
  }

   cartState.products.forEach((item, index)=>{
      if((item.size && item.size.length !== 0  && item.selected?.selectedSize === "") ||( item.color && item.color.length !== 0 && item.selected?.selectedColor === "" )){
          unSelected.push(item)
      }
   })
     
   if(unSelected.length > 0){

      return  setDialog(true)
      
   }else{
      navigate("/checkout")
   }
}




// remove products 
const handleRemoveProduct = (index)=>{
  const product = cartState.products[index]
 
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

//update product quantity 
const updateQuantity = (index, actionType) =>{
  const product = cartState.products[index]
  let allProducts = [...cartState.products]
 

  if(actionType === "inc"){

    let  newTotal = 0;

    // create a new product object and increase the quantity field by 1
    let newQuantity = parseInt(product.quantity)
    const updatedProduct = {
            ...product,
            quantity: newQuantity + 1
       
    }
   

    // update the all products array so as to find the total price
    allProducts[index] = updatedProduct


    allProducts.forEach((item)=>{
      let price = item.price * item.quantity 
      newTotal += price
    }

    ) 

    dispatch(
      updateQtyAndTotal(
        {
           updatedProduct,
           index,
           newTotal
        }
      )
    )
  }
  if(actionType === "dec"){
  
    let  newTotal = 0;

    // create a new product object and decrease the quantity field by 1
    let newQuantity = parseInt(product.quantity)

    const updatedProduct = {
            ...product,
            quantity: newQuantity === 0 ? 0 : newQuantity - 1
       
    }
    
    if (newQuantity !== 0){
      // update the all products array so as to find the total price
      allProducts[index] = updatedProduct
  
  
      allProducts.forEach((item)=>{
        let price = item.price * item.quantity 
        newTotal += price
      }
  
      ) 
  
      dispatch(
        updateQtyAndTotal(
          {
             updatedProduct,
             index,
             newTotal
          }
        )
      )

    }
  }

}

// toggleSizeState
const toggleProductSizeState = (index)=>{
  const product = cartState.products[index]
  dispatch(
    toggleSize(
      {
         product : {
          ...product,
          selected: {
            ...product.selected,
            toggleSize: !product.selected.toggleSize
          }
         },
         index
      }
    )
  )
}
// update Changes made to color selection

const updateProductInfo = (index, payload, field)=>{
     // use the index t find the product
     // use the color to update the vaue of te selected color in the redux ////state
     
     const product = cartState.products[index]
     if(field === "color"){
        
       dispatch(
         updateProduct(
           {
              product : {
               ...product,
               selected: {
                 ...product.selected,
                 selectedColor: payload
               }
              },
              index,
              field
           }
         )
       )
     }if(field === "size"){
     
      dispatch(
        updateProduct(
          {
             product : {
              ...product,
              selected: {
                ...product.selected,
                selectedSize: payload,
                toggleSize: !product.selected.toggleSize
              }
             },
             index,
             field
          }
        )
      )
    }if(field === "quantity"){
      console.log("in quantity block")
      dispatch(
        updateProduct(
          {
             product : {
              ...product,
               quantity: payload
             }
          }
        )
      )
    }


}

const showOption = (item, parentIndex)=>{
  let ui = []
    item.size && item.size.forEach((s, index, arr) =>{

      ui.push(
        <CustomOption1 
        index = {index + 1} 
        data-value = {s}
        toggleState = {item.selected.toggleSize}
        onClick = {(e)=>{ 
           
          const payload = e.target.dataset.value;
          
          updateProductInfo(parentIndex, payload, "size" )
        }}
        key={s + String(Date.now())}
        >{s.toUpperCase()}</CustomOption1>
      );

        // index !== arr.length-1 &&  ui.push(<Divider key = {index + String(Date.now())}/>)
      
})

      return ui
}

const getUi = (itemArray)=>{
  const ui = []
  //let itemIndex = 0;
    itemArray.forEach( (item, index, arr) =>{
    
     ui.push(
       <Product  key = {index + String(Date.now())}>
          <ImageContainer>
            <StyledLink to ={`/product/${item._id}`}>
              <Image src = {item.img}/>
            </StyledLink>
          </ImageContainer>
          <ProductInfo>
            <ProductDetails>
                <TextContainer>
                  <ProductText>
                      <b>Product</b>: {item.title && item.title.toUpperCase()}
                  </ProductText>
                </TextContainer>
                <TextContainer>
                  <ProductText>
                      <b>ID</b>: 002A3.2K
                  </ProductText>
                </TextContainer>
                  <ProductColorContainer>

                    <ProductColorsList>
                  {
                    
                    item.color && item.color.map( c =>{
                      
                      // get the color hex code from the color name
                       const productColor = hexcodes[colorNames.indexOf(c)]

                       return(
                             <ProductColor
                               selectedColor = {item.selected.selectedColor}
                               colorName = {c}
                               colorHexCode = {productColor}
                               key = {productColor + String(Date.now())}
                               onClick = {()=>{
                                updateProductInfo(index, c, "color")
                               }}
                             />
                             )
                            }
                            )
                            
                            
                          }
                    </ProductColorsList>
                    {

                    item.color.length !== 0 &&
                    <TextContainer type="color text">
                        <ProductText>
                          <b>selected color: </b>{item.selected.selectedColor === ""  ? <TextInfo>please select a color! </TextInfo>: item.selected.selectedColor}
                        </ProductText>
                    </TextContainer>
                    }
                  </ProductColorContainer>



                  <SizeContainer>
                   {
                     item.size.length !== 0 &&
                    <ProductText>
                      <b>selected size: </b>{
                      item.selected.selectedSize === "" ? <TextInfo>please select a size! </TextInfo> : item.selected.selectedSize.toUpperCase()
                    }
                    </ProductText>
                   }
                  

                   {
                     item.size.length !== 0 &&

                  <CustomSelectContainer>
                    <CustomOption 
                    index = {0} 
                    toggleState = {item.selected.toggleSize}
                    onClick = {()=>{
                      toggleProductSizeState(index)
                    }}>
                      {item.selected.selectedSize === "" ? "Size" : item.selected.selectedSize.toUpperCase()} {item.selected.toggleSize  === false ? <ArrowDown/> : <ArrowUp/>}
                    </CustomOption>

                      <CustomSelect toggleState = {item.selected.toggleSize}>
                          {
                            
                            showOption(item, index)
                            
                            }
                        
                      </CustomSelect>

                  </CustomSelectContainer>


                }




                </SizeContainer>
              </ProductDetails>
              <ExtraInfo>
                  <DeleteIconContainer title = "remove product" onClick = { ()=>{
                    handleRemoveProduct(index)
                  }}>
                    <CancelIcon style = {{color: "gray"}}/>
                  </DeleteIconContainer>
                  <ProductControls>
                      <Add 
                      style = {{fontSize:"18px"}}
                      onClick = { ()=>{
                        updateQuantity(index, "inc")
                      }}
                      /> 
                      <b>{item.quantity}</b>
                      <Remove 
                      style = {{fontSize:"18px"}}
                      onClick = { ()=>{
                        updateQuantity(index, "dec")
                      }}
                      />
                  </ProductControls>
                  <Price>${item.price}</Price>
              </ExtraInfo>
          </ProductInfo>
     </Product>
     )
  
      ! (index === arr.length-1) &&  ui.push(<Hr key = {index}/>)
       // itemIndex ++  
    })

    return ui
  }


    return(
       <Container>
         <Announcement/>
         <NavBar shadow = {true}/>
         <Wrapper>
             <Title>
                 YOUR CART
             </Title>
             <GrandTotal>
               {`TOTAL: \$${cartState.total}`}
             </GrandTotal>
             <Top>
                <StyledLink to = "/products" type = "continue shopping">
                  <TopButtons type = "continue shopping">
                      CONTINUE SHOPPING
                  </TopButtons>
                </StyledLink>
                <TopTextsContainer>
                    <TopTexts type = "shopping cart">
                    Shopping Cart{cartState.quantity}
                    </TopTexts>
                    <StyledLink to = "/wishlist">
                      <TopTexts>
                      {
                    `Your Wishlist(${cartState.wishlist.length})`
                    }

                      </TopTexts>
                    </StyledLink>
                </TopTextsContainer>
                <TopButtons 
                type = "filled"
                onClick = {()=>{
                  dispatch(
                    clearCart()
                  )
                }}
                >
                    CLEAR CART
                </TopButtons>
             </Top>
             <Bottom>
               <Left>
                  {
                      getUi(cartState.products)
                  }
                
                 
               </Left>
               <Right>
                 <RightTitle>ORDER SUMMARY</RightTitle>
                 <OrderDetails>
                    <InfoContainer>
                      <Info>Subtotal</Info>
                      <Info>$100</Info>
                    </InfoContainer>
                    <InfoContainer>
                      <Info>Estimated Shipping</Info>
                      <Info>$30</Info>
                    </InfoContainer>
                    <InfoContainer>
                      <Info>Shipping Discount</Info>
                      <Info>-$30</Info>
                    </InfoContainer>
                    <InfoContainer>
                      <Info type = "total">Total</Info>
                      <Info  type = "total">${cartState.total}</Info>
                    </InfoContainer>
                   
                     <PayButtonContainer>

                        <Button onClick = {()=>{
                          validateCart()      
                        }}>
                          CHECKOUT NOW
                        </Button>

                      </PayButtonContainer>
                   
                 </OrderDetails>
                 {
                   dialog === true && <MessageDialog>
                   <DialogBox>
                     {
                       cartState.products.length === 0 ?<Message>
                       Please Add Items To Your Cart Before Checking Out
                     </Message> :
                     <Message>
                       Please Make Sure All Sizes And colors Are Selected
                     </Message>
                     
                     }
                     <DialogButtonContainer>
                         <DialogButton onClick = {()=>{
                           setDialog(false)
                         }}>GOT IT</DialogButton>
                     </DialogButtonContainer>
                   </DialogBox>
                 </MessageDialog>
                 }
               </Right>
             </Bottom>
         </Wrapper>
         <Footer/>
       </Container>
    )
}

export default CartPage