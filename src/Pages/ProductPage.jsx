import {useState, useEffect} from "react"
import {useLocation} from "react-router-dom"
import {publicRequest} from "../requestMethods"
import styled from "styled-components"
import {keyframes} from "styled-components"
import Announcement from "../Components/Announcement"
import NavBar from "../Components/NavBar"
import Newsletter from "../Components/Newsletter"
import Footer from "../Components/Footer"


import AddButton from "@mui/icons-material/Add"
import SubtractButton from "@mui/icons-material/Remove"
import { addProduct } from "../redux/cartRedux"
import  { useDispatch } from "react-redux"
import {hexcodes, colorNames} from "../Helper/colorCodes"
import {smallmobile, navmobile, tablet, mediumsmall, large, mobile} from "../responsive"
import {KeyboardBackspace} from "@mui/icons-material"
import {useNavigate} from "react-router-dom"



const Container = styled.div`
 width: 100%;
`;
const ImageContainer = styled.div`
   flex: 1;
   
   ${large({display: "flex", alignItems: "flex-start"})};
   ${tablet({display: "flex", alignItems: "flex-start"})};
   ${mediumsmall({display: "flex", width: "100%", maxHeight: "40vh", backgroundColor: "#eee"})};
   ${smallmobile({display: "flex", width: "100%", maxHeight: "40vh", backgroundColor: "#eee"})};
`;
const InfoContainer = styled.div`
   flex: 1;
   padding-left: 5%;
    
   
  ${mediumsmall({display: "flex", flexDirection: "column",  width: "100%", alignItems: "center"})};
   ${smallmobile({display: "flex", alignItems: "center",flexDirection: "column", width: "100%", paddingLeft: "0"})};
`;

const Title = styled.h2`
 font-weight: 400;
`;

const Description = styled.p`
   font-size: 12px;
`;

const Price = styled.span`
  font-size: 2em;
  font-weight: 300;
`; 

const Image = styled.img`
  width: 100%;
  object-fit: contain;
  max-height: 100%;

  ${large({paddingTop: "30px"})};
  ${tablet({paddingTop: "30px"})};
  ${mediumsmall({height: "calc(40vh - 30px)"})};
`;

const Wrapper = styled.div`
  display: flex;
  padding: 30px;
  height: 70vh;

  ${navmobile({padding: "10px", height: "70vh", fontSize: "4vw", boxSizing: "border-box"})};
  ${mediumsmall({flexDirection: "column", width: "100%", height: "fit-content", alignItems: "center"})};
  ${smallmobile({flexDirection: "column", width: "100%"})};
`;
const ExtraInfo = styled.div`
  display: flex;
  width: max-content;
  margin-top: 15px;
  width: 60%;

  ${large({width: "100%", flexDirection: "column"})};
  ${tablet({width: "100%", flexDirection: "column"})};
  ${navmobile({width: "100%"})};
  ${mediumsmall({ alignItems: "center", width: "fit-content"})};
  ${smallmobile({flexDirection: "column", alignItems: "center"})};
`;
const Quantity = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50%;
  margin-top: 20px;

  ${large({width: "fit-content", justifyContent: "space-evenly"})};
  ${tablet({width: "fit-content", justifyContent: "space-evenly"})};
  ${navmobile({width: "100%", justifyContent: "space-evenly"})};
  ${mediumsmall({width: "100%", justifyContent: "space-evenly"})};
  ${smallmobile({width: '100%',justifyContent: "space-evenly"})};
`;

const ColorContainer = styled.div`
  display: flex;
  width: 50%;

  ${large({width: "100%"})};
  ${tablet({width: "100%"})};
  ${mediumsmall({})}
`;
const SizeContainer = styled.div`
  margin-left: 30px;

  ${large({marginTop: "10px"})};
  ${tablet({marginTop: "10px"})};
  
  ${mediumsmall({marginLeft: "0", marginTop: "10px"})}
  
`;
const Color = styled.div`
 width: 20px;
 height: 20px;
 border: ${props => props.selectedColor === props.colorState? '2.5px solid #ff1717' :'1.5px solid lightgray'};
 border-radius: 50%;
 background-color: #${props => props.color};
 margin-left: 10px;

 &:hover{
  border: 2.5px solid #ff1717;
 }
`;
const Text = styled.span``;
const Option = styled.select`
  margin-left: 10px;
  font-size: 12px;
  padding: 3px;
`;
const OptionValue = styled.option``;

const NumberContainer =  styled.div`
  display: flex;
`;

const IconContainer =styled.div``; 

const Number =styled.div`
  border: 1px solid teal;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
