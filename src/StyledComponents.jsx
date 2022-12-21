import React from "react";

import styled from "styled-components"

 const StyledComponent = ()=>{

    const Container = styled.div`
     background-color: blue
     `
    const Title = styled.h2`
     font-weight: 200;
     font-size: 100px
    `

    return(
        <Container>
            <Title>
                This is React Styled component
            </Title>
        </Container>
    )
}



export default StyledComponent