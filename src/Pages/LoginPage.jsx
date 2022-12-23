import styled, {keyframes} from "styled-components";
import Background from "../Photos/ecom8.png"
import {useState} from "react"
import {TextField, InputAdornment, ThemeProvider, createTheme} from "@mui/material"
import {Link} from "react-router-dom"
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"

import { useDispatch} from "react-redux"
import { saveUser} from "../redux/userRedux"


import * as Yup from "yup"
import {useNavigate} from "react-router-dom"
import { Visibility, VisibilityOff , CancelOutlined, CheckCircleOutline, KeyboardBackspace } from "@mui/icons-material"
import {navmobile, tablet, mediumsmall, mobile} from "../responsive"
import {publicRequest}  from "../requestMethods"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: right center;
  width: 100%;
  height: 100vh;
  
  ${tablet({padding: "5vh 0"})};
  ${navmobile({padding: "5vh 0"})};
`;
const FormContainer = styled.div`
 
`;
 const FormWrapper = styled.div`
   background-color: rgba(200,200,200,0.8);
   width: fit-content;
   padding:20px;
   display: flex;
   align-items: center;
   flex-direction: column;

   ${mediumsmall({width:"70%"})};
`;


const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;



const Title = styled.h2`
  font-size: 20px;
  font-weight: 400;
  margin: 0;
  margin-left: 5px;
  padding-bottom: 1rem;
`
const ForgotPassword = styled.p`
  text-decoration: underline;
  margin: 0;
  font-size: 12px;
  margin-top: 10px;
  margin-left: 5px;
`;
const CreateAccount = styled.p`
  text-decoration: underline;
  margin: 0;
  margin-top: 9px;
  font-size: 12px;
  margin-left: 5px;
  color: black;
`;
const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const Button = styled.button`
  border: none;
  background-color: #442283;
  color: white;
  padding:10px 20px;
  cursor: pointer;
  font-size: 10px;
  margin-left: 5px;

  &:hover{
    transition: all 0.2s ease-in;
    transform: scale(1.1);
  } 
`;


const InputContainer = styled.div`
    background-color: white;
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 8px;  
    border-radius: 3px;
    overflow: hidden;
`
const ErrMsg = styled.div`
  color: red;
  font-weight: 400;
  font-size: 12px;
  padding-left: 3px;
  padding-right: 3px;
  width: 80%;
  margin-bottom: 8px;
`

const VisibilityIconContainer = styled.div`
 display: flex;
 align-items: center;
 justify-content: center;

 &:hover{
  cursor: pointer;
};
`

const StyledVisibilityIcon = styled(Visibility)``

const StyledVisibilityOffIcon = styled(VisibilityOff)``

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
const DialogButtonContainer = styled.div`
   display: flex;
  justify-content: flex-end;
  margin-top: 20px;
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

   
   ${mobile({ width: "1.5rem",  height: "1.5rem"})}
`
const StyledCancelIcon = styled(CancelOutlined)`
 transform: scale(1.5);
 margin-top: -1rem;
 margin-bottom: 1rem;
 color: red;
`
const StyledCheckIcon = styled(CheckCircleOutline)`
  transform: scale(1.5);
  margin-top: -1rem;
  margin-bottom: 1rem;
  color: green;
`
const StyledLink = styled(Link)`
   text-decoration: none;

    &:link, &:visited, &:hover, &:active{
     color: white;
   }
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
   transform: scale(1.3);
   color: white;
