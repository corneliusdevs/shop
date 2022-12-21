import styled from "styled-components"
import productCategoryData from "../Helper/ProductCategoryData"
import {Link} from "react-router-dom"
import {navmobile} from "../responsive"


const Container = styled.div`
 display: flex;
 align-items: center;
 justify-content: center;
 margin-top: 10px;

 ${navmobile({padding: "0 10px", flexDirection: "column"})};
`
const ProductCategory = styled.div`
 flex: 1;
 display: block;
 flex-direction: column;
 align-items: center;
 justify-content: center;
 height: 250px;
 max-width: 32%;
 position: relative;
 margin: 0 auto;

 ${navmobile({width: "100%", maxWidth: "100%"})};
 ${ props => props.type === "middle" && navmobile({margin: "10px 0"})}
`
const ImageContainer = styled.div`
 width: 100%;
 height: 250px;
 display: flex;
 align-items: center;
 justify-content: center;
`
const InfoContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
 
  background-color: rgba(150,150,150,0.2);
  position: absolute;
  top: 0;

`
const Image = styled.img`
 width: 100%;
 height: 100%;
 object-fit: cover;
`
const Text = styled.p`
  margin: 0;
  margin-bottom: 10px;
  text-align: center;
  color: white;
  font-size: 25px;
  cursor: pointer;
  transition: all 0.5s ease;

  &:hover{
    transform: scale(1.2);
  };
  ${navmobile({fontSize: "30px"})};
`
const Button = styled.button`
border: none;
background-color: white;
padding: 5px 6px;
width: fit-content;
cursor: pointer;

&:hover{
  transition: all 0.5s ease;
  transform: scale(1.1);
};

${navmobile({fontSize: "1rem"})};
`

const ProductCategories = ()=>{




    return (
        
        <Container>
            {
            productCategoryData.map((item, index)=>{
               return (
                <ProductCategory key = {index} type = { index === 1 && "middle"}>
                <Link to ={`/products/${item.cat}`}>  
                    <ImageContainer>
                      <Image src = {item.img} />
                    </ImageContainer>
                    <InfoContainer>
                      <Text>
                        {item.text}  
                      </Text>
                      <Button>
                        SHOP NOW
                      </Button>
                    </InfoContainer>
                  </Link>
                </ProductCategory>
               )
            })
        }
          
        </Container>
    )
}

export default ProductCategories