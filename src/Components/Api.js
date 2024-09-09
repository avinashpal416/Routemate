
import React, { useState, useEffect } from 'react';

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
                <img src={item.download_url} alt={item.author} className="hover-effect" />
                <p>{item.author}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={()=> setPage(page-1)}  Disabled={page === 1} >Previous Page</button>
        <span>Page {page}</span>
        <button onClick={()=> setPage(page+1)}>Next page</button>
      </div>
    </div>
  );
};

export default Api;
