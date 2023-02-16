
import { Route, Routes, Link } from "react-router-dom";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import Search from "./Search";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [products, setProducts] = useState([])
  const url = 'https://emersoncana.infinityfreeapp.com/public/api/products'
  const deleteUrl = 'https://emersoncana.infinityfreeapp.com/public/api/product/delete/'
  const controller = new AbortController;
  
  useEffect(() => {
    const fetchData = async () => {
      try {
          axios.defaults.withCredentials = true;
          await axios.get(url).then(function (response) {
            setProducts(response.data)
          }).catch(function (error) {
            console.log(error)
          })
        }catch(err) {
          console.log(err)
        }
      }
    fetchData();
      
    return () => {
      controller.abort();
    }
  }, [])

  const handleDelete = (id) => {
    axios.get(deleteUrl + id).then(function (response) {
      setProducts(products);
    }).catch(function(error) {
      console.log(error)
    })
  }

  return (
    <>
    <div className="row">
      <div className="col-4 offset-4">
        <div className="card">
          <div className="card-body">
            <Link to="/">Home</Link>
            <Link to="/add">Add</Link>
            <Link to="/edit">Edit</Link>



            <Routes>
              <Route path="/" element={<Search />}></Route>
              <Route path="/add" element={<AddProduct />}></Route>
              <Route path="/edit/:id" element={<EditProduct />}></Route>
            </Routes>

            
            
              
          </div>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="row">
        {products.map((product) =>
          <div className="col-3">
            <div className="card" style={{width: '18rem'}} key={product.id}>
                <img src={product.img_url} className="card-img-top" alt="..."></img>
                <div className="card-body">
                <h5 className="card-title">{product.productName}</h5>
                <p className="card-text">{product.description}</p>
                <Link to={'edit/'+ product.id}>Edit</Link> | <button onClick={() => handleDelete(product.id)}>Delete</button>
                
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  )
}

export default App
