import styled from "styled-components"
import SendIcon from "@mui/icons-material/Send"
import {TextField, InputAdornment, ThemeProvider, createTheme} from "@mui/material"
import {useState} from "react"

import { tablet, mediumsmall, navmobile} from "../responsive"

const Container = styled.div`
margin-top: 10px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
background-color: rgba(255,182,193,1);
height: 40vh;
position: relative;

${tablet({height: "35vh"})};
`;

const Letter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
  color: black;

`;
const Title = styled.h1`
 margin-bottom: 10px;
 color: inherit;
 
${tablet({marginTop: 0})};
${navmobile({fontWeight: 490 })};
${mediumsmall({fontWeight: 390, fontSize: "28px" })};
`;


const Text = styled.p`
 margin: 0;
 margin-bottom: 10px;
 color: inherit;
 
${tablet({textAlign: "center"})};

${navmobile({fontSize: "16px"})};
${mediumsmall({fontSize: "14px" })};
`;
const TextFieldContainer = styled.div`
 width: 60%;
 background-color: white;
`
const SendIconContainer = styled.div`
 display: flex;
 justify-content: center;
 align-items: center;
 background-color: white;
 padding: 1rem;
 margin-right: -14px;
 padding: 0.5rem;
 color: teal;
 pointer-events: ${props => props.email === "" ?"none" : "auto"};
 opacity: ${props => props.email === "" ? 0.4 : 1};

 &:hover{
  color: white;
  background-color: teal;
  cursor: pointer;
 }

`

const StyledSendIcon = styled(SendIcon)`
   color: inherit;
   transition: all 0.8s ease-in;

   &:hover{
    transform: scale(0.8);

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
const DialogSendIcon = styled(SendIcon)`
  color: #442283;
  transform: rotateZ(-20deg);
  font-size: 1rem;
  transition: all 1.5s ease-in;

  &:hover{
    transform: scale(0.8);
  }

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

const ErrMsg = styled.div`
  display: flex;
  color: red;
  font-weight: 400;
  justify-content: center;
`

const theme = createTheme({
  palette:{
    primary: {
      main: "#442283"
    },
    secondary: {
      main: "#000000",
      
    }
  }
})

const Newsletter = ()=>{

   const [dialog, setDialog] = useState(false)
   const [email, setEmail] = useState("")
   const [emailErrMsg, setEmailErrMsg] = useState("")
   const valideEmail = (e)=>{
    e.preventDefault()
    const userInput = e.target.value
     if(userInput === ""){
       return setEmailErrMsg("")
     }
     if (userInput.length !== 0 && userInput.includes("@")  ){

        let splitEmail = userInput.split("@")
        if(splitEmail.length > 2 ) {
          email !== "" && setEmail("")
          return setEmailErrMsg("email must contain only one '@' character")
        }else{
          
          if (splitEmail[0].length < 2){
            email !== "" && setEmail("")
          return   setEmailErrMsg("please enter a valid email")
          }else{
            if(!splitEmail[1].includes(".")){
              email !== "" && setEmail("")
              return setEmailErrMsg("please enter a valid email")
            }
            const newSplitEmail = splitEmail[1].split(".")
            if(newSplitEmail.length === 0){
              email !== "" && setEmail("")
              return setEmailErrMsg("please enter a valid email")
            }else if(newSplitEmail[0].length < 2){
              email !== "" && setEmail("")
              return setEmailErrMsg("please enter a valid email")
            }else if(newSplitEmail[1].length < 2){
              email !== "" && setEmail("")
              return setEmailErrMsg("please enter a valid email")
            }else{
               setEmailErrMsg("")
               setEmail(userInput)
              
            }
          }
        }


     }else{
      return setEmailErrMsg("please enter a valid email")
     }
   }
   
  const submitHandler = ()=>{
    setEmail("")
    setEmailErrMsg("")
  }

  const dialogUi = <MessageDialog>
                      <DialogBox>
                        <Message>
                        Thanks For subscribing!  <DialogSendIcon/>
                        </Message>
                        <DialogButtonContainer>
                            <DialogButton onClick = {()=>{
                              setDialog(false)
                            }}>Cool</DialogButton>
                        </DialogButtonContainer>
                      </DialogBox>
                    </MessageDialog>

    return (
      <ThemeProvider theme = {theme}>
      <Container>
         <Letter>
             <Title>
               Newsletter
             </Title>
             <Text>
              Get timely updates from your favourite products.
             </Text>
          <TextFieldContainer>

            <TextField
                name = "emailSend"
                placeholder = "Your Email. e.g cdevs@gmail.com"
                type = "email"
                id ="send"
                onChange = {(e)=>{
                  valideEmail(e)
                }}
                fullWidth
                color = "secondary"
                size = "small"
                InputProps={{
                  endAdornment: <InputAdornment position = "end"
                  > 
                  <SendIconContainer email= {email} onClick = {()=>{
                    setDialog(true)
                    submitHandler()
                  }}>
                    <StyledSendIcon 
                     
                    />
                  </SendIconContainer>
                  </InputAdornment> 
                }}
                />

           </TextFieldContainer>
           <ErrMsg>{emailErrMsg}</ErrMsg>
         </Letter>
         {
            dialog === true && dialogUi
         }
       
       </Container>
      </ThemeProvider>
    )
}

export default Newsletter

