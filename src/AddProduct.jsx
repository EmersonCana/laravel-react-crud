import React from 'react'
import { useState } from 'react'
import axios from 'axios';

const AddProduct = () => {
    const [input, setInput] = useState('');
    const [formData, setFormData] = useState({
        'productName' : '',
        'description' : '',
        'category' : '',
        'quantity' : '',
        'price' : '',
        'img_url' : ''
    });

    

    const addUrl = 'http://emersoncana.infinityfreeapp.com/public/api/product/add'

    const handleInput = (event) => {
        setInput(event.target.value)
        setFormData(() => ({
            ...formData,
            [event.target.name] : event.target.value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post(addUrl, formData).then(function (response) {
            console.log(response)
        }).catch(function (error) {
            console.log(error);
        })
    }

  return (
    <div className="card">
        <div className="card-header">Add Product</div>
        <div className="card-body">
            <form>
                <input type="text" name="productName" onChange={handleInput} className="form-control" placeholder="Product Name"/><br/>
                <input type="text" name="description" onChange={handleInput}  className="form-control" placeholder="Description"/><br/>
                <input type="text" name="category" onChange={handleInput}  className="form-control" placeholder="Category"/><br/>
                <input type="number" name="quantity" onChange={handleInput}  className="form-control" placeholder="Quantity"/><br/>
                <input type="number" name="price" onChange={handleInput}  className="form-control" placeholder="Price"/><br/>
                <input type="text" name="img_url" onChange={handleInput}  className="form-control" placeholder="URL"/><br/>
                <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Add Product</button>
            </form>
        </div>
    </div>
  )
}

export default AddProduct