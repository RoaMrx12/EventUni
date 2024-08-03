import React, { useState } from 'react';
import axios from 'axios';

const UserSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/users/search?q=${query}`);
      setResults(response.data);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  return (
    <div>
      <input 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Search users" 
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {results.map(user => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserSearch;