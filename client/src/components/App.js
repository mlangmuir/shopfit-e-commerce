import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./globalStyle";
import Header from "./Header/Header";
import Home from "./Home";
import ShoppingCart from "./ShoppingCart";
import ItemDetails from "./ItemDetails";
import Footer from "./Footer";
import OrderForm from './OrderForm';
import Confirmation from './Confirmation'
import ListingPage from "./ListingResults/ListingPage";
import ErrorPage from "./ErrorPage";

const App = () => {

  return (
    <>
      <BrowserRouter>
        <GlobalStyle />
        <Header />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/shopping-cart" element={<ShoppingCart />} />
            <Route exact path="/id/:itemId" element={<ItemDetails />} />
            <Route exact path="/items" element={<ListingPage />} />
            <Route exact path="/checkout" element={<OrderForm />} />
            <Route exact path="/confirmation" element={<Confirmation />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App;
