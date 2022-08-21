import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Categories from "./Categories";
import SearchBar from "./SearchBar";
import { Context } from "../Context";
import { NavLink } from "react-router-dom";

const Header = () => {

    const { shopfitLogo, shoppingCartIcon, cart } = useContext(Context);
    const [noOfItemsInCart , setNoOfItemsInCart] = useState(0);

    // set quantity for bubble over cart
    let quantity = 0

    // calculate items in cart and store in a useState
    useEffect(() => {
        cart.forEach(order => {
            quantity = quantity + order.quantity
        })
        setNoOfItemsInCart(quantity);
    }, [cart]);
    

    return (
        <Wrapper>
            <NavLink to="/">
                <Logo src={shopfitLogo} alt="SHOPFIT company logo" />
            </NavLink>
            <Container>
                <SearchBar />
                <Categories />
            </Container>
            <Cart>
            <NavLink to="/shopping-cart">
                <ShoppingCartIcon src={shoppingCartIcon} alt="Shopping cart icon" />
            </NavLink>
            <Count>{noOfItemsInCart}</Count>
            </Cart>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    background-color: black;
    width: 100%;
    align-items: center;
    justify-content: space-evenly;
    height: 100%;

    @media (max-width: 1050px) {
        flex-direction: column;
    }
`;

const Logo = styled.img`
    height: 80px;
    padding: 5px;
    margin-left: 30px;
    margin-right: 30px;
`;

const Container = styled.div`
    width: 75%;
    display: flex;
    flex-direction: column;
`;

const ShoppingCartIcon = styled.img`
    width: 40px;
    margin-right: 30px;
    margin-left: 60px;

    @media (max-width: 1050px) {
        margin: 15px 0 15px 0;
    }
`;

const Cart = styled.div`
    position: relative;
`;

const Count = styled.span`
    font-size: 13px;
    color: #fff;
    background: red;
    border-radius: 50%;
    padding: 3px 5px;
    position: absolute;
    left: 70%;
    top: 0;

    @media (max-width: 1050px) {
        margin: 15px 0;
    }
`;

export default Header;