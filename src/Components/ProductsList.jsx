import {useState, useEffect, useRef} from "react"
import { useLocation } from "react-router-dom"


import styled, {keyframes} from "styled-components"

import Product from "./Product"

import {populateProducts} from "../redux/productsRedux"
import {useDispatch, useSelector} from "react-redux"
import {setProductListSearchError} from "../redux/productsRedux"
import {navmobile, tablet} from "../responsive"
import {East, West} from "@mui/icons-material"
import {publicRequest} from "../requestMethods"


const Container = styled.div`
margin-top: 10px;
display: ${ props => props.searchError === true ? "flex": "grid"};
display: ${ props => props.productsStateLength === 0 && "none"};
width: 100%;
grid-template-columns: 24% 24% 24% 24% ;
column-gap: 1.5%;
position: relative;

${tablet({gridTemplateColumns: "33% 33% 32%", boxSizing: "border-box", padding:"10px"})};
${navmobile({gridTemplateColumns: "50% 49%",})}
`





const ErrorMessage = styled.div`
  color: red;
  font-size: 1.2rem;
  display:flex;
  justify-content: center;
  font-weight: 400;
  width: fit-content;
`
const ErrorMessageContainer = styled.div`
   display:flex;
   justify-content: center;
   width: 100%;
`

const NavArrowContainer = styled.div`
position: fixed;
bottom: 10vh;
right: 5vw;
display:flex;
flex-direction: column;
align-items: center;
justify-content: center;
z-index: 40;


`

const ArrowContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: 1rem;
margin-top: 7px;
height: 1rem;
background-color: rgba(255,255,255,0.8);
border-radius: 50%;
transition: all 0.2s ease-in;
padding: 1rem;
border: 1px solid darkgray;

&:hover{
   cursor: pointer;
   transform: scale(0.9);
 };
`
const ArrowRight = styled(East)`
  color: gray;
`

const ArrowLeft = styled(West)`
  color: gray;
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
   display: flex;
   flex-direction: column;
   align-items: center;
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
   margin-top: -40px;
  
   animation:${rotate} 0.9s linear infinite;
