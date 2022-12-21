import styled from "styled-components"
import {TextField} from "@mui/material"
import NavBar from "../Components/NavBar"




import PaystackHook from "../payments/paystack/Paystack"
import {createTheme} from "@mui/material"
import {ThemeProvider}  from "@mui/material"


import OrderItem from "../Components/OrderItem"

import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import * as Yup from "yup"


import {useState} from "react"
import {useSelector} from "react-redux"

import {tablet, navmobile} from "../responsive"

import Footer from "../Components/Footer"



const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
`

const LeftContainer = styled.div`
 flex: 3;
 box-shadow:0px 0px 7px 0px rgba(0,0,0,0.45);
 margin-right: 0.5rem;
 margin-left: 0.5rem;

 ${tablet({maxWidth: "98vw", boxSizing: "border-box"})};
`

const RightContainer = styled.div`
  flex: 2;
  position: relative;
  margin-right: 0.5rem;
  margin-left: 0.5rem;
  box-shadow: 0px 0px 7px 0px rgba(0,0,0,0.45);
  height: fit-content;
  ${tablet({width: "70%", margin: "20px 0", boxSizing: "border-box"})};
  ${navmobile({width: "98vw"})};
`


const FormContainer = styled.div`
display: flex;
flex-direction: column;
background-color: #ffffff;
padding: 30px;
justify-content: space-between;
padding-top: 5px;
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0.5rem 0;
  `

const Button = styled.button`
  padding: 0.4rem 1rem;
  width: 100%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #442283;
  transition: all 0.2s ease-in;

  &:hover{
    transform: scale(0.9);
  }
`  
const OrderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  max-height: 80vh;
  overflow-x: hidden;

  ${tablet({maxWidth: "98vw", boxSizing: "border-box", position: "relative"})};
`

const Header = styled.h2`
  font-weight: 400;
  text-align: center;
`
const Wrapper = styled.div`
 display: flex;

 ${tablet({flexDirection: "column", alignItems: "center"})};
`
const Divider = styled.hr`
  background: #eee;
  width: 100%;
`
const GrandTotalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5em;
`
const GrandTotal = styled.span`
  color: black;
  font-weight: 500;
  font-size: 1.5rem;
`


const theme = createTheme({
  palette:{
    secondary: {
      main: "#442283"
    }
  }
})


  const Checkout = ()=>{
    
  const cart = useSelector(state => state.cart)
  const userState = useSelector( state => state.user)
  // const cart = JSON.parse(JSON.parse( localStorage.getItem("persist:root")).cart)
  const [userInfo, setUserInfo] = useState({})
  const [showPaymentOptions, setShowPaymentOptions] = useState(false)
  
 

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("full name is required")
      .min(6, "full name must be at least 6 characters")
      .max(200, "full name must not exceed 200 characters"),
    email: Yup.string()
       .required("email is required")
       .email("email is invalid"),
    phoneNumber: Yup.string().required("phone number is required")
      .matches(/^((\\+[1-9]{1,4}[\\-]*)|(\\([0-9]{2,3}\\)[\\-]*)|([0-9]{2,4})[\\-]*)*?[0-9]{3,4}?[\\-]*[0-9]{3,4}?$/ , "invalid phone number")
      .min(11, "invalid phone number"),
     address: Yup.string().required("address is required").min(10)
      });

      const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(validationSchema)
      })
      
      const onSubmit = async(data)=>{
        // create order
         setUserInfo(data)
         setShowPaymentOptions(true)
      }

  const showOrders = (cart)=>{
     const orders = []
     cart.products.forEach((order, index) => {
        
         orders.push(
           <OrderItem  key = {Date.now().toString + index} image = {order.img} quantity = {order.quantity}
            total = {order.quantity * order.price} 
            selected= {order.selected}
            index = {index}
            title = {order.title}
           />
         )
         orders.push(<Divider/>)
     })
  
     return orders
  }

  





    return(
      <ThemeProvider theme = {theme}>

        <Container>
              <NavBar shadow = {true} location = "checkout"/>
              
              <Header>YOUR ORDER</Header>
            <Wrapper>

            <LeftContainer>
              <OrderWrapper>
                { 
                   cart.products && showOrders(cart)
                  }
                
              </OrderWrapper>
            </LeftContainer>
            <RightContainer>
                <GrandTotalContainer>
                  <GrandTotal>GRAND TOTAL: ${`${cart.total}`}</GrandTotal>
                </GrandTotalContainer>
                <FormContainer>

                    <TextField
                      name = "fullName"
                      id= "fullName"
                      size = "medium"
                      margin = "dense"
                      color = "secondary"
                      placeholder = "Name"
                      helperText = {errors.username?.message}
                      {...register("username")}
                          error = {errors.username? true : false }
                      />
                    <TextField
                    name = "email"
                    id= "email"
                    color = "secondary"
                    type = "email"
                    placeholder = "Email e.g cdevs@gmail.com"
                    margin = "dense"
                    size = "medium"
                    helperText = {errors.email?.message}

                    
                    error = {errors.email? true: false }
                    {...register("email")}
                    />
                    
                    <TextField
                      name = "phoneNumber"
                      id= "phoneNumber"
                      color = "secondary"
                      type = "number"
                      margin = "dense"
                      size = "medium"
                      placeholder = "Phone Number"
                      helperText = {errors.phoneNumber?.message}

                      
                      error = {errors.phoneNumber? true: false }
                      {...register("phoneNumber")}
                      />
                      <TextField
                      name = "address"
                      id= "address"
                      color = "secondary"
                      type = "text"
                      margin = "dense"
                      size = "medium"
                      placeholder = "Your address"
                      helperText = {errors.address?.message}

                      
                      error = {errors.address? true: false }
                      {...register("address")}
                      />
                  
                  
                  <ButtonContainer>
                    <Button onClick = {
                      handleSubmit(onSubmit)
                    }>SUBMIT</Button>

                  </ButtonContainer>
                  
                  {
                    showPaymentOptions === true &&
                    <ButtonContainer>
                      <PaystackHook 
                      email = {userInfo.email}
                      amount = {cart.total}
                      address = {userInfo.address}
                      userId ={ userState.userId}
                      products = {cart.products}
                      accessToken = {userState.accessToken}
                      />
                   
                    {/* <FlutterwaveHook 
                        email = {userInfo.email}
                        phoneNum = {userInfo.phoneNum}
                        amount = {cart.total}
                        name = {userInfo.fullName}
                        userId ={ userState.userId}
                        products = {cart.products}
                        accessToken = {userState.accessToken}
                        /> */}

                  </ButtonContainer>
                  
                  }
                </FormContainer>
          </RightContainer>
         
         </Wrapper>
         <Footer/>
        </Container>
      </ThemeProvider>
    )
}

export default Checkout