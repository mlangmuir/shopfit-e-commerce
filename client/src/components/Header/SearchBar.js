import styled from "styled-components";
import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Context } from "../Context";

const SearchBar = () => {

    const navigate = useNavigate();

    const { setDisplayValue, items, setDisplayFilters, setCompanyNameTab } = useContext(Context);

    const search = useLocation().search;

    // allows search bar value to be saved in useState and URLSearchParams
    const [value, setValue] = useState(new URLSearchParams(search).get("name") || '');

    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
    const [isFocus, setIsFocus] = useState(false);

    // when user selects item from suggestions dropdown, they are redirected to item detail page
    const handleSelect=(suggestion) => {
        navigate(`id/${suggestion}`);
    }

    return (
        <Wrapper>
            <Input
                onFocus={()=> setIsFocus(true)}
                onBlur={()=> {
                    setTimeout(() => {
                        setIsFocus(false);
                    }, 200)
                }}
                type="search"
                placeholder="Search for high-quality sports products..."
                value={value}
                onChange={(ev) => {
                    setValue(ev.target.value)
                    const filteredArray = items.filter((item) => {
                        if (ev.target.value.length >= 1 && item?.name.toLowerCase().includes(ev.target.value.toLowerCase())) {
                            return item;
                        }
                    });
                    setFilteredSuggestions(filteredArray);
                }}
                onKeyDown={(ev) => {
                    switch (ev.key) {
                        case "Enter": {
                            ev.preventDefault();
                            setDisplayValue(value);
                            setIsFocus(false);
                            setDisplayFilters([value]);
                            setCompanyNameTab("");
                            window.scrollTo(0, 0)
                            if (value.length >= 1 && filteredSuggestions.length > 0) {
                                handleSelect(filteredSuggestions[selectedSuggestionIndex]?._id)
                            }
                            navigate('/items?name='+value)
                            return;
                        }
                        case "ArrowUp": {
                            setSelectedSuggestionIndex(selectedSuggestionIndex - 1);
                            return;
                        }
                        case "ArrowDown": {
                            setSelectedSuggestionIndex(selectedSuggestionIndex + 1);
                            return;
                        }
                        default:
                            return;
                    }
                }}
            />
            {value.length >= 1 && filteredSuggestions.length > 0 && isFocus &&
                <List>
                    {filteredSuggestions.map((item, index) => {
                        if (index <= 6 && selectedSuggestionIndex <= 7 && selectedSuggestionIndex >= -2) {
                            const isSelected = selectedSuggestionIndex  - index;
                            if (selectedSuggestionIndex === (filteredSuggestions.length + 1)) {
                                setSelectedSuggestionIndex(selectedSuggestionIndex - (filteredSuggestions.length + 1));
                            } else if ((selectedSuggestionIndex === -2)) {
                                setSelectedSuggestionIndex(selectedSuggestionIndex + (filteredSuggestions.length + 1));
                            }
                            return (
                                <div key={index}>
                                    <Suggestion
                                        style={{
                                            background: isSelected? "transparent":"hsla(50deg, 100%, 80%, 0.50",
                                        }}
                                        onMouseEnter={()=>{
                                            setSelectedSuggestionIndex(index);
                                        }}
                                        onKeyDown={(ev) => {
                                            if (ev.key === "Enter") {
                                                handleSelect(item?._id)
                                            }
                                        }}
                                        onClick={(ev) => {
                                            ev.preventDefault();
                                            setIsFocus(true);
                                            if (value.length >= 1 && filteredSuggestions.length > 0) {
                                                handleSelect(filteredSuggestions[selectedSuggestionIndex]?._id)
                                            }
                                        }}
                                    >
                                        <span style={{fontStyle: "bold"}}>
                                            {item?.name.slice(0, value.length)}
                                            <Prediction>
                                                {item?.name.slice(value.length, item?.name.length)}
                                            </Prediction>
                                        </span>
                                        <span style={{
                                            fontSize: "16px",
                                            fontStyle: "italic"}}
                                        > 
                                            &nbsp;in&nbsp;
                                        </span>
                                        <span style={{
                                            fontSize: "16px",
                                            fontStyle: "italic",
                                            color: "purple",
                                        }}
                                        >
                                            {item?.category}
                                        </span>
                                    </Suggestion>
                                </div>
                            )
                        }
                    })}
                </List>
            }
            {value.length >= 1 && filteredSuggestions.length === 0 && isFocus &&
                <List>
                    <Suggestion>No results</Suggestion>
                </List>
            }
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px 0;
    width: 100%;
`;

const Input = styled.input`
    width: 100%;
    height: 35px;
    font-size: 18px;
    padding: 0 5px;
`;

const List = styled.ul`
    width: 70%;
    border: 1px solid white;
    border-radius: 5px;
    box-shadow: 0 3px 6px 0 lightgrey;
    background-color: white;
    position: absolute;
    margin-top: 50px;
    list-style: none;
`;

const Suggestion = styled.li`
    padding: 10px 10px;
    line-height: 23px;
    font-size: 18px;

    :hover {
        cursor: pointer;
    }
`;

const Prediction = styled.span`
    font-weight: bold;
`;

export default SearchBar;