import React, { useEffect, useState } from 'react';

const Api = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // State for dynamic page number
  const [loading, setLoading] = useState(false); // State to manage loading state

  async function getData(page) {
    const url = `https://picsum.photos/v2/list?page=${page}&limit=10`; // Use page number in the URL
    setLoading(true); // Set loading to true when fetching data
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      setData(json); // Update state with fetched data
    } catch (error) {
      setError(error.message); // Update state with error message
    } finally {
      setLoading(false); // Set loading to false after fetch
    }
  }

  useEffect(() => {
    getData(page); // Call the API whenever the page changes
  }, [page]); // Dependency array includes 'page', so useEffect runs on page change

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
                <img src={item.download_url} alt={item.author} style={{ width: '100%', height: 'auto' }} />
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
