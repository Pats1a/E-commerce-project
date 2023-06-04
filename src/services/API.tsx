import axios from 'axios'

const ProductsApi = (pagenumb: number, currentpage: number) => {
    

    return axios.post('http://localhost:8080/products', {
        keyword:"", page_number: pagenumb , page_size: currentpage
    })
}

export default ProductsApi;