`





 const ProductsList = ({cat, filters, sort})=>{
 

  const [products, setProducts] = useState([])
  const [ filteredProds, setFilteredProds] =  useState(false)
  
  const [loading, setLoading] = useState(false)
  const [location, setLocation] = useState(useLocation().pathname)
  const page = useRef(0)
  const [pageNumber, setPageNumber] = useState(page.current)

  
  const productsState = useSelector( state => state.products)
 
  const dispatch = useDispatch()


  

  const getProducts = ()=>{
   


      
       console.log("fetching products list , products useEffect running")
       setLoading(true)

         cat? publicRequest.get(`/products?categories=${cat}&p=${page.current}`).then((res)=>{

            setProducts(res.data.products)
            setLoading(false)
            console.log(res.data)
         })
         .catch(err =>{
            setLoading(false)
            console.log(err)
         })  
                 
               : 
                  
                  
          publicRequest.get(`/products?p=${page.current}`).then((res)=>{
            
            
         // update the product state in the component
            setProducts(res.data.products.sort((a, b)=>{
               const dateOfA = new Date(a.createdAt).getTime()
               const dateOfB = new Date(b.createdAt).getTime()
               
               return (dateOfB - dateOfA)
             }))

         // store the products to redux so that other components can use it

         dispatch(populateProducts(
            {products: res.data.products, productCount: res.data.count}
            )
            )

            setLoading(false)
            console.log(res.data)
         }).catch(err =>{
            setLoading(false)
            console.log(err)
         })
         
      
   
}

  useEffect(()=>{
    
     getProducts()

  }, [cat, pageNumber])


  useEffect(()=>{
   console.log("filter use effect running", filters, sort)
   const toBeSorted = [...products]
   
   if(sort){
      if(sort === "ascending"){
         toBeSorted.sort((a, b)=>{
            const priceOfA = parseInt(a.price)
            const priceOfB = parseInt(b.price)

           return (priceOfA - priceOfB)
         })
      }
      else if(sort === "descending"){
         toBeSorted.sort((a, b)=>{
            const priceOfA = parseInt(a.price)
            const priceOfB = parseInt(b.price)
            
            return (priceOfB - priceOfA)
         })
      } 
       else {
         // sort by newest based on createdAt Date
         toBeSorted.sort((a, b)=>{
           const dateOfA = new Date(a.createdAt).getTime()
           const dateOfB = new Date(b.createdAt).getTime()

           
           return (dateOfB - dateOfA)
         })
      }
      
      setProducts(toBeSorted)
   }

   filters && setFilteredProds(toBeSorted.filter(item => Object.entries(filters).every(([key, value])=> item[key].includes(value)))


   );
 
  }, [filters, sort])



const getNavArrows = ()=>{
   // basically, do a modulo division on products.length if it's less than 0 it means we dont have more results to show, if its 0, it means that 20 products which is the reuslt limit per query was returned and we most likely have more results in the db to show
   let doWeHaveMoreResults = false 
   let isArrayFull = products.length % 20;

   if (isArrayFull === 0){
     doWeHaveMoreResults = true
   } 
  
   return (

   <NavArrowContainer>
   {
      page.current > 0 && products.length !== 0 &&<ArrowContainer title = "Previous page" onClick = {()=>{
        let clicked = false
         if(page.current > 0 && clicked === false){ 

            page.current = page.current - 1
           setPageNumber(page.current - 1)
           clicked = true
         }
      }}>
         <ArrowLeft/>
      </ArrowContainer>
   }
   {
      
      doWeHaveMoreResults === true && products.length !== 0 &&<ArrowContainer title = "Next page" onClick = {()=>{
         let clicked = false
         if(doWeHaveMoreResults === true && clicked === false){
            page.current = page.current + 1
            
           setPageNumber(page.current + 1)
           clicked = true
         }
      }}>
         <ArrowRight/>
      </ArrowContainer>
   }
</NavArrowContainer>
   )
}

const getHomeUi = ()=>{
   productsState.productListSearchError === true && dispatch(
     setProductListSearchError(false)
   );
   
   let ui=[];
   products.slice(0, 12).forEach( item =>{
       
          ui.push(<Product product = {item} key = {item._id}/>)
       
    }); 

    return ui
 }



const getUi = ()=>{
   
   // im createating a varable that will store the value of the map function 
   // and return it to the ui
   let productsToBeDisplayed;

   if(Object.keys(filters).length !== 0){
          
      if(filteredProds.length === 0){
          dispatch(
            setProductListSearchError(true)
          )
            
         return  <ErrorMessageContainer>
                  <ErrorMessage>

                 Sorry no item(s) matched { filters.color && ` color: ${filters.color} `}{filters.size && ` size: ${filters.size}`}
   
                  </ErrorMessage>
                </ErrorMessageContainer>
      }else{
         dispatch(
            setProductListSearchError(false)
          )
         productsToBeDisplayed = filteredProds.map( item =>{
            return(
               <Product product = {item} key = {item._id}/>
            )
         })

         return productsToBeDisplayed
      }
   
   }else{
      dispatch(
         setProductListSearchError(false)
       )
      productsToBeDisplayed = products.map( item =>{
      
         return (
            <Product product = {item} key = {item._id}/>
         )
      })

      return productsToBeDisplayed
   }


}



    return(
        <Container searchError = {productsState.productListSearchError}  location = {location} productsStateLength = {productsState.allProducts.length}>

            
         {

             location === "/" ? getHomeUi() : getUi()

         }
         {

            location !== "/" && getNavArrows()
            
         }

         {
            loading === true && location !== "/" && 
            <MessageDialog>
              <DialogBox>
                 
                     <Loader/>
                    
              </DialogBox>
             </MessageDialog>
           }
           
              
        </Container>
    )
}

export default ProductsList