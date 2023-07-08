import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
    id: number;
    name: string;
    price: number;
    qty: number;
    total: number;
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart: (state, action: PayloadAction<CartItem>) => {
            const newItem = action.payload;
            const existingItem = state.items.find((item) => item.id === newItem.id);
            if (existingItem) {
                // If the item already exists in the cart, increase its quantity
                existingItem.qty += newItem.qty;
            } else {
                // Otherwise, add the new item to the cart
                state.items.push(newItem);
            }
        },
        removeItemFromCart: (state, action: PayloadAction<number>) => {
            const itemIdToRemove = action.payload;
            state.items = state.items.filter((item) => item.id !== itemIdToRemove);
        },
        clearCart: (state) => {
            state.items = [];
        },
    }
});

export const { addItemToCart, removeItemFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
