import styled, {keyframes} from "styled-components";
import Background from "../Photos/ecom8.png"
import {useState} from "react"

import {Link} from "react-router-dom"
import {TextField, InputAdornment, ThemeProvider, createTheme} from "@mui/material"
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"

import {publicRequest} from "../requestMethods"

import * as Yup from "yup"

import {useNavigate} from "react-router-dom"
import { Visibility, VisibilityOff, CancelOutlined, CheckCircleOutline, KeyboardBackspace} from "@mui/icons-material"
import {navmobile, tablet, mobile} from "../responsive"

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
  position: relative;
  box-sizing: border-box;
  
  ${tablet({padding: "5vh 0"})};
  ${navmobile({padding: "5vh 0", height: "fit-content"})};
  ${mobile({height: "100vh"})}
`;

const FormContainer = styled.div`
  width: 80%;
`;
 const FormWrapper = styled.div`
   background-color: rgba(200,200,200,0.8);
   width:40%;
   padding:10px;
   display: flex;
   flex-direction: column;
   align-items: center;
   
   ${tablet({width:"60%"})};
   ${navmobile({width:"70%"})};
`;
const Title = styled.h2`
  font-size: 20px;
  font-weight: 400;
  text-align: center;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  &:disabled{
    pointer-events: none;
    cursor: not-allowed;
   }
`;



const Privacy = styled.p`
  padding-left: 3px;
  padding-right: 3px;
  width: 80%;
  font-size: 13px;
`;
const ButtonContainer = styled.div`
   width: 100%;
   display: flex;
   justify-content: flex-end;
`;

const Button = styled.button`
  border: none;
  background-color: #442283;
  color: white;
  padding:0.35rem 0.8rem;
  cursor: pointer;
  font-size: 12px;
  margin-right: 2.5rem;

  
  &:hover{
    transition: all 0.2s ease-in;
    transform: scale(1.1);
    box-shadow: outset 0px 0px 1px 1px rgba(255,255,255,0.75);
  };
  &:disabled{
    pointer-events: none;
    cursor: not-allowed;
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

  &:disabled{
    pointer-events: none;
    cursor: not-allowed;
   }
  
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
      main: "#000000"
    },
    secondary: {
      main: "#442283",
      
    }
  }
})


