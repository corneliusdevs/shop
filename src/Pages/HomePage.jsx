import styled from "styled-components"
import Announcement from "../Components/Announcement"
import NavBar from "../Components/NavBar"
import Slides from "../Components/Slide"
import ProductsList from "../Components/ProductsList"
import ProductsCategory from "../Components/ProductsCategory"
import Footer from "../Components/Footer"
import Newsletter from "../Components/Newsletter"
import { large} from "../responsive"


const Container = styled.div`
${large({width: "98vw"})};
` 

const HomePage = ()=>{


    return (
     <Container>
        <Announcement/>
         <NavBar shadow = {true}/>
        <Slides/>
        <ProductsCategory/>
        <ProductsList />
        <Newsletter/>
        <Footer/>
     </Container>
    )
}

export default HomePage