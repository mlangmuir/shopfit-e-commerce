import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useContext, useCallback } from "react";
import styled from "styled-components";
import { Context } from "../Context";
import LoadingPage from "../LoadingPage";
import Filters from "./Filters";
import Grid from "./Grid";

const ListingPage = () => {

    const { isLoading, setIsLoading, displayFilters, categories, setCategories, bodyLocations, setBodyLocations } = useContext(Context);

    const [results, setResults] = useState([]);
    const [page, setPage] = useState(0);
    const [itemCount, setItemCount] = useState(0);
    const [pageCount, setPageCount] = useState(0);

    const navigate = useNavigate();

    // defining URLSearchParams based on sorting type and direction and 4 different filtering methods
    const search = useLocation().search;
    const name = new URLSearchParams(search).get("name") || '';
    const sortKey = new URLSearchParams(search).get("sortKey") || 'sortName';
    const sortDirection = new URLSearchParams(search).get("sortDirection") || '1';
    const sortSelected = `${sortKey}|${sortDirection}`;

    const [numInStock, setNumInStock] = useState(new URLSearchParams(search).get("numInStock") || '0');
    const [price, setPrice] = useState(new URLSearchParams(search).getAll("price") || []);
    const [category, setCategory] = useState(new URLSearchParams(search).getAll("category") || []);
    const [body_location, setBodyLocation] = useState(new URLSearchParams(search).getAll("body_location") || []);
    const [companyId, setCompanyId] = useState(new URLSearchParams(search).getAll("companyId") || []);

    // callback that overwrites query params
    const getQueryParams = useCallback((overwrites={})=>{
        const {
            sortKey = null,
            sortDirection = null,
            numInStock = null,
            price = null,
            category = null,
            body_location = null,
            companyId = null,
            page = null,
            name = null
        } = overwrites;
        
        const searchParams = new URLSearchParams(search);

        // default values for query params
        const params = [
            { key: 'name', value: name || searchParams.get("name") || ''},
            { key: 'sortKey', value: sortKey || searchParams.get("sortKey") || 'sortName'},
            { key: 'sortDirection', value: sortDirection || searchParams.get("sortDirection") || '1'},
            { key: 'numInStock', value: numInStock || searchParams.get("numInStock") || '0'},
            { key: 'price', value: price || searchParams.getAll("price") || []},
            { key: 'category', value: category || searchParams.getAll("category") || []},
            { key: 'body_location', value: body_location || searchParams.getAll("body_location") || []},
            { key: 'companyId', value: companyId || searchParams.getAll("companyId") || []},
            { key: 'page', value: page || searchParams.get("page") || '1'},
        ]

        // takes params array and modifies it into a param-friendly string
        const paramsStr = params.map(entry=>{
            if (Array.isArray(entry.value)) {
                return entry.value.map(item=>`${entry.key}=${item}`).join('&');
            }
            return `${entry.key}=${entry.value}`;
        })
        .filter(str => !!str)
        .join('&');
        return paramsStr;
    },[search])

    // fetches data necessary for filtering based on the search URL params defined above
    useEffect(() => {
        setIsLoading(true);
        fetch(`/items?${search.substring(1)}`)
            .then((res) => res.json())
            .then((data) => {
                setResults(data.data)
                setItemCount(data.itemCount);
                setPageCount(data.pageCount);
                setPage(data.page);
                setCategories(data.categories);
                setBodyLocations(data.bodyLocations);
                setIsLoading(false);
            })
    },[sortKey, setIsLoading, search]);

    // on select of dropdown sort menu, the value is split into sortName and sortDirection to be used as params
    const handleOnChange = (e) => {
        const [sortKey, sortDirection] = e.target.value.split('|');
        doSearch({sortKey,sortDirection});
        window.scrollTo(0, 0);
    }

    // function overwrites existing query params on callback
    const doSearch = (overwrites={})=>{
        const search = getQueryParams(overwrites);
        navigate(`/items?${search}`);
    }

    // concatenating all filter arrays/variables to display all applied filters at top of page
    const filtersConcat = category.concat(body_location, price, numInStock)

    // using the variables used in params to create a "Showing results by: <category>" label at top of listing page
    let filtersLabel = [];

    filtersConcat.map((item) => {
        if (item === "1") {
            filtersLabel.push("In stock");
        } else if (item === "25") {
            filtersLabel.push("Under $25");
        } else if (item === "25-50") {
            filtersLabel.push("$25-$50");
        } else if (item === "50-100") {
            filtersLabel.push("$50-100");
        } else if (item === "100-200") {
            filtersLabel.push("$100-$200");
        } else if (item === "200-300") {
            filtersLabel.push("$200-$300");
        } else if (item === "300") {
            filtersLabel.push("$300+");
        } else if (item !== "0") {
            filtersLabel.push(item);
        }
    })

    // dividing total item count by items per page to get total # of pages
    const totalPages = Math.ceil(itemCount / 15);

    return (
        <>
            {!isLoading
                ? <Wrapper>
                    <Container>
                        <TitleTextDiv>
                            <div>
                                <ShowResultsFor>Showing results for: </ShowResultsFor>
                                {/* {displayValue
                                    ? <FiltersAppliedDiv>
                                        <div>
                                            <FiltersApplied>{displayValue}</FiltersApplied>
                                        </div> */}
                                    {/* </FiltersAppliedDiv> */}
                                    <FiltersAppliedDiv>
                                        {displayFilters.slice(0,5).map((item, index) => {
                                            return (
                                                <div key={index}>
                                                    {index === 4
                                                        ? <FiltersApplied>{item}...</FiltersApplied>
                                                        : <FiltersApplied>{item}</FiltersApplied>
                                                    }
                                                    {index !== displayFilters.length - 1 && index !== 4
                                                        && <FiltersApplied>,&nbsp;</FiltersApplied>
                                                    }
                                                </div>
                                            )
                                        })}
                                    </FiltersAppliedDiv>
                                {/* }    */}
                                {itemCount === 348
                                    && <FiltersAppliedDiv>
                                        <div>
                                            <FiltersApplied>All products</FiltersApplied>
                                        </div>
                                    </FiltersAppliedDiv>
                                }

                                {itemCount !== 0 && <ResultInfo>Showing {results?.length} of {itemCount} results</ResultInfo>}
                                {totalPages !== 0 && <ResultInfo>Page {page} of {totalPages}</ResultInfo>}
                            </div>
                            <SelectDiv>
                                <SelectLabel>List by:</SelectLabel>
                                <Select onChange={handleOnChange} defaultValue={sortSelected}>
                                    <option value="sortName|1" >Name - ascending</option>
                                    <option value="sortName|-1">Name - descending</option>
                                    <option value="sortPrice|1">Price Low to High</option>
                                    <option value="sortPrice|-1">Price High to Low</option>
                                </Select>
                            </SelectDiv>
                        </TitleTextDiv>
                        <BodyWrapper>
                            <Filters
                                results={results}
                                categories={categories}
                                bodyLocations={bodyLocations}
                                companyId={companyId}
                                setCompanyId={setCompanyId}
                                doSearch={doSearch}
                                numInStock={numInStock}
                                price={price}
                                category={category}
                                body_location={body_location}
                                setNumInStock={setNumInStock}
                                setPrice={setPrice}
                                setCategory={setCategory}
                                setBodyLocation={setBodyLocation}
                                filtersLabel={filtersLabel}
                                page={page}
                                name={name}
                            />
                            <Grid
                                results={results}
                                page={page}
                                pageCount={pageCount}
                                itemCount={itemCount}
                                doSearch={doSearch}
                            />
                        </BodyWrapper>
                    </Container>
                </Wrapper>
                : <LoadingPage />
            }
        </>
    )
}