const RegisterPage = ()=>{
  

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [disableForm, setDisableForm] = useState(false)
  const [dialog, setDialog] = useState(false)

  // state that monitors if accout was successfully created
  
  const [loading, setLoading] = useState(false)
  const [reqStatus, setReqStatus] = useState(null)
  const navigate = useNavigate()

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("username is required")
    .min(8, "username must not be less than 8 characters")
    .max(20, "username must not be more than 20 characters") 
    .matches(/^\S*$/, "whitespace not allowed"),
    email: Yup.string()
       .required("email is required")
       .email("email is invalid")
       .matches(/^\S*$/, "whitespace not allowed"),
    password: Yup.string()
      .required("password is required")
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, "must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character")
      .matches(/^\S*$/, "whitespace not allowed"),
    confirmPassword: Yup.string()
       .required("confirm password is required")
       .oneOf([Yup.ref("password"), null], "passwords must match")
      });
      
      
      
      const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(validationSchema)
      })
      
      const onSubmit = async(data)=>{
        console.log("submitted", data
        )
        setLoading(true)
        setDialog(true)
        if (data !== null) {
          setDisableForm(true)
          publicRequest.post("/auth/register", {
            ...data

          }).then((res)=>{

            setDialog(true)
            setLoading(false)
            parseInt(res.status) === 201 &&  
            setReqStatus(201)  
          }).catch(err =>{
             setLoading(false)

             setDialog(true)
             if(!err.status && !err.response ){
              // network err
              setReqStatus(500)
              
            }else{
              if (parseInt(err.response.status) === 401){
                setReqStatus(401)
              }else if (parseInt(err.response.status) === 500){
                setReqStatus(500)
              }else if (parseInt(err.response.status) === 501){
                setReqStatus(501)
              }else {
                setReqStatus(500)
              }
            }    
          })
        }
      }  
  




    return(
      <ThemeProvider theme = {theme}>

        <Container style = {{backgroundImage:`url(${Background})`}}>
        
          <FormWrapper >
             <Title>
                 CREATE AN ACCOUNT
             </Title> 
             <FormContainer>
                <Form  disabled = {disableForm}>
                 
                 <InputContainer disabled = {disableForm}>
                    <TextField
                          
                          placeholder = "username"
                          type = "text"
                          id ="username"

                         
                          fullWidth
                          color = "secondary"
                          size = "small"

                          {...register("username")}
                          error = {errors.username? true : false }
                          />
                          
                          
                 </InputContainer>
                 <ErrMsg>{errors.username?.message}</ErrMsg>
                 <InputContainer disabled = {disableForm}>
                      <TextField
                      name = "email"
                      placeholder = "Your Email. e.g cdevs@gmail.com"
                      type = "email"
                      id ="email"
                    
                      fullWidth
                      color = "secondary"
                      size = "small"
                      

                      
                    
                      error = {errors.email? true: false }
                      {...register("email")}
                      />
                      
                 </InputContainer>
                 <ErrMsg>{errors.email?.message}</ErrMsg>
                 <InputContainer disabled = {disableForm}>
                    <TextField
                    name = "password"
                    placeholder = "password"
                    type = { showPassword === true ? "text" : "password"}
                    id ="password"
                    
                    fullWidth
                    color = "secondary"
                    size = "small"
                    error = {errors.password? true : false}
                   
                    InputProps={{
                      endAdornment: <InputAdornment position = "end"
                      > 
                      <VisibilityIconContainer  onClick = {()=>{
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
                 <InputContainer disabled = {disableForm}>
                      <TextField
                      name = "confirmPassword"
                      placeholder = "confirm your password"
                      type = { showConfirmPassword === true ? "text" : "password"}
                      id ="confirmPassword"
                     
                      
                      error = {errors.confirmPassword? true: false}
                      fullWidth
                      color = "secondary"
                      size = "small"
                      InputProps={{
                        endAdornment: <InputAdornment position = "end"

                        > 
                        <VisibilityIconContainer       onClick = {()=>{
                           setShowConfirmPassword( v => !v)
                        }}>
                          {
                           showConfirmPassword === true? <StyledVisibilityOffIcon/> : <StyledVisibilityIcon/>
                        }
                        </VisibilityIconContainer>
                        </InputAdornment> 
                      }}
                      {...register("confirmPassword")} />
                      
                 </InputContainer>
                 <ErrMsg>{errors.confirmPassword?.message}</ErrMsg>
                </Form>
            </FormContainer>
             <Privacy>
                 By creating an account I consent to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b>
             </Privacy>

             <ButtonContainer>
                 <Button disabled = {disableForm} onClick = {
                  handleSubmit(onSubmit)
                  } >CREATE</Button>
             </ButtonContainer>
          </FormWrapper>
          {
            dialog && 
            <MessageDialog>
              <DialogBox>
                 {
                   loading === true && 
                    <>
                     <Loader/>
                      
                     <Message>creating...</Message>
                    </>
                     
                   
                 }
                {  
                  loading === false && reqStatus === 201 &&
                  <>
                    <StyledCheckIcon/>
                    <Message>
                       Account Created!  
                    </Message>
                    <DialogButtonContainer>
                    <StyledLink to = "/login">
                      <DialogButton onClick = {()=>{
                        setDialog(false)
                        setDisableForm(false)
                      }}>OK</DialogButton>
                    </StyledLink>
                    </DialogButtonContainer>
                  </>
              }
              {  
                  loading === false && reqStatus === 501 &&
                  <>
                   <StyledCancelIcon/>
                    <Message>
                       User Exists!  
              
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

export default RegisterPage;
