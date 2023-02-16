import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';


const EditProduct = () => {
    const [input, setInput] = useState('');
    const [formData, setFormData] = useState({
        'productName' : '',
        'description' : '',
        'category' : '',
        'quantity' : '',
        'price' : '',
        'img_url' : ''
    });
    const {id} = useParams();
    const controller = new AbortController;

    const editUrl = 'https://emersoncana.infinityfreeapp.com/public/api/product/edit/'+id
    const getById = 'https://emersoncana.infinityfreeapp.com/public/api/product/'+id

    useEffect(() => {
        console.log(getById)
        axios.get(getById).then(function (response) {
            let data = response.data
            setFormData(data);
        }).catch(function (error) {
            console.log(error)
        })
        return () => {
            controller.abort();
          }
    },[])

    const handleInput = (event) => {
        setInput(event.target.value)
        setFormData(() => ({
            ...formData,
            [event.target.name] : event.target.value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post(editUrl, formData).then(function (response) {
            console.log(response)
        }).catch(function (error) {
            console.log(error);
        })
    }
  return (
    <div className="card">
        <div className="card-header">Edit Product</div>
        <div className="card-body">
            <form>
                <input type="text" name="productName" value={formData.productName} onChange={handleInput} className="form-control" placeholder="Product Name"/><br/>
                <input type="text" name="description" value={formData.description}  onChange={handleInput}  className="form-control" placeholder="Description"/><br/>
                <input type="text" name="category" value={formData.category}  onChange={handleInput}  className="form-control" placeholder="Category"/><br/>
                <input type="number" name="quantity" value={formData.quantity}  onChange={handleInput}  className="form-control" placeholder="Quantity"/><br/>
                <input type="number" name="price" value={formData.price}  onChange={handleInput}  className="form-control" placeholder="Price"/><br/>
                <input type="text" name="img_url" value={formData.img_url}  onChange={handleInput}  className="form-control" placeholder="URL"/><br/>
                <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Edit Product</button>
            </form>
        </div>
    </div>
  )
}

export default EditProduct