import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));

  
  useEffect(() => {
  const handleLogin = () => {
    const newToken = localStorage.getItem("token");
    setToken(newToken);
  };

  window.addEventListener("login", handleLogin);
  return () => window.removeEventListener("login", handleLogin);
}, []);


  //  Fetch cart only when token exists
  useEffect(() => {
    const fetchCart = async () => {
      if (!token) return; 

      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Fetched cart:", res.data);
        setCartItems(res.data.items || []);
        localStorage.setItem("cartItems", JSON.stringify(res.data.items || []));
      } catch (err) {
        console.error("Error fetching cart:", err.response?.data || err);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("cartItems");
          setCartItems([]);
          alert("Session expired. Please login again.");
          window.location.href = "/login";
        }
      }
    };

    fetchCart();
  }, [token]); // run again when token changes

 
  const addToCart = async (item) => {
    const currentToken = localStorage.getItem("token");
    if (!currentToken) {
      alert("Please login first!");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/cart/add`,
        {
          productId: item._id || item.id,
          name: item.productName,
          image: item.image,
          price: item.price,
          size: item.selectedSize,
          source: item.source,
        },
        { headers: { Authorization: `Bearer ${currentToken}` } }
      );

      setCartItems(res.data.items);
      localStorage.setItem("cartItems", JSON.stringify(res.data.items));
    } catch (error) {
      console.error("Error adding to cart:", error.response?.data || error);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        setCartItems([]);
        alert("Session expired. Please login again.");
        window.location.href = "/login";
      }
    }
  };


 
const removeFromCart = async (productId, size, source) => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.delete(
      `${import.meta.env.VITE_API_URL}/cart/${productId}?size=${size}&source=${source}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // console.log("Updated cart:", res.data.items);
    setCartItems(res.data.items);
  } catch (error) {
    console.error("Error removing item:", error);
  }
};



  
  const clearCart = async () => {
    const currentToken = localStorage.getItem("token");
    if (!currentToken) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/cart/clear`, {
        headers: { Authorization: `Bearer ${currentToken}` },
      });
      setCartItems([]);
      localStorage.removeItem("cartItems");
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

   
 const increaseQuantity = (productId, size, source) => {
  setCartItems((prev) =>
    prev.map(it =>
      it.productId === productId && it.size === size && it.source === source
        ? { ...it, quantity: it.quantity + 1 }
        : it
    )
  );
};

const decreaseQuantity = (productId, size, source) => {
  setCartItems((prev) =>
    prev.map(it =>
      it.productId === productId && it.size === size && it.source === source && it.quantity > 1
        ? { ...it, quantity: it.quantity - 1 }
        : it
    )
  );
};

  const logoutCart = () => {
  setCartItems([]);
  localStorage.removeItem("cartItems");
  localStorage.removeItem("token");
  setToken(null);
};


  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        logoutCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
