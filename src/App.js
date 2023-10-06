import React, { useState, useEffect } from 'react';

function App() {
  const [mergedNumbers, setMergedNumbers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const urls = [
        'http://20.244.56.144/numbers/primes',
        'http://20.244.56.144/numbers/odd',
      ];

      const promises = urls.map(async (url) => {
        try {
          const response = await fetch(url, { timeout: 500 });
          if (response.ok) {
            const data = await response.json();
            return data.numbers;
          }
        } catch (error) {
          console.error(`Error fetching data from ${url}: ${error.message}`);
        }
        return [];
      });

      const responses = await Promise.all(promises);

      // Merge and sort unique integers
      const mergedUniqueNumbers = [...new Set(responses.flat())].sort(
        (a, b) => a - b
      );

      setMergedNumbers(mergedUniqueNumbers);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Merged Unique Integers</h1>
      <pre>{JSON.stringify({ numbers: mergedNumbers }, null, 2)}</pre>
    </div>
  );
}

export default App;