import React, { useContext } from 'react'
import { AppContext } from '../service/ProductService';

function Stats() {
    const [state, setState] = useContext(AppContext)
  return (
    <div>
      <button type="button" class="btn btn-primary position-relative">
        Caddy
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {state.products.length}
        </span>
      </button>
    </div>
  );
}

export default Stats