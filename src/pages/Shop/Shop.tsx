import { shopData } from '../../data/shopData.ts';
import './Shop.css';

function Shop() {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Shop</h1>
      <p className="text-center mb-5">
        Welcome to our shop! Explore our wide range of pixel art products. Each item is carefully curated to meet your needs and preferences.
      </p>
      <div className="row">
        {shopData.map((item) => (
          <div key={item.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img src={item.imageUrl} className="card-img-top" alt={item.name} />
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">{item.description}</p>
                <p className="card-text font-weight-bold">₹{item.price.toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shop;