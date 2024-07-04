import { createSlice, nanoid } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const cartSlice = createSlice({
    name: "orders",
    initialState: {       
        orders: localStorage.getItem("orders")
        ? JSON.parse(localStorage.getItem("orders"))
        : [],
    },
    reducers: {
        addToOrder : (state, action)=>{
            const order = {
                orderId: nanoid(),
                data: action.payload,
            }
            state.orders.push(order)
            toast.success(
                "added to order",{
                position : "bottom-center"
                }
            )

            localStorage.setItem("orders", JSON.stringify(state.orders));
        },
        removeFromOrder: (state, action)=>{
            state.orders = state.orders.filter(x => x.orderId !== action.payload);
            localStorage.setItem("orders", JSON.stringify(state.orders))
            toast.error(
                "removed from order",{
                position : "bottom-center"
                }
            )
        }
    }
})

export default cartSlice.reducer;
export const {addToOrder, removeFromOrder} = cartSlice.actions;