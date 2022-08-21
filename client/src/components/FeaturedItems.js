import { useContext } from "react";
import { Context } from "./Context";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const FeaturedItems = () => {

    const { items, specItem, numFeatured, setIsLoading, isLoading } = useContext(Context);

    const navigate = useNavigate();
    
    //creating an array of random items to be featured
    let assortedItems = [];
    let featuredItems = [];
    
    for (let i = 0; i < items.length ; i++) {
        if (items[i]?._id !== specItem?._id) {
            assortedItems.push(items[i]);
        }
    }

    let randomItem;
    
    for (let i = 0; i < numFeatured ; i++) {
        randomItem = assortedItems[Math.floor(Math.random() * assortedItems.length)]
        if (!featuredItems.includes(randomItem)) {
            featuredItems.push(randomItem);
        }
    }
    
    return (
        <>
            {!isLoading 
                && <ItemsWrapper>
                    {featuredItems.map((item, index) => {
                        return (
                            <div key={index}>
                                <ItemContainer
                                    onClick={ () => {
                                        setIsLoading(true)
                                        navigate(`/id/${item._id}`)
                                    }}
                                >
                                    <ItemPhoto src={item?.imageSrc} />
                                    {item?.name.length > 55
                                        ? <ItemName>{item?.name.slice(0,55).trim()}...</ItemName>
                                        : <ItemName>{item?.name}</ItemName>
                                    }
                                    <ItemPrice>{item?.price}</ItemPrice>
                                </ItemContainer>
                            </div>
                        )
                    })}
                </ItemsWrapper>
            }
        </>
    )
}


const ItemsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    @media (max-width: 836px) {
        justify-content: center;
    }
`;

const ItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 200px;
    font-size: 20px;
    margin-top: 60px;
    border: 1px solid white;
    padding: 10px;

    :hover {
        cursor: pointer;
        border: 1px solid lightgrey;
    }

    @media (max-width: 1700px) {
        width: 200px;
    }

    @media (max-width: 1200px) {
        width: 250px;
    }
`;

const ItemPhoto = styled.img`
    height: 100px;
`;

const ItemName = styled.p`
    margin-top: 30px;
    height: 75px;
    text-align: center;
    line-height: 22px;
`;

const ItemPrice = styled.p`
    margin-top: 20px;
`;

export default FeaturedItems;