`




const theme = createTheme({
  palette:{
    primary: {
      main: "#442283"
    },
    secondary: {
      main: "#442283",
      
    }
  }
})




const LoginPage = ()=>{



const [showPassword, setShowPassword] = useState(false)
const [dialog, setDialog] = useState(false)
const [disableForm, setDisableForm] = useState(false)

  

const [loading, setLoading] = useState(false)
const [reqStatus, setReqStatus] = useState(null)

const dispatch  = useDispatch() 
const navigate = useNavigate()

const validationSchema = Yup.object().shape({
  username: Yup.string().required("username is required")
    .min(8, "Invalid username")
    .max(20, "Invalid username")
    .matches(/^\S*$/, "whitespace not allowed"),
  password: Yup.string()
    .required("password is required")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/, "invalid password")
    
    });
    
    
    
    const {register, handleSubmit, formState: {errors}} = useForm({
      resolver: yupResolver(validationSchema)
    })
    
    const onSubmit = async(data)=>{
      
      setLoading(true)
      setDialog(true)
      if (data !== null) {
        setDisableForm(true)
        publicRequest.post("/auth/login", {
          ...data

        }).then((res)=>{
          console.log("in the then block")
          dispatch(
            saveUser(res.data)
            )
          setDialog(true)
          setLoading(false)
          // parseInt(res.request.status) === 200 &&  
          // setReqStatus(200)  
          setReqStatus(200) 
          
        }).catch(err =>{
           console.log("this is err in the catch block: ", err)
           setLoading(false)
           setDialog(true)  
           
            
           if(!err.status && !err.response){
            // network err
            setReqStatus(500)
            
          }else{
            if (parseInt(err.response.status) === 401){
              setReqStatus(401)
            }else if (parseInt(err.response.status) === 500){
              setReqStatus(500)
            }
          } 
        })
      }
    }  


    return(
      <ThemeProvider theme = {theme}>
        <Container style = {{backgroundImage:`url(${Background})`}}>
        
          <FormWrapper>
             <Title>
               SIGN IN 
             </Title>
             <FormContainer>
                <Form>
                <InputContainer>
                    <TextField
                          name = "username"
                          placeholder = "username"
                          type = "text"
                          id ="username"
                          
                          {...register("username")}
                          error = {errors.username? true : false }
                          fullWidth
                          color = "secondary"
                          size = "small"
                          
                     />
               </InputContainer>
               <ErrMsg>{errors.username?.message}</ErrMsg>      
               <InputContainer>
                    <TextField
                    name = "password"
                    placeholder = "password"
                    type = { showPassword === false ? "password" : "text"}
                    id ="password"
                    
                    fullWidth
                    color = "secondary"
                    size = "small"
                    error = {errors.password? true : false}
                    
                    InputProps={{
                      endAdornment: <InputAdornment position = "end"

                      > 
                      <VisibilityIconContainer       onClick = {()=>{
                         setShowPassword( v => !v)
                      }}>
                        {
                         showPassword === true? <StyledVisibilityOffIcon/> : <StyledVisibilityIcon/>
                      }
                      </VisibilityIconContainer>
                      </InputAdornment> 
                    }}
                    {...register("password")}
                    />
                 </InputContainer>
                 <ErrMsg>{errors.password?.message}</ErrMsg>
                </Form>
            </FormContainer>

             <ButtonContainer>
                <Button disabled = {disableForm} onClick = {
                  handleSubmit(onSubmit)
                  } >LOGIN</Button>
             </ButtonContainer>
             <ForgotPassword>
               Forgot Password?
             </ForgotPassword>
             <StyledLink to = "/register">
              <CreateAccount>
                Create An Account
              </CreateAccount>
             </StyledLink>
          </FormWrapper>
          {
            dialog && 
            <MessageDialog>
              <DialogBox>
                 {
                   loading === true && 
                    <>
                     <Loader/>
                    </>
                     
                   
                 }
                {  
                  loading === false && reqStatus === 200 &&
                  <>
                    <StyledCheckIcon/>
                    <Message>
                       WELCOME BACK!  
                    </Message>
                    <DialogButtonContainer>
                    <StyledLink to = "/">
                      <DialogButton onClick = {()=>{
                         
                          setDialog(false)
                          setDisableForm(false)
                      }}>OK</DialogButton>
                    </StyledLink>
                    </DialogButtonContainer>
                  </>
              }
              {  
                  loading === false && reqStatus === 401 &&
                  <>
                   <StyledCancelIcon/>
                    <Message>
                       Invalid Credentials
              
                    </Message>
                    <DialogButtonContainer>
                    <DialogButton onClick = {()=>{
                        setDialog(false)
                        setDisableForm(false)
                      }}>OK</DialogButton>
                    </DialogButtonContainer>
                  </>
              }
              {  
                loading === false && reqStatus === 500 &&
                <>
                  <StyledCancelIcon/>
                  <Message>
                     Please Try Again Later.  
                  </Message>
                  <DialogButtonContainer>
                  <DialogButton onClick = {()=>{
                      setDialog(false)
                      setDisableForm(false)
                    }}>OK</DialogButton>
                  </DialogButtonContainer>
                </>
            }
              </DialogBox>
           </MessageDialog>
        }
        <ArrowBackContainer title = "Back" onClick = {()=>{
          navigate(-1)
        }}>
          <ArrowBack/>
        </ArrowBackContainer>
        </Container>
      </ThemeProvider>
    )
}

export default LoginPage;
