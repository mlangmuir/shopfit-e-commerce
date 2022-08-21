import styled from "styled-components";

const PageChanger = ({ page, pageCount, doSearch }) => {

    // getting array of page numbers from page count
    const pages = [...Array(pageCount).keys()].splice(1);
    pages.push(pages.length + 1)

    return (
        <Wrapper>
            {pageCount !== 1 && 
                <>
                    {Number(page) !== 1
                        ? <PrevButton
                            onClick={() => {
                                doSearch({ page: Number(page) - 1 });
                                window.scrollTo(0,0);
                            }}
                        >
                            {"<"}
                        </PrevButton>
                        : <PrevButton
                            disabled
                            style={{opacity: "50%"}}
                        >
                            {"<"}
                        </PrevButton>
                    }
                    {pages.map((item, index) => {
                        return (
                            <PageButton
                                key={index}
                                style={{
                                    fontWeight: (item === Number(page)) ? "700" : "400",
                                    color: (item === Number(page)) ? "blue" : "black",
                                    textDecoration: (item === Number(page)) ? "underline" : "none",
                                    fontSize: (item === Number(page)) && "20px",
                                }}
                                onClick={() => {
                                    doSearch({ page: item });
                                    window.scrollTo(0,0);
                                }}
                            >
                                    {item}
                            </PageButton>
                        )
                    })}
                    <PageLabel>Page {page} of {pageCount}</PageLabel>
                    { Number(page) < pageCount
                        ? <NextButton
                            onClick={() => {
                                doSearch({ page: Number(page) + 1 });
                                window.scrollTo(0,0);
                            }}
                        >
                            {">"}
                        </NextButton>
                        : <NextButton
                            disabled
                            style={{opacity: "50%"}}
                        >
                            {">"}
                        </NextButton>
                    }
                </>
            }
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const PrevButton = styled.button`
    color: white;
    width: 25px;
    font-size: 20px;
    border: none;
    border-radius: 4px;
    margin-right: 5px;

    :hover {
        cursor: pointer
    }
`;

const PageButton = styled.button`
    background-color: white;
    border: none;
    padding: 8px;
    font-size: 20px;
    border-radius: 20px;

    :hover {
        cursor: pointer;
    }

    @media (max-width: 1200px) {
        padding: 5px;
    }

    @media (max-width: 700px) {
        display: none;
    }
`;

const PageLabel = styled.p`
    display: none;

    @media (max-width: 700px) {
        display: block;
    }
`;

const NextButton = styled.button`
    color: white;
    width: 25px;
    font-size: 20px;
    border: none;
    border-radius: 4px;
    margin-left: 5px;

    :hover {
        cursor: pointer
    }
`;

export default PageChanger;