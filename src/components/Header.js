import React from 'react';
import logo from '../logo.svg';
import '../App.css';

const Header = () => (
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" /> 
    <span>2048</span>
  </header>
);

export default Header;