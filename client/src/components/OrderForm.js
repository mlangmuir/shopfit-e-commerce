import {useEffect, useState, useContext} from "react";
import styled from "styled-components";
import { Context } from "./Context";
import { SiShopify } from 'react-icons/si';
import LoadingPage from "./LoadingPage";
import  {useNavigate} from 'react-router-dom';
import moment from 'moment';

// declare orderForm function
const OrderForm = () => {
    const { cart, setCart, isLoading } = useContext(Context);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [country, setCountry] = useState('')
    const [postal, setPostal] = useState("")
    const [nameOnCard, setNameOnCard] = useState("")
    const [expiry, setExpiry] = useState("")
    const [cardNumber, setCardNumber] = useState("")
    const [ccv, setCcv] = useState("")
    const [subtotal, setSubtotal] = useState(0)
    const [errorMessage, setErrorMessage] = useState("")
    // const [orderInformation, setOrderInformation] = useState(null)
    const navigate = useNavigate()

    // declare orderItems variable and assign empty array
    let orderItems = [];

    // loop over cart items and add item and quantity to orderItems array
    cart.forEach(item => {
        orderItems.push({"itemName":item.name, "quantity":item.quantity})
    });

    // declare orderInfo variable and assign empty object
    let orderInfo = {}

    // declare handleConfirm function
    const handleConfirm = (e) => {
        const isExpiryValid = moment(expiry, "MMYY").fromNow();
        e.preventDefault();

        // check if all the form fields are not empty
        if(
            firstName !== "" &&
            lastName !== "" &&
            address !== "" &&
            city !== "" &&
            country !== "" &&
            postal !== "" &&
            email !== "" &&
            cardNumber !== "" &&
            nameOnCard !== "" && ccv !== "" &&
            !isExpiryValid.includes("ago")
        ){

            // set errorMessage to empty string
            setErrorMessage("")

            // assign customer and order information to orderInfo object
            orderInfo = {
                "order": orderItems,"givenName": firstName, "surname": lastName,
                "email": email, "phone": phone, "address": address,"city": city,
                "country": country,"postal": postal,"cardNumber": cardNumber,
                "nameOnCard": nameOnCard,"expiry": expiry,"ccv": ccv
            }
        
            // redirect to confirmation component
            navigate("/confirmation")
            window.location.reload(false);

        //set error message to errorMessage state
        }else{
            setErrorMessage("> Invalid Expiry")
        }

        //fetch call to post order and customer information
        fetch("/order", {
            method: "POST",
            headers: {"Accept": "application/json","Content-Type": "application/json"},
            body: JSON.stringify(orderInfo),
        }).then(res =>  res.json())
        .catch(e => {
            console.log("error", e);
        });

        // set cart to empty array
        setCart([])
    }
    
    useEffect(() => {
        // declare getSubtotal variable and assign 0
        let getSubtotal = 0;
        
        // loop over cart items and calclute subTotal and set to subTotal state
        for (let i=0; i<cart.length; i++) {
            const getPrice = (cart[i].price).substring(1)
            getSubtotal += Number(getPrice)*cart[i]?.quantity
            setSubtotal(getSubtotal)
        }
    })

    return (
        <>
        {!isLoading ? 
        
        <Wrapper>
            <Main>
                <H2>Shipping Information:</H2>
                <form onSubmit={handleConfirm}>
                <Form>
                <div>
                    <Label>First Name</Label><br/>
                    <Input onChange={(e) => setFirstName(e.target.value)} type="text" placeholder="First Name" required maxlength="30"/><br/>
                    <Label>Email</Label><br/>
                    <Input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" required maxlength="30"/><br/>
                    <Label>Address</Label><br/>
                    <Input onChange={(e) => setAddress(e.target.value)} type="text" placeholder="Address" required maxlength="30"/><br/>
                    <Label>Country</Label><br />
                    <Input onChange={(e) => setCountry(e.target.value)} placeholder="Country" type="text" required maxlength="30"/><br/>
                </div>
                <div>
                    <Label>Last Name</Label><br/>
                    <Input onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" type="text" required maxlength="30"/><br/>
                    <Label>Phone</Label><br/>
                    <Input onChange={(e) => setPhone(e.target.value)} name="city" type="tel" placeholder="+1 (123) 456-7890" pattern="[+1] [(0-9)]){3} [0-9]{3}-[0-9]{4}" required /><br/>
                    <Label>City</Label><br />
                    <Input onChange={(e) => setCity(e.target.value)} name="text" type="text" placeholder="City" required maxlength="30"/><br/>
                    <Label>Postal</Label><br />
                    <Input onChange={(e) => setPostal(e.target.value)} name="text" placeholder="Postal" type="text" required maxlength="30"/><br/>
                </div>
            </Form>
            <Payment>Payment:</Payment>
                <Form>
                <div>
                    <Label>Name On Card</Label><br/>
                    <Input onChange={(e) => setNameOnCard(e.target.value)} 
                    type="text" 
                    size="40"
                    placeholder="Name On Card" required maxlength="30"/><br/>
                    <Label>Expiry</Label><br/>
                    <Input onChange={(e) => setExpiry(e.target.value)} 
                    size="5" 
                    autocomplete="cc-number"
                    pattern="[0-9]{2}/[0-9]{2}"
                    type="tel" 
                    placeholder="01/23" required/><br/>
                </div>
                <div>
                <Label>Card Number</Label><br/>
                    <Input onChange={(e) => setCardNumber(e.target.value)} type="tel" 
                    inputmode="numeric" 
                    pattern="[0-9\s]{13,19}" 
                    autocomplete="cc-number" 
                    maxlength="19" 
                    placeholder="1111 1111 1111 1111" required/><br/>
                    <Label>CCV</Label><br />
                    <Input onChange={(e) => setCcv(e.target.value)} 
                    size="2"
                    placeholder="123" 
                    autocomplete="cc-number"
                    pattern="[0-9]{3}"
                    type="tel" required /><br/>
                </div>
            </Form>
        <Confirm type="submit">Place Order</Confirm>
        {errorMessage !== "" && <p style={{color: "red", paddingTop: "9%"}}>{errorMessage}</p>}
        </form>
        </Main>
        <Column2>
            <Summary><SiShopify size={20}/>Order Summary</Summary>
            <OrderInfo>${(subtotal).toFixed(2)}</OrderInfo>
            <PriceInfo>Subtotal:</PriceInfo>
            <OrderInfo>$7.00</OrderInfo>
            <PriceInfo>Shipping:</PriceInfo>
            <OrderInfo>${(subtotal*0.12).toFixed(2)}</OrderInfo>
            <PriceInfo>Taxes:</PriceInfo>
            <OrderInfos>${(subtotal+7).toFixed(2)}</OrderInfos>
            <Total>Total:</Total>
        </Column2>
        </Wrapper>
        :<LoadingPage/>}
    </>
    )
}

