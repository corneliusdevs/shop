import styled from "styled-components"
import {useState, useEffect} from "react"
import {publicRequest} from "../requestMethods"

const Container = styled.div``

const Form = styled.form``

const Input = styled.input``

const Button = styled.button``

const ProductUploadPage = ()=>{
const [inputs, setInputs] = useState({})
const [image, setImage] = useState(null)
const [form, setForm]  = useState(false)

useEffect(()=>{
  console.log("useeffect running")
  console.log(form)
  const reqBody = {
    ...form
  }
  if(form !== false){
    try{
  
    publicRequest.post("/uploads/productupload",{ data: reqBody} ).then((res)=>{

      console.log("form submitted res: ", res)
    })
    }catch(err){
      console.log("product upload failed", err)
    }

  }
}, [form])
 

const handleSubmit = (e)=>{
    e.preventDefault();
    console.log("inputs are: ", inputs)
     setForm({
      ...inputs,
      ...image
    })
    console.log(form)
  }

  const handleChange = (e)=>{
    const name = e.target.name
    const value = e.target.value
     setInputs( values =>(

       {
         ...values,
         [name]: value
       }
     )
     )
     console.log(inputs)
  }


  function getImage(e){
    const reader = new FileReader();
     reader.onload = ()=>{
      setImage({
       image: reader.result
      })
      
    }
   reader.readAsDataURL(e.target.files[0])
    return true
  }
  const handleFile = async(e)=>{
      const imageLoaded = new Promise((resolve, reject)=>{
        const done = getImage(e)

        if (done === true){
          resolve(true)
        }else{
          reject(false)
        }
      })

      imageLoaded.then((bool)=>{
         console.log(bool, image)
      }).catch(err=> console.log(err))
      
  }
   
    return(
        <Container>
          <Form enctype="multipart/form-data" onSubmit={(e)=>handleSubmit(e)}>
            <Input 
            value = {inputs.name || ""}
            name="name" 
            type="text" 
            placeholder = "Name" 
            required
            onChange={(e)=>handleChange(e)} />

            <Input 
            value = {inputs.description || ""}
            name="description"  
            type="text" 
            required
            placeholder = "Description" 
            onChange={(e)=>handleChange(e)} />

            <Input 
            value = {inputs.categories || ""}
            name="categories" 
            type="text"
            required 
            placeholder = "categories" 
            onChange={(e)=>handleChange(e)}/>

            <Input 
            value = {inputs.size || ""}
            name="size" 
            type="text" 
            placeholder = "size(s) e.g s, m, l, 46"  
            onChange={(e)=>handleChange(e)}/>

            <Input 
            value = {inputs.color || ""}
            name="color" 
            type="text" 
            placeholder = "color(s) e.g red, blue..."  
            onChange={(e)=>handleChange(e)}/>

            <Input 
            value = {inputs.price || ""}
            name="price" 
            type="number"
            required 
            placeholder = "enter price"  
            onChange={(e)=>handleChange(e)}/>

            <Input 
            name="file" 
            type="file"
            accept = "image/*"
            required
            onChange = {(e)=> handleFile(e)}/>
            <Button type="submit" >Submit</Button>
          </Form>
        </Container>
    )
}


export default ProductUploadPage