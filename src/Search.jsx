import React from 'react'
import axios from "axios"
import { useState } from "react"

const Search = () => {
    const [input, setInput] = useState('')
    const [products, setProducts] = useState([]);
    const url = 'https://emersoncana.infinityfreeapp.com/public/api/search/'

    const getProduct = (event) => {
        setInput(event.target.value)
        setProducts([])
        
        axios.get(url + event.target.value).then(function (response) {
        setProducts((prevProducts) => [...prevProducts, response.data[0]]);
        }).catch(function (error) {
        console.log(error)
        })
    }

  return (
    <>
    <input type="text" name="search" className="form-control" value={input} onChange={getProduct}></input>
    {products.map((product) => 
    <div className="card" style={{width: '18rem'}} key={product.id}>
        <img src={product.img_url} className="card-img-top" alt="..."></img>
        <div className="card-body">
        <h5 className="card-title">{product.productName}</h5>
        <p className="card-text">{product.description}</p>
        </div>
    </div>
    )}
    </>
  )
}

export default Search