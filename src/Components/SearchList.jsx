import {useState, useEffect} from "react"

import styled from "styled-components"
import Product from "./Product"
import {useDispatch, useSelector} from "react-redux"
import {setProductListSearchError} from "../redux/productsRedux"
import {navmobile, tablet} from "../responsive"


const Container = styled.div`
margin-top: 10px;
display: ${ props => props.searchError === true ? "flex": "grid"};
width: 100%;
grid-template-columns: 24% 24% 24% 24% ;
column-gap: 1.5%;

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
  text-align: center;
`
const ErrorMessageContainer = styled.div`
   display:flex;
   justify-content: center;
   width: 100%;
`


 const SearchList = ({ filters, sort})=>{
 
  const searchResults = useSelector(state => state.products.searchResults)
    
  const [products, setProducts] = useState([]);
  const [ filteredProds, setFilteredProds] =  useState(false)
 

  const productsState = useSelector( state => state.products)
 
  const dispatch = useDispatch()


  

 



  useEffect(()=>{
   console.log("filter use effect running", filters, sort)
   const toBeSorted = [...searchResults]
   
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
 
  }, [filters, sort, searchResults])


  



const getUi = ()=>{
   
   // im createating a varable that will store the value of the map function 
   // and return it to the ui
   let ui;
   
   if(Object.keys(filters).length !== 0){

      
         
      if(filteredProds.length === 0 ){
          dispatch(
            setProductListSearchError(true)
          )
            
         return  <ErrorMessageContainer>
                  <ErrorMessage>

                 Sorry no item(s) matched { filters.color && ` color: ${filters.color} `}{filters.size && ` size: ${filters.size}`}
   
                  </ErrorMessage>
                </ErrorMessageContainer>
      }
      
      else{
         dispatch(
            setProductListSearchError(false)
          )
         ui = filteredProds.map( item =>{
            return(
               <Product product = {item} key = {item._id}/>
            )
         })

         return ui
      }
   
   }else{
       
      
      if (searchResults.length === 0){
         dispatch(
            setProductListSearchError(true)
          )
            
         ui = <ErrorMessageContainer>
                  <ErrorMessage>

                 Sorry no item(s) matched
   
                  </ErrorMessage>
                </ErrorMessageContainer>
        return ui
      }else{

         dispatch(
            setProductListSearchError(false)
       )  
       ui = products.map( item =>{
      
          return (
             <Product product = {item} key = {item._id}/>
         )
      })
   }

      return ui
   }

  return ui
}



    return(
        <Container searchError = {productsState.productListSearchError}>

            
         {

              getUi()

         }



           
              
        </Container>
    )
}

export default SearchList