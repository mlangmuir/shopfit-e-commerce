import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useContext } from "react";
import LoadingPage from "./LoadingPage";
import { Context } from "./Context";
import styled from "styled-components";
import FeaturedItems from "./FeaturedItems";
import { GiThumbUp } from 'react-icons/gi';

const ItemDetails = () => {

    const { itemId } = useParams();

    const {
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
        setDisplayValue,
        setCompanyNameTab,
        setCategoryTab,
        setDisplayFilters,
        setBodyLocationTab
    } = useContext(Context);

    const navigate = useNavigate();

    // page automatically scrolls to top everytime param changes
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [itemId])

    // sets number of featured items to display
    useEffect(() => {
        setNumFeatured(3);
    }, [numFeatured])

    // fetches specific item based on item id
    useEffect(() => {
        setIsLoading(true)
        fetch(`/items/id/${itemId}`)
            .then((res) => res.json())
            .then((data) => {
                setSpecItem(data.data);
                setIsLoading(false)
            })
    },[itemId]);

    const companyId = specItem?.companyId;

    // fetches specific company based on companyId
    useEffect(() => {
        setIsLoading(true)
        if (companyId !== undefined) {
            fetch(`/company/id/${companyId}`)
                .then((res) => res.json())
                .then((data) => {
                    setSpecCompany(data.data);
                    setIsLoading(false)
                })
        }
    },[companyId]);

    // pushing item into shopping cart
    const handleAddToCart = () => {

        const foundItem = cart.find(item => item._id === specItem._id);

        if (foundItem) {
            const otherItems = cart.filter((item) => {
                return item._id !== specItem._id
            })
            if (foundItem.quantity !== foundItem.numInStock) {
                const newItem = {...foundItem, quantity: foundItem.quantity = foundItem.quantity + 1}
                setCart([...otherItems, newItem]);
            } else {
                alert("Sold out!")
            }
        } else {
            const newItem = {...specItem, quantity: 1}
            setCart(current => [...current, newItem]);
        }
        navigate("/shopping-cart")
        window.scrollTo(0, 0)
    }

    return (
        <>
            {!isLoading ?
                <Wrapper>
                    <Container>
                        <ItemWrapper>
                            <Title>{specItem?.name}</Title>
                            <Price>{specItem?.price}</Price>
                            <Image src={specItem?.imageSrc} />
                        </ItemWrapper>
                        <InfoBox>
                            <InfoLine>
                                <Text>Category: </Text>
                                {specItem?.category.length > 30
                                    ? <Button
                                        onClick={() => {
                                            navigate(`/items?category=${specItem?.category}`);
                                            setCategoryTab(specItem?.category);
                                            setDisplayFilters([specItem?.category]);
                                            setDisplayValue("");
                                            setCompanyNameTab("");
                                            window.location.reload(false);
                                            window.scrollTo(0, 0)
                                        }}
                                    >
                                        {specItem?.category.slice(0,30).trim()}...
                                    </Button>
                                    : <Button
                                        onClick={() => {
                                            navigate(`/items?category=${specItem?.category}`);
                                            setCategoryTab(specItem?.category);
                                            setDisplayFilters([specItem?.category]);
                                            setDisplayValue("");
                                            setCompanyNameTab("");
                                            window.location.reload(false);
                                            window.scrollTo(0, 0)
                                        }}
                                    >
                                        {specItem?.category}
                                    </Button>
                                } 
                            </InfoLine>
                            <InfoLine>
                                <Text>Body Location: </Text>
                                {specItem?.body_location.length > 30
                                    ? <Button
                                        onClick={() => {
                                            navigate(`/items?body_location=${specItem?.body_location}`);
                                            setBodyLocationTab(specItem?.body_location);
                                            setDisplayFilters([specItem?.body_location]);
                                            setDisplayValue("");
                                            setCompanyNameTab("");
                                            window.location.reload(false);
                                            window.scrollTo(0, 0)
                                        }}
                                    >
                                        {specItem?.body_location.slice(0,30).trim()}...
                                    </Button>
                                    : <Button
                                        onClick={() => {
                                            navigate(`/items?body_location=${specItem?.body_location}`);
                                            setBodyLocationTab(specItem?.body_location);
                                            setDisplayFilters([specItem?.body_location]);
                                            setDisplayValue("");
                                            setCompanyNameTab("");
                                            window.location.reload(false);
                                            window.scrollTo(0, 0)
                                        }}
                                    >
                                        {specItem?.body_location}
                                    </Button>
                                }
                            </InfoLine>
                            <InfoLine style={{borderBottom: "1px solid lightgrey"}}>
                                <Text>Seller: </Text>
                                {specCompany?.name.length > 30
                                    ? <Button
                                        onClick={() => {
                                            navigate(`/items?companyId=${specCompany?._id}`);
                                            setCompanyNameTab(specCompany?.name);
                                            setDisplayFilters([specCompany?.name]);
                                            setDisplayValue("")
                                            setCompanyNameTab("");
                                            setCompanyNameTab(specCompany?.name)
                                            window.location.reload(false);
                                            window.scrollTo(0, 0)
                                        }}
                                    >
                                        {specCompany?.name.slice(0,30).trim()}...
                                    </Button>
                                    : <Button
                                        onClick={() => {
                                            navigate(`/items?companyId=${specCompany?._id}`);
                                            setCompanyNameTab(specCompany?.name);
                                            setDisplayFilters([specCompany?.name]);
                                            setDisplayValue("")
                                            setCompanyNameTab("");
                                            setCompanyNameTab(specCompany?.name)
                                            window.location.reload(false);
                                            window.scrollTo(0, 0)
                                        }}
                                    >
                                        {specCompany?.name}
                                    </Button>
                                }
                            </InfoLine>        
                            {specItem?.numInStock !== 0
                                && <>
                                    <InfoLine>
                                        <ShipsFrom>Ships from:</ShipsFrom>
                                        <Country>{specCompany?.country}</Country>
                                    </InfoLine>
                                </>
                            }
                            {specItem?.numInStock >= 4
                                && <InStock>In stock</InStock>
                            }
                            {specItem?.numInStock <= 3 && specItem?.numInStock >= 1
                                && <LowStock>Low stock</LowStock>
                            }
                            {specItem?.numInStock === 0
                                && <OutOfStock>Out of stock</OutOfStock>
                            }
                            {specItem?.numInStock !== 0
                                && <AddToCart onClick={handleAddToCart}>Add to cart</AddToCart>
                            }

                        </InfoBox>
                    </Container>
                    <Featured>
                        <HeadingFeatured>
                            <GiThumbUp size={35} />OTHERS ALSO BOUGHT
                        </HeadingFeatured>
                        <Div>
                            <FeaturedItems />
                        </Div>
                    </Featured>
                </Wrapper>
                : <LoadingPage />
            }
        </>
    )
}

