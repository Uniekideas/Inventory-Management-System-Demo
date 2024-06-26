import { React, createContext, useState } from "react";
import axios from "axios";

const InventoryItemContext = createContext();
export default InventoryItemContext;

export const InventoryItemProvider = ({ children }) => {
  const [getItemsData, setGetItemsData] = useState(null);
  const [getItemsError, setGetItemsError] = useState(null);
  const [getItemsIsLoading, setGetItemsIsLoading] = useState(true);

  const [addItemError, setAddItemError] = useState(null);
  const [addItemIsLoading, setAddItemIsLoading] = useState(true);
  const [addItemResponse, setAddItemResponse] = useState(null);

  const [getSingleItemData, setGetSingleItemData] = useState(null);
  const [getSingleItemError, setSingleItemError] = useState(null);
  const [getSingleItemIsLoading, setSingleItemIsLoading] = useState(true);


  const getInventoryItems = async () => {
    setGetItemsIsLoading(true);
    const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
    try {
      const response = await axios.get(`${baseUrl}/api/item`);
      setGetItemsData(response.data.items);
    } catch (error) {
      setGetItemsError(error);
    } finally {
      setGetItemsIsLoading(false);
    }
  };

  const getInventorySingleItem = async (pk) => {
    setSingleItemIsLoading(true);
    const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
    try {
      const response = await axios.get(`${baseUrl}/api/item/${pk}`);
      setGetSingleItemData(response.data.item);
    } catch (error) {
      setSingleItemError(error);
    } finally {
      setSingleItemIsLoading(false);
    }
  };

  const handleAddItem = async (e) => {
    setAddItemIsLoading(true);
    const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
    e.preventDefault();
    const formData = {
      name: e.target.name.value,
      description: e.target.description.value,
      brand: e.target.brand.value,
      category: e.target.category.value,
      value: e.target.value.value,
      image: e.target.image.value,
      unit_cost: e.target.unit_cost.value,
      quantity: e.target.quantity.value,
      reorder_point: e.target.reorder_point.value,
      supplier: e.target.supplier.value,
    };
    try {
      const result = await axios.post(`${baseUrl}/api/item`, formData);
      setAddItemResponse(result.data);
    } catch (error) {
      setAddItemError(error.response.data.message);
      console.log(error);
    } finally {
      setAddItemIsLoading(false);
    }
  };

  let contextData = {
    getItemsIsLoading: getItemsIsLoading,
    getItemsError: getItemsError,
    getItemsData: getItemsData,
    addItemError: addItemError,
    addItemIsLoading: addItemIsLoading,
    addItemResponse: addItemResponse,
    getSingleItemIsLoading: getSingleItemIsLoading,
    getSingleItemError: getSingleItemError,
    getSingleItemData: getSingleItemData,
    
    getInventoryItems: getInventoryItems,
    handleAddItem: handleAddItem,
    setAddItemError: setAddItemError,
    setAddItemResponse: setAddItemResponse,
    getInventorySingleItem: getInventorySingleItem,
  };

  return (
    <InventoryItemContext.Provider value={contextData}>
      {children}
    </InventoryItemContext.Provider>
  );
};