const Wrapper = styled.div`
    display: flex;
    margin: 5%;

    @media (max-width: 900px) {
        display: block;
    }
`;

const Main = styled.div`
    width: 60%;
    margin: auto;
    padding: 30px;
    border: 1px solid silver;
    border-radius: 10px;
    background-color: white;


    @media (max-width: 900px) {
        width: 90%;
        margin: auto;
    }
`;

const H2 = styled.h2`
    padding-bottom: 35px;
    font-weight: bold;

    @media (max-width: 836px) {
        text-align: center;
    }
    `
    const Payment = styled.h2`
    padding-bottom: 25px;
    padding-top: 30px;
    font-weight: bold;

    @media (max-width: 836px) {
        text-align: center;
    }
`;

const Form = styled.div`
    display: grid;
    grid-template-columns: 43% 43%;
    column-gap: 9%;

    @media (max-width: 480px) {
        grid-template-columns: 95%;
        column-gap: 10%;
    }
`;

const Label = styled.label`
    font-family: sans-serif;
    font-size: larger;

    @media (max-width: 480px) {
        font-size: 20px;
    }
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin: 3px 0px 10px 0px;

    @media (max-width: 480px) {
        padding: 12px;
        border: 1px solid grey;
    }
`;

const Confirm = styled.button`
    color: white;
    border-radius: 5px;
    width: 100%;
    padding: 10px 0px;
    margin-top: 30px;
    font-size: large;
    cursor: pointer;

    @media (max-width: 480px) {
        font-size: 20px;
    }
`;

const Column2 = styled.div`
    padding: 25px;
    background-color: ghostwhite;
    width: 20%;
    height: fit-content;
    box-shadow: 1px 3px 1px 1px #969696;
    border-radius: 15px;

    @media (max-width: 900px) {
        width: 80%;
        margin: auto;
        margin-top: 40px;
        font-size: 25px;
    }

    @media (max-width: 480px) {
        width: 90%;
        margin: auto;
        margin-top: 40px;
    }
`;

const OrderInfo = styled.span`
    float: right;
`;

const OrderInfos = styled.span`
    float: right;
    margin-top: 5px;
`;

const Summary = styled.h4`
    margin: 7px 0px 25px 0px;
    font-size: larger;
    font-weight: bold;

    @media (max-width: 900px) {
        font-size: 25px;
        text-align: center;
    }
`;

const PriceInfo = styled.p`
    padding-bottom: 7%;
`;

const Total = styled.p`
    border-top: 1px solid black;
    padding: 2% 0% 12% 0;
    font-weight: bold;
`;

export default OrderForm;