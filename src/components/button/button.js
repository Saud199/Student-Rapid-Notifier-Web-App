import React from 'react';
import '../../css/bootstrap.min.css';
import './button.css'

export const Button = ({text, onClick, type, disabled , style }) => (
  <button
    className='btn' 
    type={type}
    disabled={disabled}
    onClick={onClick}
    style={style}
  >
    {text}
  </button>
);