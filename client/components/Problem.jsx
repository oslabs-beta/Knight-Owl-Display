import React from 'react'
import SecurityIcon from '@mui/icons-material/Security';

export default function Problem() {
  return (
    <div className='problem-sg'>
      <SecurityIcon fontSize='large'/>
      <h2 className='problem-header-sg'>
        Attackers can prey on your software simply by crafting malicious GraphQL queries. 
      </h2>
    </div>
  )
};
