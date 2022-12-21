import styled from "styled-components"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import Facebook from "@mui/icons-material/FacebookOutlined"
import Instagram from "@mui/icons-material/Instagram"
import Pinterest  from "@mui/icons-material/Pinterest"
import Twitter  from "@mui/icons-material/Twitter"
import MailIcon from "@mui/icons-material/MailOutline"
import PhoneIcon from "@mui/icons-material/Phone"
import {Link} from "react-router-dom"
import {tablet, navmobile, mediumsmall} from "../responsive"


const Container = styled.div`
  padding: 5px 10px;
  padding-top: 20px;
  background-color: #eee;
  overflow: hidden;
  box-sizing: border-box;
  word-break: break-all;
`;

const Wrapper = styled.div`
 display: flex;
 ${tablet({flexDirection: "column-reverse"})};
`;
const Left = styled.div`
 flex: 1;
 padding-right: 11px;
 ${tablet({display: "none"})};
`;
const Center = styled.div`
flex: 1;


`;
const Right = styled.div`
flex: 1;

`;
const Title = styled.h3`
   margin: 0;
   ${tablet({textAlign: "center"})};
`;
const TextContainer = styled.div`
  
 ${props => props.type === "right" && tablet({display: "grid", gridTemplateColumns: "50% 48%", columnGap: "3%" }) };


`;

const Text = styled.p`
 display: flex;
 align-items: center;

 
 ${tablet({display: "flex", flexDirection: "column", overflowWrap: "anywhere", textAlign: "center" })};

 ${props => props.type === "address" && tablet({display: "none"})};
 
 
 ${navmobile({ fontSize: "14px"})};
 ${mediumsmall({fontSize: "12px"})};
 
`;

const SocialContainer = styled.div`
 display:flex;
 justify-content: space-evenly;
 padding-top: 25px;
 padding-bottom: 10px;
 box-sizing: border-box;
 flex-wrap: wrap;
`;

const SocialIcon = styled.div`
margin-right: 10px;
background-color: white;
border-radius: 50%;
padding: 3px;
display: flex;
align-items: center;
justify-content: center;
`;


const List = styled.ul`
  list-style: none;
  margin:0;
  padding: 0;

`;
const ListWrapper = styled.div`
 display: flex;
 padding-top: 15px; 

 ${navmobile({display: "grid", gridTemplateColumns: "49% 49%", columnGap: "3%" })}
`
const ListContainer = styled.div`
 display: flex;
 width: 50%;

 ${tablet({justifyContent: "center"})};
 ${navmobile({width: "100%", fontSize: "14px"})};
 ${mediumsmall({fontSize: "12px", justifyContent:"center"})};
`

const ListItems = styled.li`

`;

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
const StyledSocialIcon = styled(SocialIcon)`
 transition: all 0.4s ease-in;

 &:hover{
   transform: scale(0.85);
   cursor: pointer;
 }
`

const Footer = ()=>{


    return(
       <Container>
         <Wrapper>
          <Left>
            <Title>
              CORNELIUS DEVS
            </Title>
            <TextContainer>
                <Text>
                    Lorem Ipsum Dolor Sit Amet dolor sit amet ipsum dolor. Lorem Ipsum Dolor Sit Amet dolor sit amet ipsum dolor. Lorem Ipsum Dolor Sit Amet dolor sit amet ipsum dolor. Lorem Ipsum Dolor Sit Amet dolor sit amet ipsum dolor.Lorem Ipsum Dolor Sit.
                </Text>
              </TextContainer>  
           
          </Left>

          <Center>
            <Title>
              Useful Links
            </Title>
            <ListWrapper>
                <ListContainer>
                    <List>
                      <ListItems>
                        <StyledLink to = "/">
                          Home
                        </StyledLink>
                      </ListItems>
                      <ListItems>
                        <StyledLink to="/products/men">
                          Men's Fashion
                        </StyledLink>
                      </ListItems>
                      <ListItems>
                        Accessories
                      </ListItems>
                      <ListItems>
                        Order Tracking
                      </ListItems>
                      <ListItems>
                        Wishlist
                      </ListItems>
                      
                  </List>
                </ListContainer>
                <ListContainer>
                
                    <List>
                      <ListItems>
                      <StyledLink to="/cart">

                        Cart
                      </StyledLink>
                      </ListItems>
                      <ListItems>
                      <StyledLink to="/products/women">
                        Women's Fashion
                      </StyledLink>
                      </ListItems>
                      <ListItems>
                        My  Account
                      </ListItems>
                      <ListItems>
                        WishList
                      </ListItems>
                      <ListItems>
                        Terms
                      </ListItems>
                      
                    </List>

                  </ListContainer>
            </ListWrapper>
            <SocialContainer>
              <StyledSocialIcon style = {{color: "white",
                  backgroundColor:"#4267B2",
                  borderRadius: "50%",}}>
                  <Facebook style = {{color: "white",
                  backgroundColor:"#4267B2",
                  borderRadius: "50%",}}/>
              </StyledSocialIcon>
              <StyledSocialIcon style = {{color:  "white",
                  borderRadius: "50%",
                  backgroundColor:"#8A3AB9"}} >
                  <Instagram style = {{color: "white",
                  borderRadius: "50%",
                  backgroundColor:"#8A3AB9"}}/>
              </StyledSocialIcon>
              <StyledSocialIcon style = {{color: "white",
                  backgroundColor:"#1DA1F2",
                  borderRadius: "50%",}}>
                  <Twitter style = {{color: "white",
                  backgroundColor:"#1DA1F2",
                  borderRadius: "50%",}}/>
              </StyledSocialIcon>
              <StyledSocialIcon style = {{color: "white",
                  backgroundColor:"#E60023",borderRadius: "50%"}}>
                  <Pinterest style = {{color: "white",
                  backgroundColor:"#E60023",borderRadius: "50%"}}/>
              </StyledSocialIcon>

            </SocialContainer>
          </Center>
          <Right>
              <Title>
                  Contact
              </Title>
              <TextContainer type = "right">
                  <Text type = "address">
                      <LocationOnIcon/> 251, Ikotun-Idimu Road, Lagos State.
                  </Text>
                  <Text>
                      <PhoneIcon/> +234 902 357 4941 | +234 906 510 0882
                  </Text>
                  <Text>
                      <MailIcon/> owolabitosin04@gmail.com
                  </Text>
                </TextContainer>
          </Right>
        </Wrapper>
       </Container>
    )
}

export default Footer