import { useState, useEffect } from 'react';

const useCustomHook = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch or compute data
  }, []);

  return data;
};

export default useCustomHook;
