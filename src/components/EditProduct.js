import React, { useEffect, useState } from "react";
import {
  saveProduct,
  getProductById,
  updateProduct,
} from "../service/ProductService";
import { useParams } from "react-router-dom";

function NewProduct() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    handleDisplayProduct(id);
  }, []);

  // Pour afficher les données dans le formulaire
  const handleDisplayProduct = (id) => {
    getProductById(id)
      .then((resp) => {
        let product = resp.data;
        setName(product.name);
        setPrice(product.price);
        setChecked(product.checked);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Pour editer le produits
  const handleEditProduct = (e) => {
    e.preventDefault();
    let product = { id, name, price, checked };

    updateProduct(product)
      .then((resp) => {
        alert(JSON.stringify(resp.data));
      })
      .catch((err) => {
        console.log(err);
      });

  };

  return (
    <div className="row">
      <div className="col-md-6">
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleEditProduct}>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  Price
                </label>
                <input
                  className="form-control"
                  id="exampleInputEmail1"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div class="mb-3 form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="exampleCheck1"
                  checked={checked}
                  onChange={(e) => setChecked(e.target.value)}
                />
                <label class="form-check-label" for="exampleCheck1">
                  Check me
                </label>
              </div>
              <button type="submit" class="btn btn-success">
                Edit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewProduct;
