import {
  faCircle,
  faCircleCheck,
  faEdit,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import {
  AppContext,
  checkProduct,
  deleteProduct,
  getProducts,
  useAppState,
} from "../service/ProductService";
import { useNavigate } from "react-router-dom";

function Products() {
  const [state, setState] = useContext(AppContext);

  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    handleGetProducts(state.keyword, state.currentPage, state.pageSize);
  }, []);

  const handleGetProducts = (keyword, page, size) => {
    getProducts(keyword, page, size)
      .then((resp) => {
        let totalElements = resp.headers["x-total-count"];
        let totalPages = Math.floor(totalElements / size);
        if (totalElements % size != 0) ++totalPages;
        setState({
          products: resp.data,
          currentPage: page,
          pageSize: size,
          totalPages: totalPages,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Pour la suppression
  const handleDeleteProduct = (p) => {
    deleteProduct(p).then((resp) => {
      const newProduct = state.products.filter(
        (product) => product.id !== p.id
      );
      setState({ ...state, products: newProduct });
    });
  };

  const handleChecked = (p) => {
    checkProduct(p).then((resp) => {
      const newProduct = state.products.map((product) => {
        if (product.id === p.id) {
          product.checked = !product.checked;
        }
        return product;
      });

      setState({ ...state, products: newProduct });
    });
  };

  // Pour la recherche
  const handleSearch = (e) => {
    e.preventDefault();
    handleGetProducts(query, 1 , state.pageSize)
  };

  return (
    <div className="m-1">
      <div className="row">
        <div className="col-md-6">
          <div className="card m-1 p-1">
            <div className="card-body">
              <div className="row">
                <div>
                  <form onSubmit={handleSearch} className="row">
                    <div className="col-auto">
                      <input
                        className="form-control"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                      />
                    </div>

                    <div className="col-auto">
                      <button className="btn btn-success" type="submit">
                        <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h3>Product Component</h3>

              <table className="table">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Checked</th>
                  </tr>
                </thead>
                <tbody>
                  {state.products.map((p) => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>{p.name}</td>
                      <td>{p.price}</td>
                      <td>
                        <button
                          className="btn btn-outline-sucess"
                          onClick={() => handleChecked(p)}
                        >
                          <FontAwesomeIcon
                            icon={p.checked ? faCircleCheck : faCircle}
                          />
                        </button>
                      </td>

                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDeleteProduct(p)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>

                      <td>
                        <button
                          className="btn btn-outline-success"
                          onClick={() => navigate(`/editProduct/${p.id}`)}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <ul className="nav nav-pills">
                {new Array(state.totalPages).fill(0).map((value, index) => (
                  <li key={index+1}>
                    <button
                      className={
                        index + 1 === state.currentPage
                          ? "btn btn-info ms-1"
                          : "btn btn-outline-info ms-1"
                      }
                      onClick={() =>
                        handleGetProducts(
                          state.keyword,
                          index + 1,
                          state.pageSize
                        )
                      }
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
