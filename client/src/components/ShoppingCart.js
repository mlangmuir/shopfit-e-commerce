import {useEffect, useState, useContext} from "react";
import styled from "styled-components";
import  {useNavigate} from 'react-router-dom';
import { Context } from "./Context";
import LoadingPage from "./LoadingPage";
import { MdDelete } from 'react-icons/md';
import { GiThumbUp } from 'react-icons/gi';
import { SiShopify } from 'react-icons/si'
import FeaturedItems from "./FeaturedItems";

// declare shoppingCart function
const ShoppingCart = () => {
    const [isShoppingCartEmpty, setIsShoppingCartEmpty] = useState(false);
    const [subtotal, setSubtotal] = useState(0)
    const { cart, setCart, isLoading, setNumFeatured } = useContext(Context);
    const navigate = useNavigate()
    
    // get four featured items and setNumFeatured
    useEffect(() => {
        setNumFeatured(4);
    }, [])

    // if cart length is equal zero set isShoppingCartEmpty to true otherwise false
    useEffect(() => {
        if(cart.length === 0){
            setIsShoppingCartEmpty(true)
        }else{
            setIsShoppingCartEmpty(false)
        }
    }, [cart]);

    // declare handleIncrement function
    const handleIncrement = (id) => {
        // loop over cart items and update particular item's quantity and set to cart state
        setCart(cart => 
            cart.map((item) =>
                id === item._id ?
                {...item,
                quantity: item.quantity+(item.quantity < item.numInStock ? 1 : 0)}
                :
                item
            )
        )
    }

    // loop over cart items and calculate subTotal and set to subTotal state
    useEffect(() => {
        let getSubtotal = 0;
        for(let i=0; i<cart.length; i++){
            const getPrice = (cart[i].price).substring(1)
            getSubtotal += Number(getPrice)*cart[i]?.quantity
            setSubtotal(getSubtotal)
        }
    })

    // declare handleDecrement function
    const handleDecrement = (id) => {
        // loop over cart items and update particular item's quantity and set to cart state
        setCart(cart =>
            cart.map((item) =>
                id === item._id ?
                {...item, quantity: item.quantity-(item.quantity > 1 ? 1 : 0)} :
                item
            )
        )
    }

    // declare handleCancel function
    const handleCancel = (e,id) => {
        // remove items from cart where id matches, store in newCart and update the cart state
        const newCart = cart.filter((item) => {
            return item._id !== id
        })
        setCart(newCart)
    }
    

    // declare handleClick function which redirect user to homepage
    const handleClick = () => {
        navigate("/");
        window.scrollTo(0, 0)
    }

    // declare handleCheckout function which redirect user to checkout component
    const handleCheckout = () => {
        navigate("/checkout");
        window.scrollTo(0, 0)
    }

    return (
        <>
        {!isLoading ?
        <>
        {(isShoppingCartEmpty) ?
        <Main>
            <>
            <Img src={"https://media.giphy.com/media/WAQiH273h7nTChAbHu/giphy.gif"} alt="Empty cart image" />
            <P>There are no items in your cart</P>
            <Button onClick={handleClick}>Continue shopping</Button>
            </>
        </Main> : 
        <>
        <ItemCart>
        <Wrapper>
            <Column1>
                <Heading>My Shopping Cart</Heading>
                    {cart && cart.map((item, index) => {
                        const price = (item.price).substring(1)*item.quantity;
                        return(
                            <Container key={index}>
                            <Part1>
                                <Img2 src={item.imageSrc} alt="Items" />
                            </Part1>
                            <div>
                                <div>
                                    <ItemInfo>{item.name}</ItemInfo>
                                    <ItemInfo>{item.category}</ItemInfo>
                                    <ItemInfos>Stock: {item.numInStock}</ItemInfos>
                                </div>
                            </div>
                            <div>
                                <QuantityBtn onClick={() => handleDecrement(item._id)}>-</QuantityBtn>
                                <label>{item.quantity}</label>
                                <QuantityBtn onClick={() => handleIncrement(item._id)}>+</QuantityBtn>
                            </div>
                            <ItemPrice>
                                ${price.toFixed(2)}
                            </ItemPrice>
                            <div>
                            <span>
                                <Cancel onClick={(e) => handleCancel(e,item._id)}>
                                    <Span><MdDelete size={20}/></Span>
                                </Cancel>

                                <Remove onClick={(e) => handleCancel(e,item._id)}>
                                    <Span>Remove</Span>
                                </Remove>
                            </span>
                            </div>
                </Container>
                        )
                    })}
                    <ContinueShoppingBtn onClick={handleClick}>Continue Shopping</ContinueShoppingBtn>
            </Column1>
            <Column2>
                <Summary><SiShopify size={28}/>Order Summary</Summary>
                <OrderInfo>${subtotal.toFixed(2)}</OrderInfo>
                <PriceInfo>Subtotal:</PriceInfo>
                <OrderInfo>$6.99</OrderInfo>
                <PriceInfo>Shipping:</PriceInfo>
                <OrderInfo>${(subtotal*0.12).toFixed(2)}</OrderInfo>
                <PriceInfo>Taxes:</PriceInfo>
                <OrderInfos>${((subtotal)+7).toFixed(2)}</OrderInfos>
                <Total>Total:</Total>
                <Checkout onClick={handleCheckout}>Checkout</Checkout>
            </Column2>
        </Wrapper>
        </ItemCart>

        <Featured>
            <HeadingFeatured>
                <GiThumbUp size={35} />OTHERS ALSO BOUGHT
            </HeadingFeatured>
            <Div>
                <FeaturedItems />
            </Div>
        </Featured>
        </>
        }
        </>: <LoadingPage />
        }</>
    )
}

export default ShoppingCart;

const Featured = styled.div`
    margin: 5%;
`;

const Div = styled.div`
    border: 1px solid silver;
`;

const OrderInfo = styled.span`
    float: right;
    font-size: 18px;

    @media (max-width: 700px){
        font-size: 25px;
    }
`;

const OrderInfos = styled.span`
    float: right;
    margin-top: 5px;
    font-weight: bold;
    font-size: 18px;

    @media (max-width: 700px){
        font-size: 25px;
    }
`;

const ItemCart = styled.div`
    width: 95%;
    margin: auto;
    padding: 20px;

    @media (max-width: 480px) {
        margin: auto;
        width: 90%;
        padding-bottom: 40px;
    }
`;

const ItemInfo = styled.p`
    padding-bottom: 10%;
    font-size: 18px;

    @media (max-width: 900px) {
        width: 100%;
        font-size: 25px;
    }
`;

const ItemInfos = styled.p`
    padding-bottom: 2%;
    font-weight: bold;

    @media (max-width: 836px) {
        width: 100%;
        font-size: 25px;
    }
`;

const QuantityBtn = styled.button`
    background-color: white;
    padding: 0px 7%;
    margin: 0% 10%;
    font-size: larger;
    cursor: pointer;

    @media (max-width: 836px) {
        font-size: 25px;
    }
`;

const ItemPrice = styled.div`
    font-size: 19px;
`;

const Wrapper = styled.div`
    display: flex;
    margin: 3%;

    @media (max-width: 1050px) {
        display: block;
    }
`;

const Column1 = styled.div`
    margin-right: 33px;
    width: 65%;

    @media (max-width: 1050px) {
        width: 99%;
        margin: auto;
    }
`;

const Container = styled.div`
    border: 2px solid silver;
    padding: 23px 0px 23px 20px;
    display: grid;
    grid-template-columns: 20% 35% 16% 7% 5%;
    column-gap: 22px;
    row-gap: 32px;
    margin-bottom: 3%;
    border-radius: 20px;
    box-shadow: 1px 1px 20px 1px #969696;

    @media (max-width: 1295px) {
        font-size: 20px;
        grid-template-columns: 15% 20% 25.5% 9% 2%;
        font-size: 20px;
    };

    @media (max-width: 700px) {
        font-size: 20px;
        grid-template-columns: 90%;
        font-size: 20px;
        text-align: center;
        width: 70%;
        margin: auto;
    }
`;

