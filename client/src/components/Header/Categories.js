import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Context } from "../Context";

const Categories = () => {

    const { setCategoryTab, setDisplayFilters, setDisplayValue, setCompanyNameTab } = useContext(Context);
    
    const navigate = useNavigate();

    // categories array for header and footer listings
    const categories = ["Fitness", "Medical", "Lifestyle", "Entertainment", "Industrial", "Pets and Animals", "Gaming"];

    return (
        <Nav>
            {categories.map((item, index) => {
                return (
                    <Category
                        key={index}
                        onClick={ () => {
                            navigate(`/items?category=${item}`);
                            setCategoryTab(item);
                            setDisplayFilters([item]);
                            setDisplayValue("");
                            setCompanyNameTab("");
                            window.location.reload(false);
                            window.scrollTo(0, 0)
                        }}
                    >
                        {item}
                    </Category>
                )
            })}
        </Nav>
    )
}

const Nav = styled.nav`
    margin-left: 10px;
    font-size: 20px;
    display: flex;
    justify-content: space-between;

    @media (max-width: 1050px) {
        flex-direction: column;
    }
`;

const Category = styled.p`
    color: white;
    text-decoration: none;
    margin-bottom: 20px;
    text-decoration: none;

    :hover {
        cursor: pointer;
    }

    @media (max-width: 1050px) {
        text-align: center;
    }
`;

export default Categories;