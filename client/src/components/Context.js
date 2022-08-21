import { createContext, useState, useEffect } from 'react';
import shopfitLogo from "../assets/shopfit-logo.png";
import shoppingCartIcon from "../assets/shopping-cart.jpeg"
import usePersistedState from "./usePersistedState";

export const Context = createContext();

const Provider = ({ children }) => {

    const [items, setItems] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [cart, setCart] = usePersistedState("cart", []);
    const [specItem, setSpecItem] = useState(null);
    const [specCompany, setSpecCompany] = useState(null);
    const [numFeatured, setNumFeatured] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [sellers, setSellers] = useState([]);
    const [companyIds, setCompanyIds] = useState([]);
    const [categoryTab, setCategoryTab] = usePersistedState("categoryTab", "");
    const [bodyLocationTab, setBodyLocationTab] = usePersistedState("bodyLocationTab", "");
    const [companyNameTab, setCompanyNameTab] = usePersistedState("companyNameTab", "");
    const [bodyLocationChange, setBodyLocationChange] = useState(false);
    const [displayFilters, setDisplayFilters] = usePersistedState("displayFilters", []);
    const [displayValue, setDisplayValue] = usePersistedState ("value", "");

    const [categories, setCategories] = useState([]);
    const [bodyLocations, setBodyLocations] = useState([]);

    // fetches all 348 items
    useEffect(() => {
        setIsLoading(true)
        fetch("/allItems")
            .then((res) => res.json())
            .then((data) => {
                setItems(data.data)
                setIsLoading(false)
            })
    },[]);

    // // fetches all 74 companies
    useEffect(() => {
        setIsLoading(true)
        fetch("/companies")
            .then((res) => res.json())
            .then((data) => {
                setCompanies(data.data);
                data.data.map((item) => {
                    setSellers(current => [...current, item?.name]);
                    setCompanyIds(current => [...current, item?._id]);
                    return null;
                })
                setIsLoading(false)
            })
    },[]);

    return (
        <Context.Provider
            value={{
                shopfitLogo,
                shoppingCartIcon,
                items,
                setItems,
                companies,
                setCompanies,
                sellers,
                cart,
                setCart,
                specItem,
                setSpecItem,
                specCompany,
                setSpecCompany,
                numFeatured,
                setNumFeatured,
                isLoading,
                setIsLoading,
                categories,
                setCategories,
                bodyLocations,
                setBodyLocations,
                companyIds,
                categoryTab,
                setCategoryTab,
                bodyLocationTab,
                setBodyLocationTab,
                companyNameTab,
                setCompanyNameTab,
                bodyLocationChange,
                setBodyLocationChange,
                displayFilters,
                setDisplayFilters,
                displayValue,
                setDisplayValue
            }}
        >
            {children}
        </Context.Provider>
    )
}

export default Provider;