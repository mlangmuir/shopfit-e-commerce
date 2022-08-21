import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Context } from "./Context";

const Footer = () => {

    const { isLoading, setCategoryTab, setDisplayFilters, setBodyLocationTab, setCompanyNameTab, setDisplayValue } = useContext(Context);

    const navigate = useNavigate();

    // creating array of most well-known brands to be featured in footer
    const topSellers = [
        {
            "name": "Nike",
            "_id": "11939"
        },
        {
            "name": "Skechers",
            "_id": "15211"
        },
        {
            "name": "Sony",
            "_id": "12407"
        },
        {
            "name": "Samsung",
            "_id": "18432"
        },
        {
            "name": "Motorola",
            "_id": "16542"
        }
    ]

    // categories and body location array footer listings
    const categories = ["Fitness", "Medical", "Lifestyle", "Entertainment", "Industrial", "Pets and Animals", "Gaming"];
    const bodyLocations = ["Arms", "Chest", "Feet", "Hands", "Head", "Neck", "Torso", "Waist", "Wrist"];

    return (
        <>
            {!isLoading ?
                <Wrapper>
                    <ListsWrapper>
                        <Container>
                            <Title>CATEGORIES</Title>
                                {categories.map((item, index) => {
                                    return (
                                        <Item
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
                                        </Item>
                                    )
                                })}
                        </Container>
                        <Container>
                            <Title>BODY LOCATION</Title>
                            {bodyLocations.map((item, index) => {
                                return (
                                    <Item
                                        key={index}
                                        onClick={ () => {
                                            navigate(`/items?body_location=${item}`);
                                            setBodyLocationTab(item);
                                            setDisplayFilters([item]);
                                            setDisplayValue("");
                                            setCompanyNameTab("");
                                            window.location.reload(false);
                                            window.scrollTo(0, 0)
                                        }}
                                    >
                                        {item}
                                    </Item>
                                )
                            })}
                        </Container>
                        <Container>
                            <Title>TOP BRANDS</Title>
                            {topSellers.map((item, index) => {
                                return (
                                    <Item
                                        key={index}
                                        onClick={ () => {
                                            navigate(`/items?companyId=${item?._id}`);
                                            setCompanyNameTab(item.name);
                                            setDisplayFilters([item.name]);
                                            setDisplayValue("")
                                            setCompanyNameTab(item.name)
                                            window.location.reload(false);
                                            window.scrollTo(0, 0)
                                        }}>
                                            {item?.name}
                                    </Item>
                                )
                            })}
                        </Container>
                        <Container>
                            <Title>CUSTOMER SERVICE</Title>
                            <p>support@shopfit.ca</p>
                            <p>1-800-SHOPFIT</p>
                        </Container>
                    </ListsWrapper>
                    <Copyright>© 2022 SHOPFIT. All rights reserved.</Copyright>
                </Wrapper>
                : null 
            }
        </>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: black;
    width: 100vw;
    height: 400px;
    bottom: 0;

    @media (max-width: 757px) {
        height: 550px;
    }

    @media (max-width: 525px) {
        height: 650px;
    }

    @media (max-width: 393px) {
        height: 750px;
    }

    @media (max-width: 359px) {
        height: 950px;
    }
`;

const ListsWrapper = styled.div`
    display: flex;
    justify-content: space-evenly;

    @media (max-width: 775px) {
        flex-wrap: wrap;
    }
`;

const Container = styled.div`
    color: white;
    line-height: 25px;
    font-size: 18px;
    margin: 20px;

    @media (max-width: 600px) {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

const Title = styled.h3`
    font-weight: 700;
`;

const Item = styled.p`
    line-height: 25px;
    font-size: 18px;

    :hover {
        cursor: pointer;
    }
`;

const Copyright = styled.p`
    color: white;
    text-align: center;
    margin-top: 40px;
`;

export default Footer;