const Heading = styled.h3`
    margin-bottom: 13px;
    font-weight: bold;
    font-size: 28px;

    @media (max-width: 700px){
        text-align: center;
        margin-bottom: 30px;
    }
`;

const Part1 = styled.div`
    display: flex;
    float: left;
    margin-right: 5%;
    background-color: aliceblue;

    @media (max-width: 480px) {
        display: block;
    }
`;

const Img2 = styled.img`
    width: 100%;
`;

const Cancel = styled.button`
    background-color: white;
    border: none;
    cursor: pointer;

    &:hover{
        color: red;
    }

    @media (max-width: 700px) {
        display: none;
    }
`;

const Remove = styled.button`
    background-color: white;
    border: none;
    cursor: pointer;
    font-size: 23px;
    color: black;
    margin-right: 30px;

    &:hover{
        color: red;
    }

    @media (min-width: 700px) {
        display: none;
    }
`;

const Column2 = styled.div`
    padding: 23px;
    background-color: ghostwhite;
    width: 20%;
    box-shadow: 1px 3px 2px 1px #969696;
    border-radius: 15px;
    height: fit-content;
    margin-left: 40px;

    @media (max-width: 1050px) {
        margin-top: 33px;
        width: 70%;
        margin: auto;
        margin-top: 40px;
        font-size: 25px;
        padding: 5%;
    }
`;

const Summary = styled.h4`
    margin: 7px 0px 25px 0px;
    font-weight: bold;
    font-size: 25px;

    @media (max-width: 836px) {
        font-size: 30px;
        text-align: center;
    }

    @media (max-width: 430px) {
        font-size: 28px;
        text-align: center;
    }
`;

const PriceInfo = styled.p`
    padding-bottom: 7%;
    font-size: 18px;

    @media (max-width: 836px) {
        font-size: 25px;
    }
`;

const Total = styled.p`
    border-top: 1px solid black;
    padding: 2% 0% 12% 0;
    font-weight: bold;
    font-size: 18px;

    @media (max-width: 836px) {
        font-size: 25px;
    }
`;

const Checkout = styled.button`
    width: 100%;
    color: white;
    background-color: #0c1e4f;
    font-size: 20px;
    padding: 10px 0px;
    cursor: pointer;
    border-radius: 20px;
    box-shadow: none;

    &:hover{
        box-shadow: 2px 2px 5px 1px #969696;
    }

    @media (max-width: 836px) {
        width: 100%;
        font-size: 25px;
    }
`;

const Main = styled.div`
    width: 80%;
    margin: auto;
    padding: 20px;
    text-align: center;
`;

const Img = styled.img`
    width: 40%;
`;

const P = styled.p`
    text-align: center;
    font-size: larger;
    padding: 20px;
    font-family: sans-serif;
`;

const Button = styled.button`
    color: black;
    font-size: large;
    background-color: white;
    padding: 10px 20px;
    cursor: pointer;
    text-align: center;

    &:hover{
        background-color: black;
        color: white;
    }
`;

const ContinueShoppingBtn = styled.button`
    cursor: pointer;
    text-align: center;
    color: black;
    background-color: white;
    font-size: 15px;
    padding: 2% 3%;
    box-shadow: none;
    border-radius: 15px;

    &:hover{
        box-shadow: 2px 2px 5px 1px #969696;
        color: white;
        background-color: black;
    }

    @media (max-width: 700px){
        width: 90%;
        margin: 50px 0% 20px 5%;
        font-size: 20px;
    }
`;

const Span = styled.span`
    margin-left: 35px;
`;

const HeadingFeatured = styled.p`
    padding-top: 20px;
    font-size: 30px;
    background-color: black;
    color: white;
    width: fit-content;
    padding: 10px 25px;
    border-radius: 90px 90px 0px 0px;
`;