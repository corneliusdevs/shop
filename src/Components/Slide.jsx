import {useState, useEffect} from "react"
import styled from "styled-components"
import {SlideData} from "../Helper/SlideData"

import ArrowRightIcon from "@mui/icons-material/ArrowRight"

import ArrowLeftIcon from "@mui/icons-material/ArrowLeft"

import {Link} from "react-router-dom"
import { tablet, smallmobile} from "../responsive"

const Container = styled.div`
display:flex;
position: relative;
overflow: hidden;

${tablet({height: "67vh"})};
${smallmobile({display: "none"})};
`

const Wrapper = styled.div`
width:100vw !important;
 display:flex;
 align-items:center;
 min-width:100vw;


`
const Slide = styled.div`
 display: flex;
 align-items: center;
 width: 100vw;
 position: relative;
 z-index: 4;

 transform: translateX(${props => props.slideIndex * -100}vw);
 transition: all 1.2s ease;

`
const ImageContainer = styled.div`
flex:1;
overflow: hidden;
height: 85vh;
background-color: ${(props)=>{
  return props.bg
}};
`
const Image = styled.img`
height: 85vh;
width:100%;
object-fit: contain;
`
const InfoContainer = styled.div`
background-color: ${props=> props.bg};
height: 85vh;
flex:1;
padding-left: 20px;
display: flex;
flex-direction: column;
justify-content: center ;
align-items: flex-start;

`
const Arrows = styled.div`
display: flex;
align-items: center;
justify-content: center;
position: absolute;
top: 0;
bottom: 0;
margin-top: auto;
margin-bottom: auto;
width: 100%;
`
const Arrow = styled.div`
display: flex;
width: ${ (props)=>{
  switch(props.direction){
    case("center"): return "90%"
    break;
    default: return "40px";
  }
}};
background-color: ${(props)=>{
  switch(props.direction){
    case("center"): return "transparent"
    break;
    default: return "rgba(255,255,255, 0.75)"
  }
}};
align-items: center;
justify-content: center;
height: 40px;
border-radius: 50%;
position: relative;
z-index: 10;
`
const Header = styled.h1`
  
${tablet({fontWeight: "500"})};
`
const SubHeader = styled.p`
  letter-spacing: 2px;
  font-weight: 500;
  
  ${tablet({fontWeight: "400"})}
`
const Button = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.7);
  border: 1px solid grey;

  
  &:hover{
    font-size: 14px;
    padding: 2px;
    cursor: pointer; 
  };
  `

  const Overlay = styled.div`
  
   display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: -5 !important;
  top: 0;
  bottom: 0;
  margin-top: auto;
  margin-bottom: auto;
  width: 100%;

  `

const StyledLink = styled(Link)`
   text-decoration: none;
   color: black;
    z-index: 20;
   &:hover, &:focus{
     color: black;
   };
   &:active{
    color: black;
   };
`

const Slides = ()=>{

const [slideIndex, setSlideIndex] = useState(0);

useEffect(()=>{
   const interval = setInterval(()=>{
      handleClick("right")
      
  }, 5000);
  return ()=>{
    clearInterval(interval)
  }
}, [slideIndex])



const handleClick =(direction)=>{
   if(direction === "left"){
      if(slideIndex === 0){
        setSlideIndex(2)
      }
      else{
        setSlideIndex( slideIndex > 0 ? slideIndex - 1: 0)
      }
     
   }
   if(direction === "right"){
    
      setSlideIndex( slideIndex < 2 ? slideIndex + 1: 0)
    
  }
}



    return(
      <Container>
      <Slide slideIndex = {slideIndex}>
        {
          SlideData.map((slide, index)=>{
            return(
               <Wrapper key ={index} slideIndex = {slideIndex}>
                  <ImageContainer bg = {slide.bgLeft}>
                    <Image src ={slide.img}/>
                  </ImageContainer>
                  <InfoContainer bg = {slide.bgRight}>
                    <Header>
                      {slide.headerText}
                    </Header>
                    <SubHeader>
                      {slide.bodyText}
                    </SubHeader>
                    <StyledLink to = {"/products/" + slide.link}>
                      <Button>
                        <span> SHOP NOW </span> 
                        <ArrowRightIcon />
                      </Button>
                    </StyledLink>
                  </InfoContainer>
                  <Overlay color = {slide.overlay}>
                  </Overlay>
                </Wrapper>
                
            )
          })
        }
        </Slide>
        <Arrows>
          <Arrow direction = "left">
            <ArrowLeftIcon onClick ={()=>handleClick("left")}/>
          </Arrow>
          <Arrow direction = "center">
          </Arrow>
          <Arrow direction = "right" onClick ={()=>handleClick("right")}> 
            <ArrowRightIcon/>
          </Arrow>
        </Arrows>

      </Container>
    )
}

export default Slides