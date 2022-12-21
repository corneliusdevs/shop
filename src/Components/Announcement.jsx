import styled from "styled-components"


import {navmobile, tablet, smallmobile, mediumextrasmall} from "../responsive"

// purple #442283 red #ff1717;
const Container = styled.div`
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #442283;
    height: 25px;
    ${tablet({width: "100%"})};
    ${smallmobile({display: "none"})};
`
const Text = styled.h2`
    color: white;
    font-size: 18px;
    
    ${tablet({fontSize: "16px"})};
    ${navmobile({fontSize: "16px"})};
    ${mediumextrasmall({fontSize: "14px"})}
`

const  Announcement = ()=>{

    return (
         <Container>
             <Text>
                 Summer Sales for $50 Only
             </Text>
         </Container>
    )
}


export default Announcement