require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser');

const app = express()
const port = 4000

const service = require('./service.js')

app.use(bodyParser.json());

app.get('/', async function (req, res) {
  return res.send('ALIVE')
});

app.get('/product/:id', async function (req, res, next) {
  try {
    await service.GetProduct(req.params.id)
    return res.json({
      success: true
    })
  } catch (error) {
    next(error)
  }
});

app.post('/product/add', async function (req, res) {
  if (!req.body.product) {
    return res.status(400).json({
      success: false,
      data: "Product is required"
    })
  }
  
  try {
    const { data: product } = await service.AddProduct(req.body.product)
    return res.json({
      success: true,
      data: {
        ...product
      }
    })
  } catch (error) {
    next(error)
  }
});


app.delete('/product/:id', async function (req, res, next) {
  try {
    await service.DeleteProduct(req.params.id)
    return res.json({
      success: true
    })
  } catch (error) {
    next(error)
  }
});

app.put('/product/:id', async function (req, res, next) {
  if (!req.body.product) {
    return res.status(400).json({
      success: false,
      data: "Product is required"
    })
  }
  
  try {
    const { data: product } = await service.EditProduct(req.params.id, req.body.product);
    return res.json({
      success: true,
      data: {
        ...product
      }
    })
  } catch (error) {
    next(error)
  }
});

app.use((error, req, res, next) => {
  const response = {
    success: false,
    data: {
      ...error.response?.data
    }
  }
  res.status(error.response.status || 500).json(response);
  
  console.log('Path: ', req.path);
  console.log('Response: ', response);
});


app.listen(port)
