import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [dataSecret, setDataSecret] = useState(null);
  const [cartCost, setCartCost] = useState(null);
  const [cartLength,setCartLength]=useState(0);
  const [cartLiveLength,setCartLiveLength]=useState(0);
  const [token,setToken]=useState('');
  const [cartLengthValue,setCartLengthValue]=useState(false);
  const [addNewHotel,setAddNewHotel]=useState(false);
  const [adult,setadult]=useState();
  const [child,setChild]=useState();
  const [descriptionPage, setDescriptionPage] = useState(false);
  const [bookTransfer,setBookTransfer]=useState(false);
  const [transferDetails,setTransferDetails]=useState(null);
  const [agentName,setAgentName]=useState('')
  const [filteredList, setFilteredList] = useState([]);
  const [packageId,setPackageId]=useState('');
  const [lancCombosId,setLandCombosId]=useState('');
  const [attractionId,setAttractionId]=useState('');
  const [cartItem, setCartItem]=useState(null);
  
  return (
    <CartContext.Provider value={{ dataSecret, setDataSecret, cartCost, setCartCost,cartLength,setCartLength,
      token,setToken,cartLiveLength,setCartLiveLength,cartLengthValue,setCartLengthValue,addNewHotel,setAddNewHotel,
      adult,setadult,child,setChild,bookTransfer,setBookTransfer,transferDetails,setTransferDetails,
      descriptionPage, setDescriptionPage,agentName,setAgentName,filteredList, setFilteredList,
      packageId,setPackageId,lancCombosId,setLandCombosId,attractionId,setAttractionId,cartItem, setCartItem
      }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