const Wrapper = styled.div`
    width: 100%;
    padding: 75px 0;
    display: flex;
    justify-content: center;

    @media (max-width: 1010px) {
        flex-direction: column;
        align-items: center;
    }
`;

const Container = styled.div`
    width: 1200px;

    @media (max-width: 1200px) {
        width: 90%;
    }

    @media (max-width: 800px) {
        width: 100%;
    }
`;

const TitleTextDiv = styled.div`
    margin-bottom: 50px;
    display: flex;
    justify-content: space-between;

    @media (max-width: 950px) {
        flex-direction: column;
        align-items: center;
    }
`;

const ShowResultsFor = styled.h1`
    font-size: 16px;

    @media (max-width: 950px) {
        text-align: center;
    }

    @media (max-width: 500px) {
        font-size: 14px;
    }
`;

const FiltersAppliedDiv = styled.div`
    display: flex;
    margin-top: 10px;

    @media (max-width: 950px) {
        width: 100%;
        justify-content: center;
        font-size: 20px;
    }

    @media (max-width: 500px) {
        font-size: 12px;
    }
`;

const FiltersApplied = styled.span`
    font-weight: 700;
    font-weight: 700;
    font-size: 28px;
    width: 1000px;

    @media (max-width: 1250px) {
        font-size: 20px;
    }

    @media (max-width: 1100px) {
        font-size: 18px;
    }

    @media (max-width: 600px) {
        font-size: 16px;
    }
`;

const ResultInfo = styled.p`
    font-size: 16px;
    margin-top: 15px;

    @media (max-width: 950px) {
        text-align: center;
    }
`;

const SelectDiv = styled.div`
    display: flex;
    align-items: center;

    @media (max-width: 950px) {
        margin-top: 30px;
    }
`;

const SelectLabel = styled.label`
    font-size: 20px;
    margin-right: 15px;
    font-weight: 700;
`;

const Select = styled.select`
    height: 50%;
    font-size: 18px;

    :hover {
        cursor: pointer;
    }
`;

const BodyWrapper = styled.div`
    display: flex;

    @media (max-width: 950px) {
        flex-direction: column;
        align-items: center;
    }
`;

export default ListingPage;