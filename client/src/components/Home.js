import styled from "styled-components";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "./Context";
import LoadingPage from "./LoadingPage";
import FeaturedItems from "./FeaturedItems";
import banner from "../assets/banner.png";
import nikeLogo from "../assets/nike-logo.png";
import skechersLogo from "../assets/skechers-logo.png";
import sonyLogo from "../assets/sony-logo.png";
import samsungLogo from "../assets/samsung-logo.png";
import motorolaLogo from "../assets/motorola-logo.png";
import stayActiveAd from "../assets/stay-active-shop-fit.png";
import getGadgetsAd from "../assets/get-gadgets.png";
import samsungAd from "../assets/samsung-ad.png";

const Home = () => {

    const { numFeatured, setNumFeatured, isLoading, setIsLoading, setDisplayValue, setDisplayFilters, setCompanyNameTab } = useContext(Context);

    const navigate = useNavigate();

    // sets number of featured items to display
    useEffect(() => {
        setNumFeatured(5);
    }, [numFeatured])

    return (
        <>
            {!isLoading ? 
                <div>
                    <Banner
                        src={banner}
                        onClick={ () => {
                            setIsLoading(true)
                            navigate("/items?name=Fitness%20Watch")
                            setDisplayValue("Fitness Watch")
                            setDisplayFilters(["Fitness Watch"]);
                            setCompanyNameTab("");
                            window.scrollTo(0, 0)
                        }}
                    />
                    <FeaturedWrapper>
                        <FeaturedTitle>Featured Products:</FeaturedTitle>
                        <FeaturedItems />
                        <AdsWrapper>
                            <Ad
                                src={stayActiveAd}
                                alt="Stay Active Shop Fit Website Ad"
                            />
                            <SamsungAd
                                src={samsungAd}
                                alt="Samsung Galaxy Smartwatch Website Ad"
                                onClick={ () => {
                                    setIsLoading(true)
                                    navigate("/id/6583")
                                    window.scrollTo(0, 0)
                                }}
                            />
                            <Ad
                                src={getGadgetsAd}
                                alt="Get The Gadgets You Need Website Ad"
                            />
                        </AdsWrapper>
                        <BrandsTitle>Top Brands:</BrandsTitle>
                        <BrandsWrapper>
                            <Brand
                                src={nikeLogo}
                                onClick={ () => {
                                    setIsLoading(true)
                                    setDisplayValue("Nike");
                                    setDisplayFilters(["Nike"]);
                                    navigate("/items?companyId=11939")
                                    window.scrollTo(0, 0)
                                }}/>
                            <Brand
                                src={skechersLogo}
                                onClick={ () => {
                                    setIsLoading(true)
                                    setDisplayValue("Skechers");
                                    setDisplayFilters(["Skechers"]);
                                    navigate("/items?companyId=15211")
                                    window.scrollTo(0, 0)
                                }}
                            />
                            <Brand
                                src={sonyLogo}
                                alt="Sony Logo"
                                onClick={ () => {
                                    setIsLoading(true)
                                    setDisplayValue("Sony");
                                    setDisplayFilters(["Sony"]);
                                    navigate("/items?companyId=12407")
                                    window.scrollTo(0, 0)
                                }}
                            />
                            <Brand
                                src={samsungLogo} 
                                alt="Samsung Logo"
                                onClick={ () => {
                                    setIsLoading(true);
                                    setDisplayValue("Samsung");
                                    setDisplayFilters(["Samsung"]);
                                    navigate("/items?companyId=18432");
                                    window.scrollTo(0, 0)
                                }}
                            />
                            <Brand
                                src={motorolaLogo} 
                                alt="Motorola Logo"
                                onClick={ () => {
                                    setIsLoading(true)
                                    setDisplayValue("Motorola");
                                    setDisplayFilters(["Motorola"]);
                                    navigate("/items?companyId=16542")
                                    window.scrollTo(0, 0)
                                }}
                            />
                        </BrandsWrapper>
                    </FeaturedWrapper>
                </div>
                : <LoadingPage />
            }
        </>
    )
}

const Banner = styled.img`
    width: 100vw;

    :hover {
        cursor: pointer;
    }
`;

const FeaturedWrapper = styled.div`
    padding: 50px 100px;

    @media (max-width: 800px) {
        padding: 25px 50px;
    }
`;

const FeaturedTitle = styled.h2`
    font-weight: 400;
    font-size: 28px;
    margin-top: 30px;

    @media (max-width: 800px) {
        text-align: center;
    }
`;

const AdsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    margin-top: 75px;
`;

const Ad = styled.img`
    height: 500px;
    margin-top: 20px;

    @media (max-width: 1600px) {
        height: 400px;
    }

    @media (max-width: 1325px) {
        height: 300px;
    }
`;

const SamsungAd = styled.img`
    height: 500px;
    margin-top: 20px;

    :hover {
        cursor: pointer;
    }

    @media (max-width: 1600px) {
        height: 400px;
    }

    @media (max-width: 1325px) {
        height: 300px;
    }
`;

const BrandsTitle = styled.h2`
    margin-top: 75px;
    font-weight: 400;
    font-size: 28px;
    margin-bottom: 20px;

    @media (max-width: 800px) {
        text-align: center;
    }
`;

const BrandsWrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
`;

const Brand = styled.img`
    height: 45px;
    margin-bottom: 50px;
    margin-right: 30px;
    margin-top: 50px;

    :hover {
        cursor: pointer;
    }

    @media (max-width: 1450px) {
        height: 30px;
        margin-right: 20px;
    }

    @media (max-width: 1060px) {
        height: 45px;
        margin-top: 20px;
    }

    @media (max-width: 600px) {
        height: 30px;
    }
`;

export default Home;