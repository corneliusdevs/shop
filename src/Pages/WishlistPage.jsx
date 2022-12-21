import styled from "styled-components"
import NavBar from "../Components/NavBar"
import Footer from "../Components/Footer"
import {Link} from "react-router-dom"
import {useSelector, useDispatch} from "react-redux"
import {clearWishlist} from "../redux/cartRedux"
import WishItem from "../Components/WishItem"
import {navmobile } from "../responsive"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
`

const Wrapper = styled.div``;

const Title = styled.h1`
font-weight: 300;
text-align: center;
margin: 10px 0;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
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

   ${ props => props.type === "continue shopping" && navmobile({display: "none"})};
`;

const TopTextsContainer = styled.div``;
const TopTexts = styled.span`
  margin: 0 5px;
  cursor: pointer;
  text-decoration: underline;
`;
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

   ${ props => props.type === "continue shopping" && navmobile({display: "none"})};
`
const Bottom = styled.div`
    flex: 2;
    padding-top: 0.5rem;
    position: relative;
    margin-right: 0.5rem;
    margin-left: 0.5rem;
    box-shadow: 0px 0px 7px 0px rgba(0,0,0,0.45);
    height: fit-content;
`
const OrderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  
`
const Divider = styled.hr`
  background: #eee;
  width: 100%;
`



const Wishlist = ()=>{

   const cartState = useSelector( state=> state.cart)
   const dispatch = useDispatch()
    
   const showWishes = (cartState)=>{
    const wishlist = []
    cartState.wishlist.forEach((wish, index) => {
       
        wishlist.push(
          <WishItem  key = {Date.now().toString + index} image = {wish.img} 
           desc = {wish.desc}
           index = {index}
           title = {wish.title}
           product = {wish}
          />
        )
        wishlist.push(<Divider/>)
    })
 
    return wishlist
 }


    return (
        <Container>
          <NavBar shadow = {true} />
          <Wrapper>
             <Title>
                 YOUR WISHLIST
             </Title>
             <Top>
                <StyledLink to = "/products" type = "continue shopping">
                  <TopButtons type = "continue shopping" >
                      CONTINUE SHOPPING
                  </TopButtons>
                </StyledLink>
                <TopTextsContainer>
                    <TopTexts>

                    {
                    `Your Wishlist(${cartState.wishlist.length})`
                    }

                    </TopTexts>
                </TopTextsContainer>
                <TopButtons 
                type = "filled"
                onClick = {()=>{
                  dispatch(
                    clearWishlist()
                  )
                }}
                >
                    CLEAR WISHLIST
                </TopButtons>
             </Top>
             <Bottom>
                <OrderWrapper>
                    { 
                    cartState.wishlist && showWishes(cartState)
                    }
                    
                </OrderWrapper>
             </Bottom>
          </Wrapper>
          <Footer/>
        </Container>
    )
}


export default Wishlist