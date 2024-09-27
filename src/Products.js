import {Form, Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import './App.css';


function Products() {

    const [products, setProducts] = useState(null);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [edit, setEdit] = useState(null);
    const [categories, setcategories] = useState(null)

    function handleName(event) {
        setName(event.target.value)
    }

    function handlePrice(event) {
        setPrice(event.target.value)
    }

    function handleQuantity(event) {
        setQuantity(event.target.value)
    }

    function handleCategoryId(event) {
        setCategoryId(event.target.value)
    }

    async function getAllProduct() {
        const response = await axios.get("http://localhost:8080/products");
        setProducts(response.data)
        console.log(response.data)
    }

    async function createProduct(event) {
        event.preventDefault();
        const data = {
            name: name,
            price: price,
            quantity: quantity,
            categoryId: categoryId
        }
        const response = await axios.post("http://localhost:8080/products", data);
        alert("saved")
        await getAllProduct();
        setName("");
        setPrice("");
        setQuantity("");
        setCategoryId("");
    }

    async function updateProduct(event) {
        event.preventDefault();
        const data = {
            name: name,
            price: price,
            quantity: quantity,
            categoryId: categoryId
        }
        try {
            const updateReq = await axios.put("http://localhost:8080/products/" + edit, data);
            alert("Updated")
            await getAllProduct();
            setName("");
            setPrice("");
            setQuantity("");
            setCategoryId("");
            setEdit(null);
        } catch (e) {
            alert("Error updating product")
            console.error(e)
        }
    }

    useEffect(() => {
        axios.get("http://localhost:8080/products")
            .then((response) => {
                console.log(response.data)
                setProducts(response.data)
            })
            .catch((error) => {
                console.error(error)
            });

        axios.get("http://localhost:8080/categories")
            .then((response) => {
                console.log(response.data)
                setcategories(response.data)
            })
            .catch((error) => {
                console.error(error)
            });

    }, []);

    return (
        <div>
            <h1>products</h1>
            {
                products && products.map((product) => {
                    return (
                        <div key={product.id}>
                            {product.name} - {product.price} - {product.quantity} - {product.category?.name}
                            <button type={"button"} onClick={() => {
                                setEdit(product.id);
                                setName(product.name);
                                setPrice(product.price);
                                setQuantity(product.quantity);
                                setCategoryId(product.category.id);
                            }}>edit
                            </button>
                        </div>
                    )
                })
            }

            {!edit &&
                <div>
                    <h2>create form</h2>
                    <form onSubmit={createProduct}>
                        <div>
                            <label>name</label>
                            <input type={"text"} onChange={handleName} value={name}/>
                        </div>
                        <div>
                            <label>price</label>
                            <input type={"text"} onChange={handlePrice} value={price}/>
                        </div>
                        <div>
                            <label>quantity</label>
                            <input type={"text"} onChange={handleQuantity} value={quantity}/>
                        </div>
                        <div>
                            <label>category</label>
                            <select onChange={handleCategoryId} required>
                                <option value="">Select category</option>
                                {
                                    categories && categories.map((category) => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <button type={"submit"}>save</button>
                    </form>
                </div>}

            {edit &&
                <div>
                    <h2>edit form</h2>
                    <form onSubmit={updateProduct}>
                        <div>
                            <label>name</label>
                            <input type={"text"} onChange={handleName} value={name}/>
                        </div>
                        <div>
                            <label>price</label>
                            <input type={"text"} onChange={handlePrice} value={price}/>
                        </div>
                        <div>
                            <label>quantity</label>
                            <input type={"text"} onChange={handleQuantity} value={quantity}/>
                        </div>
                        <div>
                            <label>category</label>
                            <select onChange={handleCategoryId} required>
                                <option value="">Select category</option>
                                {
                                    categories && categories.map((category) => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <button type={"submit"}>save</button>
                        <button type={"button"} onClick={() => {
                            setName("");
                            setPrice("");
                            setQuantity("");
                            setCategoryId("");
                            setEdit(null);
                        }}>cansel
                        </button>
                    </form>
                </div>
            }

            <Link to={"/users"}>users</Link><br/>
            <Link to={"/"}>Home</Link>
        </div>
    )

}

export default Products;





