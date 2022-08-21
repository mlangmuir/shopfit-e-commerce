import styled, { keyframes }from 'styled-components';
import shopFitLoadingIcon from "../assets/shopfit-loading-icon.png"

const LoadingPage = () => {

    return (
        <Wrapper>
            <Icon src={shopFitLoadingIcon} alt="SHOPFIT loading icon" />
            <Text>Loading...</Text>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`;

const Icon = styled.img`
`;

const flash = keyframes`
    0% { opacity: 1; }
    50% { opacity: 0.1; }
    100% { opacity: 1; }
`;

const Text = styled.p`
    animation: ${flash} 2s linear infinite;
    margin-top: 20px;
    font-size: 20px;
`;

export default LoadingPage;