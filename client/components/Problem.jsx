import React from 'react'
import SecurityIcon from '@mui/icons-material/Security';

export default function Problem() {
  return (
    <div>
      <SecurityIcon fontSize='large'/>
      <h2>
        Attackers can prey on your software simply by crafting malicious GraphQL queries. 
      </h2>
      <p>
        KnightOwl is here to protect everything you love about GraphQL.
      </p>
    </div>
  )
};
