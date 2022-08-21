import { useNavigate } from "react-router-dom"
import { useContext } from "react";
import { Context } from "../Context";
import styled from "styled-components";
import PageChanger from "./PageChanger";
import noResults from "../../assets/no-result.gif";

const Grid = ({ results, page, pageCount, doSearch, itemCount }) => {

    const navigate = useNavigate();

    const { setIsLoading } = useContext(Context);

    return (
        <div>
        {results.length === 0
            ? <NoResultsWrapper>
                <NoResults>
                    <Gif src={noResults} alt="Sorry! No result found..." />
                    <NoResultsText>Sorry, we couldn't find what you were looking for...</NoResultsText>
                </NoResults>
            </NoResultsWrapper>
            : <>
                <GridContainer>
                    {results?.map((item, index) => {
                        return (
                            <ItemWrapper
                                key={index}
                                onClick={ () => {
                                    setIsLoading(true)
                                    navigate(`/id/${item._id}`)
                                }}
                            >
                                <Image src={item?.imageSrc} />
                                {item?.name.length > 55
                                    ? <ItemTitle>{item?.name.slice(0,55).trim()}...</ItemTitle>
                                    : <ItemTitle>{item?.name}</ItemTitle>
                                }
                                <Price>{item?.price}</Price>
                            </ItemWrapper>
                        )
                    })}
                </GridContainer>
                <PageChanger page={page} pageCount={pageCount} itemCount={itemCount} doSearch={doSearch}/>
            </>
            }
        </div>
    )
}

const GridContainer = styled.div`
    width: 825px;
    display: flex;
    flex-wrap: wrap;
    margin-left: 30px;

    @media (max-width: 1200px) {
        width: 650px;
    }

    @media (max-width: 1100px) {
        width: 500px;
    }

    @media (max-width: 900px) {
        width: 400px;
    }

    @media (max-width: 900px) {
        width: 90%;
    }
`;

const ItemWrapper = styled.div`
    width: 27%;
    padding: 10px;
    padding-bottom: 50px;
    margin-bottom: 30px;
    margin-left: 30px;
    border: 1px solid white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    :hover {
        cursor: pointer;
        border: 1px solid lightgrey;
    }

    @media (max-width: 1250px) {
        width: 30%;
        margin-left: 70px;
    }

    @media (max-width: 1000px) {
        width: 30%;
    }

    @media (max-width: 900px) {
        width: 80%;
        margin-left: 0;
    }

`;

const Image = styled.img`
    height: 100px;
`;

const ItemTitle = styled.h1`
    margin-bottom: 10px;
    font-size: 22px;
    text-align: center;
    margin: 25px 0;
`;

const Price = styled.h2`
    margin-bottom: 30px;
    font-size: 22px;
`;

const NoResultsWrapper = styled.div`
    width: 825px;
    display: grid;
    justify-content: center;
    margin-left: 30px;

    @media (max-width: 1200px) {
        width: 600px;
    }

    @media (max-width: 1100px) {
        width: 500px;
    }

    @media (max-width: 900px) {
        width: 350px;
    }

`;

const NoResults = styled.div`
    width: 100%;

    @media (max-width: 500px) {
        width: 80%;
    }
`;

const Gif = styled.img`
    height: 420px;

    @media (max-width: 900px) {
        height: 300px;
    }

    @media (max-width: 500px) {
        height: 220px;
    }
`;

const NoResultsText = styled.p`
    text-align: center;
    font-size: 24px;

    @media (max-width: 900px) {
        font-size: 20px;
    }
`;

export default Grid;