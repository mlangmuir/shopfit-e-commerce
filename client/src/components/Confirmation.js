import {useContext, useState, useEffect} from "react";
import styled from "styled-components";
import { Context } from "./Context";
import  {useNavigate} from 'react-router-dom';
import { BsFillBagCheckFill } from 'react-icons/bs';
import { GiThumbUp } from 'react-icons/gi';
import LoadingPage from "./LoadingPage";
import FeaturedItems from "./FeaturedItems";

// declare confirmation function
const Confirmation = () => {
    
    const { isLoading, setIsLoading, numFeatured, setNumFeatured } = useContext(Context);
    const [orders, setOrders] = useState(null);
    const navigate = useNavigate()

    // declare handleClick function which redirect user to homepage
    const handleClick = () => {
        navigate("/");
    }


    // get four featured items and store in numFeatured
    useEffect(() => {
        setNumFeatured(4);
    }, [numFeatured])

    // fetch call to get orders and store them in orders state and set isLoading to false
    useEffect(() => {
        setIsLoading(true)
        fetch("/orders")
            .then((res) => res.json())
            .then((data) => {
                setOrders(data.data);
                setIsLoading(false)
            })
    },[]);

    return (
        <>
        {!isLoading && orders !== null?
            <>
                <Main>
                    <Wrapper>
                        {(orders.length > 0) && <Name>{`Hey, ${orders[orders.length-1]?.givenName}`}</Name>}
                            <Confirmed>{`Your order is confirmed!`}</Confirmed>
                            <div><BsFillBagCheckFill size={60}/></div>
                            <H2>Thank you for your purchase!</H2>
                            <P>
                                You will receive an order confirmation
                                email with details of you order.
                            </P>
                        <Confirm onClick={handleClick}>Continue Shopping</Confirm>
                    </Wrapper>
                    
                    <Detail>
                        {(orders.length > 1) &&
                            <>
                                <Heading>YOUR ORDER</Heading>
                        
                                {orders[orders.length-1]?.order.map((order, index) => {
                                    return (
                                        <Order key={index}>
                                            <OrderInfo><i>Item:</i> {order?.itemName}</OrderInfo>
                                            <OrderInfos><i>Quantity:</i> {order?.quantity}</OrderInfos>
                                        </Order>
                                    )
                                })}
                            </>}
                    </Detail>
                    
                    </Main>
                    <Featured>
                        <HeadingFeatured>
                            <GiThumbUp size={35} />
                            TRENDING NOW
                        </HeadingFeatured>
                        <Div>
                            <FeaturedItems />
                        </Div>
                    </Featured>

            </>
        : <LoadingPage/>}
        </>
    )
}

export default Confirmation;

const Main = styled.div`
    width: 70%;
    margin: auto;
    text-align: center;
    padding: 5% 0%;

@media (max-width: 836px) {
    width: 90%;
}
`

const Heading = styled.h3`
    margin: 4% 3% 2% 3%;
    padding: 2% 0%;
    font-weight: bold;
    border-bottom: 1px solid silver;

@media (max-width: 836px) {
    text-align: center;
}

@media (max-width: 480px) {
    text-align: center;
}
`

const Detail = styled.div`
    text-align: left;
    box-shadow: 1px 1px 10px 1px #969696;
    border-radius: 5px;
    background-color: white;
    height: fit-content;
    padding-bottom: 2%;

@media (max-width: 836px) {
    margin-top: 40px;
    margin-bottom: 40px;
}

@media (max-width: 480px) {
    margin-top: 40px;
    margin-bottom: 40px;
}
`

const Order = styled.div`
    margin: 3% 3% 1% 3%;
    margin-bottom: 10px;
    padding: 2%;
    background-color: ghostwhite;
    border-radius: 5%;
    border: 1px dotted silver;
`

const Wrapper = styled.div`
    box-shadow: 1px 1px 10px 1px #969696;
    border-radius: 5px;
    padding: 3%;
`

const Confirmed = styled.h2`
    padding: 35px 0px;
    font-style: italic;
    font-size: 40px;
`

const H2 = styled.p`
    padding-top: 20px;
    font-size: 20px;
`

const OrderInfo = styled.p`
    font-size: 20px;
`

const OrderInfos = styled.p`
    padding-top: 20px;
    font-size: 20px;
`

const HeadingFeatured = styled.p`
    padding-top: 20px;
    font-size: 30px;
    background-color: black;
    color: white;
    width: fit-content;
    padding: 10px 25px;
    border-radius: 90px 90px 0px 0px;

    @media (max-width: 836px) {
        font-size: 25px;
    }

    @media (max-width: 480px) {
        font-size: 30px;
    }
`

const Name = styled.h3`
    padding-top: 20px;
    font-size: 20px;
`

const P = styled.p`
    padding-top: 20px;
    font-size: 20px;
`

const Confirm = styled.button`
    width: 25%;
    margin-top: 40px;
    padding: 10px 0px;
    font-size: 90%;
    cursor: pointer;
    border-radius: 5px;
    color: white;

@media (max-width: 836px) {
    width: 35%;
}

@media (max-width: 480px) {
    width: 50%;
}
`

const Featured = styled.div`
    margin: 20px 70px 60px 70px;

    @media (max-width: 836px) {
        margin: auto;
        width: 90%;
        padding-bottom: 40px;
    }

    @media (max-width: 480px) {
        margin: auto;
        width: 90%;
        padding-bottom: 40px;
    }
`

const Div = styled.div`
    border: 1px solid silver;
`