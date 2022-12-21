import axios from "axios"

export const publicRequest = axios.create({
    baseURL: "https://cdevs-ecomm-api.cyclic.app/api"
})

// export const publicRequest = axios.create({
//     baseURL: "http://localhost:5000/api"
// })

export const privateRequest = axios.create({
    baseUrl: "http://localhost:5000/api"
})