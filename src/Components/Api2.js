import React, { useState, useEffect } from 'react';

const ProductList = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // Track the current page

  const productsPerPage = 5; // Number of products to show per page

  async function fetchData(currentPage) {
    const url = `https://fakestoreapi.com/products?limit=${productsPerPage}&offset=${(currentPage - 1) * productsPerPage}`;
    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      setData(json);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData(page); // Fetch data when page changes
  }, [page]);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div>
      {error ? (
        <p>Error: {error}</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {data.map((item) => (
            <div key={item.id} style={{ marginBottom: '20px' }}>
              <ul style={{ listStyleType: 'none', padding: '10px', border: '1px solid #ccc' }}>
                <li><strong>Category:</strong> {item.category}</li>
                <li><strong>Description:</strong> {item.description}</li>
                <li><strong>Price:</strong> ${item.price}</li>
                <li><strong>Title:</strong> {item.title}</li>
                <div style={{ marginTop: '10px' }}>
                  <img
                    src={item.image}
                    alt={`Image of ${item.title}`}
                    style={{ height: '150px', objectFit: 'contain' }}
                  />
                </div>
              </ul>
            </div>
          ))}

          {/* Pagination controls */}
          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
            <button onClick={handlePreviousPage} disabled={page === 1}>
              Previous
            </button>
            <span>Page {page}</span>
            <button onClick={handleNextPage}>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
