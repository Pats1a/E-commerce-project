import axios from 'axios'

const ProductsApi = (pageragac: number, currentpage: number) => {
    

    return axios.post('http://localhost:8080/products', {
        keyword:"", page_number: pageragac , page_size: currentpage
    })
}

export default ProductsApi;