import {useState} from "react"
import styled from "styled-components"
import Announcement from "../Components/Announcement"
import NavBar from "../Components/NavBar"
import SearchList from "../Components/SearchList"
import Footer from "../Components/Footer"
import Newsletter from "../Components/Newsletter"
import RefreshIcon from "@mui/icons-material/Refresh"

import { useSelector, useDispatch  } from "react-redux"

import {setProductListSearchError} from "../redux/productsRedux"

import {tablet, medium, mediumsmall, mediumextrasmall} from "../responsive"



const Container = styled.div`
  width: 100%;
`
const ProductsFilter = styled.div`
  padding-left: 15px;
  padding-right: 15px;

  max-width: 100vw;
  box-sizing: border-box;

  ${medium({flexWrap: "wrap"})};
`

const LeftFilter = styled.div`
 display: flex;
   
${medium({flex: 1, display: "flex", flexDirection: "column"})};
`
const FilterContainer = styled.div`
 display: flex;
 justify-content: space-between;

 ${medium({flexWrap: "wrap"})};
 ${mediumextrasmall({flexDirection: "column"})};
`
const RightFilter = styled.div`

${medium({flex: 1, display: "flex", flexDirection: "column", alignItems: "center"})};
${mediumextrasmall({alignItems: "flex-start"})};
`

const TitleContainer = styled.div`
${mediumextrasmall({marginRight: "20px"})};
`
const Title = styled.h2`
  font-weight: 300;

  ${tablet({textAlign: "center"})};

`
const FilterText = styled.span`
  font-weight: 600;
  margin-right: 10px;

  ${mediumsmall({display: "none"})};
`

const Filter = styled.select`
  margin-right: 10px;
  padding: 5px;
  text-align: center;
  border: 1px solid gray;

  ${mediumsmall({marginRight: "0"})};
  ${props => props.name === "sort" && mediumextrasmall({width: "100%"})};
`
const FilterOption = styled.option`
 pointer-events : ${ props => props.pointer === false ? "none" : "auto"};

 &:checked{
  color: white;
  background-color: rgba(68,31,131, 0.9);
 };
 &:hover{
  background-color: rgba(68,31,131, 0.4)
 }
`

const Refresh = styled.div`
 display: flex;
 justify-content: center;
 align-items: center;

 &:hover{
  cursor: pointer;
  transform: scale(0.7);
  transition: transform 1.5s;
 };

 ${mediumextrasmall({position: "absolute", right: "10px", marginTop: "-45px"})};
`
const FilterWrapper = styled.div`
  display: flex;

   ${medium({display: "flex", justifyContent: "space-between"})};
   ${mediumextrasmall({marginBottom: "10px"})};
`




const SearchListPage = ()=>{

  const [filters, setFilters] = useState({ })
  const dispatch = useDispatch()
  const searchResultsInfo = useSelector(state => state.products.searchResults)
  const [sort, setSort] = useState("newest")
 



  

  const handleChange = (e)=>{
    
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value
    })
    
  }

  const getColorFilters = ()=>{
    const colorFilters = []
    searchResultsInfo.forEach((item)=>{
      (item.color && item.color.length !== 0 ) && item.color.forEach( c =>{
        if(typeof c !== "undefined" && c !== null && c !== "" && c !== " " && c.length > 2 ){

          !colorFilters.includes(c) && colorFilters.push(c) 
        }
      })
    })

    return colorFilters
  }

  const getSizeFilters = ()=>{
    const sizeFilters = []
    searchResultsInfo.length !== 0 &&
    searchResultsInfo.forEach((item)=>{
      item.size && item.size.forEach( s =>{
        !sizeFilters.includes(s) && sizeFilters.push(s) 
      })
    });

    return sizeFilters
  }


 const showColorFilters = ()=>{
  const colorFilters = getColorFilters()
  const filtersUi = []
  colorFilters.length !== 0 && colorFilters.forEach((color, index)=>{
    filtersUi.push(
     <FilterOption key={color + index}  value = {color}  >{ (color !== "" && typeof color !== "undefined" && color!== null) && color.replace(color[0], color[0].toUpperCase())}</FilterOption>
    )
  })

  return filtersUi
 }

 const showSizeFilters = ()=>{
  const sizeFilters = getSizeFilters()
  const filtersUi = []
  sizeFilters.length !== 0 && sizeFilters.forEach((size)=>{
    filtersUi.push(
     <FilterOption value = {size}  >{size}</FilterOption>
    )
  })

  return filtersUi
}

  const handleRefresh = ()=>{
    setFilters({})
    dispatch(
      setProductListSearchError(false)
    )
  }
    
    return (
        <Container>
          <Announcement/>
          <NavBar shadow = {true}/>
          <ProductsFilter>
            <TitleContainer>
              <Title>
              {
                  searchResultsInfo.length === 20 ? `SEARCH RESULTS(${searchResultsInfo.length}+)`: `SEARCH RESULTS(${searchResultsInfo.length})`
                    }
              </Title>
            </TitleContainer>
            <FilterContainer>
            <LeftFilter>
                 <FilterText>
                    Filter Products:
                 </FilterText>
                 <FilterWrapper>

                 <Filter name = "color" onChange = {handleChange} >
                   <FilterOption value = "color" pointer = {false}>Color</FilterOption>
                    {
                      showColorFilters()
                    }
                 </Filter>
                 <Filter name = "size"  onChange = {handleChange} >
                   <FilterOption value = "size" pointer = {false}>Size</FilterOption>
                    {
                      showSizeFilters()
                    }
                 </Filter>
                </FilterWrapper>
              </LeftFilter>
              <RightFilter>
                 <FilterText>
                     Sort Products:
                 </FilterText>
                 <Filter name = "sort"  onChange = {(e)=>{
                   setSort(e.target.value)
                 }} >
                   <FilterOption value = "newest" >Newest</FilterOption>
                   <FilterOption value = "ascending">Price (asc)</FilterOption>
                   <FilterOption value = "descending" >Price (desc)</FilterOption>
                 </Filter>
                 
              </RightFilter>
              <Refresh onClick = {()=> handleRefresh()}>
                <RefreshIcon/>
              </Refresh>
            </FilterContainer>
          </ProductsFilter>
          <SearchList 
            
            filters= {filters} 
            sort = {sort}/>
          <Newsletter/>
          <Footer/>
        </Container>
    )
}

export default SearchListPage