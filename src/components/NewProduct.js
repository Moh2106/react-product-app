import React, { useState } from 'react'
import { saveProduct } from '../service/ProductService';

function NewProduct() {
  const [name, setName] = useState("")
  const [price, setPrice] = useState(0);
  const [checked, setChecked] = useState(false);

  const handleSaveProduct = (e) => {
    e.preventDefault();
    let product = {name, price, checked}

    saveProduct(product)
      .then(resp => {
        alert(JSON.stringify(resp.data))
      })
      .catch(error => {
        console.log(error);
      })
  }

  return (
    <div className='row'>
      <div className='col-md-6'>
        <div className='card'>
          <div className='card-body'>
            <form onSubmit={handleSaveProduct}>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Name</label>
                <input type="text" className='form-control' id='exampleInputEmail1'
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Price</label>
                <input className='form-control' id='exampleInputEmail1'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1"
                checked={checked}
                onChange={(e) => setChecked(e.target.value)}
                />
                <label class="form-check-label" for="exampleCheck1">Check me</label>
              </div>
              <button type="submit" class="btn btn-success">Save</button>
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}

export default NewProduct