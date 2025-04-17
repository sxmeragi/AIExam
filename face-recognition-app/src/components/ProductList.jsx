import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      axios.get('http://localhost:8000/api/products/', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      })
      .then(response => {
        setProducts(response.data);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setError('Ошибка при загрузке товаров');
      });
    } else {
      setError('Токен не найден. Пожалуйста, авторизуйтесь.');
    }
  }, []);

  return (
    <div>
      <h2>Product List</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.quantity} units - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
