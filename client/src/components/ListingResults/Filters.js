import styled from "styled-components";
import { useContext, useEffect } from "react";
import { Context } from "../Context";

const Filters = ({
    doSearch,
    categories,
    bodyLocations,
    numInStock,
    setNumInStock,
    price,
    setPrice,
    category,
    setCategory,
    body_location,
    setBodyLocation,
    filtersLabel,
    page,
    companyId
}) => {

    const { setDisplayFilters, companyNameTab, displayValue } = useContext(Context);

    // declaring simplified value to be used in URL params and caption to be listed for user in filter box
    const priceFilterLabels = [
        { value: '25', caption: 'Under $25'},
        { value: '25-50', caption: '$25 - $50'},
        { value: '50-100', caption: '$50 - $100'},
        { value: '100-200', caption: '$100 - $200'},
        { value: '200-300', caption: '$200 - $300'},
        { value: '300', caption: '$300 +'},
    ];

    console.log(displayValue)

    // applied filters button displays all filters based on 4 categories
    const handleApplyFilters = () => {
        page = 1
        setDisplayFilters(filtersLabel);
        if (companyNameTab !== "") {
            setDisplayFilters(current => [...current, companyNameTab]);
        }
        if (displayValue !== "") {
            setDisplayFilters(current => [...current, displayValue]);
        }
        doSearch({ numInStock, price, category, body_location, companyId, page });
        window.scrollTo(0,0);
    }

    // resets the filter checkboxes everytime a search is in the search bar
    useEffect(() => {
        if (displayValue) {
            setCategory([]);
            setBodyLocation([]);
            setPrice([]);
            setNumInStock("0");
        }
    },[])

    return (
        <FilterBox>
            <FilterTitle>Filters</FilterTitle>

            <FilterBy>Availability</FilterBy>
            <div>
                <Input
                    onChange={(e) => {
                        if (e.target.checked) {
                            setNumInStock("1");
                        } else {
                            setNumInStock("0")
                        }
                    }}
                    checked={numInStock.includes("1")}
                    type="checkbox"
                    id="in-stock"
                />
                <Label htmlFor="in-stock">In stock</Label>
            </div>

            <FilterBy>Price</FilterBy>
            {priceFilterLabels.map((item, index) => {
                return (
                    <div key={index}>
                            <div>
                                <Input 
                                    onChange={(e) => {
                                        if (e.target.checked && !price.includes(item.value)) {
                                            setPrice([...price, item.value]);
                                        } else if(!e.target.checked && price.includes(item.value)) {
                                            setPrice(price.filter(val => val !== item.value));
                                        }
                                    }}
                                    checked={price.includes(item.value)}
                                    type="checkbox"
                                    id={item.value}
                                />
                                <Label htmlFor={item.value}>{item.caption}</Label>
                            </div>
                    </div>
                )
            })}

            <FilterBy>Category</FilterBy>
            {categories.map((item, index) => {
                return (
                    <div key={index}>
                        <Input
                        onChange={(e) => {
                            if (e.target.checked && !category.includes(item)) {
                                setCategory([...category, item]);
                            } else if(!e.target.checked && category.includes(item)) {
                                setCategory(category.filter(val => val !== item));
                            }
                        }}
                        checked={category.includes(item)}
                        type="checkbox"
                        id={item}
                    />
                        <Label htmlFor={item}>{item}</Label>
                    </div>
                )
            })}

            <FilterBy>Body Location</FilterBy>
            {bodyLocations.map((item, index) => {
                return (
                    <div key={index}>
                        <Input
                            onChange={(e) => {
                                if (e.target.checked && !body_location.includes(item)) {
                                    setBodyLocation([...body_location, item]);    
                                } else if(!e.target.checked && body_location.includes(item)) {
                                    setBodyLocation(body_location.filter(val => val !== item));
                                }
                            }}
                            checked={body_location.includes(item)}
                            type="checkbox"
                            id={item}
                        />
                        <Label htmlFor={item}>{item}</Label>
                    </div>
                )
            })}

            <Button onClick={handleApplyFilters}>
                Apply filters
            </Button>
        </FilterBox>
    )
}

const FilterBox = styled.div`
    border: 1px solid lightgrey;
    width: 280px;
    padding: 25px;

    @media (max-width: 950px) {
        margin-bottom: 50px;
        width: 65%;
    }
`;

const FilterTitle = styled.h2`
    border-bottom: 1px solid lightgrey;
    padding-bottom: 10px;
    font-weight: 700;
`;

const FilterBy = styled.h3`
    border-bottom: 1px solid lightgrey;
    padding-bottom: 10px;
    margin-top: 40px;
    font-weight: 700;
`;

const Label = styled.label`
    margin-left: 7px;
    
    :hover {
        cursor: pointer;
    }
`;

const Input = styled.input`
    margin-top: 10px;

    :hover {
        cursor: pointer;
    }
`;

const Button = styled.button`
    font-size: 18px;
    color: white;
    width: 100%;
    margin-top: 25px;
    border: none;
    border-radius: 5px;
    height: 30px;

    :hover {
        cursor: pointer;
    }
`;

export default Filters;