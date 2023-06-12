import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Products from './components/Products';
import NewProduct from './components/NewProduct';
import EditProduct from "./components/EditProduct";
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react';
import { AppContext, useAppState } from './service/ProductService';
import Stats from './components/Stats';

function App() {
  const [currentRoute, setCurrentRoute] = useState("");

  return (
    <AppContext.Provider value={useAppState()}>
      <BrowserRouter>
        <nav className="m-1">
          <ul className="nav na-pills navbar navbar-expand-lg navbar-light bg-light">
            <li>
              <Link
                to={"/"}
                onClick={() => setCurrentRoute("Home")}
                className={
                  currentRoute == "Home"
                    ? "btn btn-info ms-1"
                    : "btn btn-outline-info ms-1"
                }
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to={"/products"}
                onClick={() => setCurrentRoute("Product")}
                className={
                  currentRoute == "Product"
                    ? "btn btn-info ms-1"
                    : "btn btn-outline-info ms-1"
                }
              >
                Products
              </Link>
            </li>

            <li>
              <Link
                to={"/addProducts"}
                onClick={() => setCurrentRoute("AddProduct")}
                className={
                  currentRoute == "AddProduct"
                    ? "btn btn-info ms-1"
                    : "btn btn-outline-info ms-1"
                }
              >
                Add Products
              </Link>
            </li>

            <li className="navbar nav ms-1">
              <Stats></Stats>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/products" element={<Products />}></Route>
          <Route path="/addProducts" element={<NewProduct />}></Route>
          <Route path="/editProduct/:id" element={<EditProduct />}></Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
