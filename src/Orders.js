import {useEffect, useState} from "react";
import axios from "axios";

function Orders() {

    const [orders, setOrders] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8080/orders")
            .then((response) => {
                console.log(response.data)
                setOrders(response.data);
            })
            .catch(() => {
                console.error("Error fetching orders")
            })

    }, []);

    function createOrder(){
        axios.post("http://localhost:8080/orders")
            .then((response)=>{
                console.log("Order created successfully")
                console.log(response)
            })
            .catch((error) => {
                console.error("Error creating order", error)
            })
    }

    return (
        <div className={"container"}>
            <h1>Orders</h1>
            <div className={"text-end"}>
                <button type={"button"} className={"btn btn-primary"} onClick={createOrder}>create order</button>
            </div>
            <table className={"table table-striped"}>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>date and time</th>
                    <th>total items</th>
                    <th>total price</th>
                    <th>action</th>
                </tr>
                </thead>
                <tbody>
                {
                    orders && orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.orderDate}</td>
                            <td>{order.orderProducts.length}</td>
                            <td>{order.totalPrice}</td>
                            <td>
                                <button type={"button"} className={"btn btn-primary"} onClick={() => {
                                }}>edit
                                </button>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    )
}

export default Orders;