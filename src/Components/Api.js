import React, { useEffect, useState } from 'react';

const Api = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  async function getData(page) {
    const url = `https://picsum.photos/v2/list?page=${page}&limit=10`;
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
    getData(page);
  }, [page]);

  return (
    <div>
      {error ? (
        <p>Error: {error}</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            {data.map((item) => (
              <div key={item.id}>
                {/* Apply class to image */}
                <img src={item.download_url} alt={item.author} className="hover-effect" />
                <p>Author: {item.author}</p>
              </div>
            ))}
          </div>
          {/* Pagination Controls */}
          <button onClick={() => setPage(page - 1)} disabled={page === 1}>
            Previous Page
          </button>
          <button onClick={() => setPage(page + 1)}>Next Page</button>
        </div>
      )}
    </div>
  );
};

export default Api;
