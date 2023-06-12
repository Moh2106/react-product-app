import axios from "axios";
import { createContext, useState } from "react";

export const productApi = axios.create({
    baseURL: "http://localhost:9000/"
})


export const getProducts = (keyword="", page=1, size=4) => {
    return productApi.get(`/products?name_like=${keyword}&_limit=${size}&_page=${page}`)
}

export const getProductById = (id) => {

    return productApi.get(`/products/${id}`)
}

export const deleteProduct = (product) => {
    return productApi.delete(`/products/${product.id}`)
}

export const saveProduct = (product) => {
    return productApi.post("/products", product)
}

export const checkProduct = (product) => {
    return productApi.patch(`/products/${product.id}`, {checked : !product.checked})
}

export const updateProduct = (product) => {
    return productApi.put(`/products/${product.id}`, product)
}

// Création d'un contexte
export const AppContext = createContext()

export const useAppState = () => {
    const initialState = {
      products: [],
      keyword: "",
      currentPage: 1,
      pageSize: 4,
      totalPages: 0,
    };

    const appState = useState(initialState)

    return appState;
}