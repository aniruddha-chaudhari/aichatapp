import React, { createContext, useContext, useState, ReactNode } from 'react';

type CartItems = {
  [key: string]: number;  
};

interface CartContextType {
    cartItems: CartItems;
    addToCart: (itemKey: string, quantity: number) => void;
    SetQuantityCart: (itemKey: string, delta: number) => void;
    emptyCart: () => void;
  }

  const CartContext = createContext<CartContextType | undefined>(undefined);

  export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItems>({});

    const addToCart = (itemKey: string, quantity: number) => {
        setCartItems((prev) => {
            const newQuantity = (prev[itemKey] ?? 0) + quantity;
            return { ...prev, [itemKey]: newQuantity };
        });
    };

    const SetQuantityCart = (itemKey: string, delta: number) => {
        setCartItems((prevItems) => ({
          ...prevItems,
          [itemKey]:  Math.max((prevItems[itemKey] || 0) + delta, 0),
        }));
      };

    const emptyCart = () => {
        setCartItems({});
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, SetQuantityCart, emptyCart }}>
            {children}
        </CartContext.Provider>
    );
  };

  export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
      throw new Error('useCart must be used within a CartProvider');
    }
    return context;
  };