const Wrapper = styled.div`
    padding: 100px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Container = styled.div`
    width: 50%;
    display: flex;
    justify-content: space-between;

    @media (max-width: 1500px) {
        width: 60%;
    }

    @media (max-width: 1000px) {
        flex-direction: column;
        align-items: center;
    }
`;

const ItemWrapper = styled.div`
    width: 50%;

    @media (max-width: 1000px) {
        width: 80%;
    }

    @media (max-width: 600px) {
        width: 95%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

const InfoBox = styled.div`
    padding: 30px;
    width: 325px;
    background-color: #f8f8ff;
    margin-left: 10px;

    @media (max-width: 1000px) {
        width: 80%;
    }

    @media (max-width: 600px) {
        width: 95%;
    }
`;

const Title = styled.h1`
    margin-bottom: 10px;
    font-weight: 700;

    @media (max-width: 600px) {
        text-align: center;
    }
`;

const Price = styled.h2`
    margin-bottom: 30px;
`;

const Image = styled.img`
    height: 200px;
    margin: 10px 0;
`;

const InfoLine = styled.div`
    display: flex;
    justify-content: space-between;

    @media (max-width: 450px) {
        flex-direction: column;
        align-items: center;
    }
`;

const Text = styled.p`
    font-size: 18px;
    margin-bottom: 25px;
    font-weight: 700;

    @media (max-width: 450px) {
        margin-bottom: 5px;
    }
`;

const Button = styled.p`
    text-decoration: none;
    font-size: 18px;
    color: blue;

    :hover {
        cursor: pointer;
    }

    @media (max-width: 450px) {
        margin-bottom: 25px;
    }
`;

const InStock = styled.p`
    color: green;
    font-size: 20px;
    margin-top: 30px;

    @media (max-width: 450px) {
        text-align: center;
    }
`;

const LowStock = styled.p`
    color: orange;
    font-size: 20px;
    margin-top: 30px;

    @media (max-width: 450px) {
        text-align: center;
    }
`;

const OutOfStock = styled.p`
    color: red;
    font-size: 20px;
    margin-top: 30px;

    @media (max-width: 450px) {
        text-align: center;
    }
`;

const ShipsFrom = styled.span`
    font-size: 18px;
    margin-top: 30px;
    font-weight: 700;
`;

const Country = styled.span`
    font-size: 18px;
    margin-top: 30px;

    @media (max-width: 450px) {
        margin-top: 5px;
    }
`;

const AddToCart = styled.button`
    font-size: 24px;
    margin-top: 30px;
    width: 100%;
    height: 45px;
    background-color: #030343;
    color: white;
    border: none;
    border-radius: 8px;
    
    :hover {
        cursor: pointer;
    }
`;

const Featured = styled.div`
    margin-top: 100px;
    width: 50%;

    @media (max-width: 1500px) {
        width: 60%;
    }

    @media (max-width: 1000px) {
        width: 80%;
    }
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

const Div = styled.div`
    border: 1px solid silver;
    padding: 0 5%;
    padding-bottom: 5%;
`;

export default ItemDetails;