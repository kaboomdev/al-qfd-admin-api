require('dotenv').config()
const axios = require('axios');
const http = axios.create({
  baseURL: `https://${process.env.SHOPIFY_STORE_URL}/admin/api/${process.env.SHOPIFY_ADMIN_API_VERSION}`,
  timeout: 1000,
  headers: {
    'X-Shopify-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN
  }
});

function AddProduct(product){
  if (!product) throw new Error('Product is required')
  return http.post('/products.json', {
    product
  })
}

function DeleteProduct(id){
  if (!id) throw new Error('ID is required')
  return http.delete(`/products/${id}.json`)
}

function EditProduct(id, product){
  if (!id) throw new Error('ID is required')
  return http.put(`/products/${id}.json`, {
    product
  })
}

function GetProduct(id){
  if (!id) throw new Error('ID is required')
  return http.get(`/products/${id}.json`)
}


module.exports = {
  AddProduct,
  DeleteProduct,
  EditProduct,
  GetProduct,
}