`;

const Button = styled.button`
  border: 2px solid teal;
  font-size: 10px;
  background-color: transparent;
  padding: 10px;

  &:hover{
    background-color: teal;
    color: white;
  };
`;

const ButtonContainer = styled.div`
  margin-left: 50px;
  transition: all 0.2s ease-in;

  &:hover{
     transform: scale(0.8);
  };

  ${navmobile({marginLeft: "2%"})};
  ${mediumsmall({marginRight: 0, width: "fit-content"})};
  ${smallmobile({marginLeft: "0"})};
`; 

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

const Message = styled.span`
  font-size: 1.5rem;
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

   animation:${rotate} 0.9s linear infinite;

   
   ${mobile({ width: "1.2rem",  height: "1.2rem"})}
`
const ArrowBackContainer = styled.div`
  border: 0.6px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem 1rem;
  background-color: rgba(50, 50, 50, 0.2);
  position: absolute;
  top: 2vh;
  left: 2vw;
  
  &:hover{
     border: 1.8px solid white;
  }
`
const ArrowBack = styled(KeyboardBackspace)`
   transform: scale(1.2);
   color: white;
`




const ProductPage = ()=>{

  const [product, setProduct] = useState({})
  const [quantity, setQuantity] = useState(1)
  const [prodColor, setProdColor] = useState("")
  const [selectedSize, setSelectedSize] = useState("")
  const id = useLocation().pathname.split("/")[2]
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(()=>{
    const getProduct = async ()=>{

      
      publicRequest.get(`/products/${id}`).then((res)=>{
         setProduct(res.data)
         
      }).catch((err)=>{
        console.log(err)
      })
      
    }

    getProduct()

  }, [id])

  const handleClick = ()=>{
   
    dispatch(
      addProduct({
        product: {
          ...product,
          selected:{
            selectedSize: selectedSize,
            selectedColor: prodColor,
            toggleSize: false
          },
          quantity
            }
      }))


  }
  

    return(
        <Container>
          <Announcement/>
          <NavBar shadow = {true}/>
          {
            Object.keys(product).length !== 0 ? <Wrapper>
            <ImageContainer>
              <Image src = {product.img}/>
            </ImageContainer>
            <InfoContainer>
              <Title>
                 {product.title.toUpperCase()}
              </Title>
              <Description>

                {`Desc: ${product.desc}`}
                  
              </Description>
              <Price>
                 $ {product.price}
              </Price>
              <ExtraInfo>
              <ColorContainer>
              { product.color && product.color?.length !== 0 &&
                <Text>Color</Text>
                 }{
                  product.color && product.color.map(c =>{

                    const productColor = hexcodes[colorNames.indexOf(c)]
                    return(

                      <Color selectedColor = {c} colorState = {prodColor}color = {productColor} key = {productColor + Date.now()} onClick = {()=>{ 
                        console.log("color selected", productColor)
                        setProdColor(c)}}></Color>
                    )
                  }
                    )

                  }
                
              </ColorContainer>
              {
                product.size && product.size?.length !== 0 &&
                <SizeContainer>
                <Text>Size</Text>
                <Option key = {`size${Date.now()}`} onChange = {(e)=> setSelectedSize(e.target.value)}>
                  {
                    product.size && product.size.map(s =>
                      
                  <OptionValue value = {s} key={s + Date.now() }  onChange = {(e)=> setSelectedSize(e.target.value)}>
                     {s.toUpperCase()}
                  </OptionValue>
                      )
                  }
                  
                </Option>
              </SizeContainer>}
            </ExtraInfo>
            <Quantity>
              <NumberContainer>
                <IconContainer onClick =  {(e)=> setQuantity( 
                  q => q === 1 ? q:  q - 1
                )}>
                  <SubtractButton/>
                </IconContainer>
                <Number>
                    {quantity}
                </Number>
                <IconContainer  onClick =  {(e)=> setQuantity( 
                  q => q + 1
                )}>
                  <AddButton/>
                  
                </IconContainer>
              </NumberContainer>
              <ButtonContainer>
                <Button onClick = {(e)=>{handleClick(e)}}>
                  ADD TO CART
                </Button>
              </ButtonContainer>
            </Quantity>
            </InfoContainer>
            
        </Wrapper> : 
        <MessageDialog>
        <DialogBox>
           
               <Loader/>
                
               <Message>loading...</Message>
              
           
           </DialogBox>
              <ArrowBackContainer title = "Back" onClick = {()=>{
              navigate(-1)
            }}>
              <ArrowBack/>
            </ArrowBackContainer>
         </MessageDialog>
       }
          <Newsletter/>
          <Footer/>
        </Container>
    )
}

export default ProductPage