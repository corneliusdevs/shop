import { usePaystackPayment  } from "react-paystack"
import styled, {keyframes} from "styled-components"
import {useState, useEffect} from "react"
import {useNavigate, Link} from "react-router-dom"
import { CheckCircleOutline, CancelOutlined } from "@mui/icons-material"
import {tablet, mobile, large} from "../../responsive"
import axios from "axios"
import {clearCart} from "../../redux/cartRedux"
import { useDispatch} from "react-redux"

const Container = styled.div`
 display: flex;
 flex-direction: column;
 width: 100%;
`
const Button = styled.button`
  padding: 0.4rem 1rem;
  width: 100%;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: yellow;
  transition: all 0.2s ease-in;

  &:hover{
    transform: scale(0.9);
  }
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
  ${large({maWidth: "50%"})};
${tablet({maWidth: "75%"})};
${mobile({maWidth: "85%"})};
`
const DialogBox = styled.div`
display: flex;
flex-direction: column;
align-items: center;
background-color: white;
padding: 60px;
padding-bottom: 20px;
border: 3px solid #442283;

${large({maWidth: "90%"})};
${tablet({maWidth: "90%"})};
${mobile({maWidth: "90%"})};
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

 text-align: center;
 padding-top: 5px;
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
`
const StyledCheckIcon = styled(CheckCircleOutline)`
 transform: scale(1.5);
 margin-top: -1rem;
 margin-bottom: 1rem;
 color: green;
`
const StyledCancelIcon = styled(CancelOutlined)`
transform: scale(1.5);
margin-top: -1rem;
margin-bottom: 1rem;
color: red;
`
const StyledLink = styled(Link)`
  text-decoration: none;

   &:link, &:visited, &:hover, &:active{
    color: white;
  }
`





const PaystackHook = ({email, amount, address, userId, products, accessToken} )=>{

   
  const [dialog, setDialog] = useState(false)
  const  [loadingMessage, setLoadingMessage] = useState("")

  const [makePayment, setMakePayment] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

   const config = {
     reference: (new Date()).getTime().toString(),
     email,
     amount: ( parseInt(amount) * 100),
     publicKey: "pk_test_da14d862eea200c1194d3d45ad60587b83b8faac"
   }

   
   const initializePayment = usePaystackPayment(config)
   

useEffect(()=>{
  const onSuccessfullyPaid = ()=>{
    setDialog(true)
    setLoadingMessage("processing")
    
    const processedProducts = [];
    const processProducts = ()=>{
        
         products.forEach((product)=>{
             processedProducts.push({
                 productId: product._id,
                 title: product.title,
                 quantity: product.quantity,
                 price: product.price
             })
         })
     
       }

      processProducts();
      const reqBody = {
        id: userId,
        userId,
        products: processedProducts,
        amount,
        address
      }

    
    axios.post("https://cdevs-ecomm-api.cyclic.app/api/orders/createorder", reqBody, {
      headers: {
        token: `bearer ${accessToken}`
      }
    }).then((res)=>{
      setLoadingMessage('success')
      
    }).catch(err =>{
       console.log(err)
       setLoadingMessage("failed")
    })
  }

   const onClosePaymentModal = ()=>{
    navigate("/products")
  }

  

  initializePayment(onSuccessfullyPaid, onClosePaymentModal)

}, [makePayment])


   

   const paystackPay = ()=>{
    setMakePayment(true)
  }



  return(
    <Container>
      <Button onClick = {()=>{
        paystackPay()
      }}>
        PAY WITH PAYSTACK
      </Button>
      {
            dialog && 
            <MessageDialog>
              <DialogBox>
                 {
                   loadingMessage === "processing" && 
                    <>
                     <Loader/>
                      
                     <Message>
                     creating order...
                     </Message>
                     <Message>
                       DO NOT CLOSE THIS PAGE!
                     </Message>
                    
                    </>
                     
                   
                 }
                {  
                  loadingMessage === "success" && 
                  <>
                    <StyledCheckIcon/>
                    <Message>
                      ORDER SUCCESSFUL
                    </Message>
                    <DialogButtonContainer>
                    <StyledLink to = "/products">
                      <DialogButton onClick = {()=>{
                        setDialog(false)
                        navigate("/products")
                        dispatch(
                          clearCart()
                        )
                      }}>Cool</DialogButton>
                    </StyledLink>
                    </DialogButtonContainer>
                  </>
              }
              {  
                  loadingMessage === "failed" &&
                  <>
                   <StyledCancelIcon/>
                    <Message>
                       COULD NOT PLACE ORDER
              
                    </Message>
                    <DialogButtonContainer>
                    <DialogButton onClick = {()=>{
                        setDialog(false)
                        navigate("/products")
                      }}>OK</DialogButton>
                    </DialogButtonContainer>
                  </>
              }
              
              </DialogBox>
           </MessageDialog>
        }
   </Container>
  )
}



export default PaystackHook