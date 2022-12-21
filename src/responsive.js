import { css } from "styled-components"

export const mobile = (props)=>{

    return css`
     @media only screen and (max-width: 380px) {
        ${props}
     }
    `
}

export const navmobile = (props)=>{

    return css`
     @media only screen and (max-width: 500px) {
        ${props}
     }
    `
}

export const tablet = (props)=>{

    return css`
     @media only screen and (max-width: 768px) {
        ${props}
     }
    `
}

export const medium = (props)=>{

    return css`
     @media only screen and (max-width: 554px) {
        ${props}
     }
    `
}


export const mediumsmall = (props)=>{

    return css`
     @media only screen and (max-width: 388px) {
        ${props}
     }
    `
}

export const mediumextrasmall = (props)=>{

    return css`
     @media only screen and (max-width: 300px) {
        ${props}
     }
    `
}

export const smallmobile = (props)=>{

    return css`
     @media only screen and (max-width: 260px) {
        ${props}
     }
    `
}

export const large = (props)=>{

    return css`
     @media only screen and (min-width: 769px) {
        ${props}
     }
    `
}