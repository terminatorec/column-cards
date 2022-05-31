import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import JustCards from './components/JustCards';
import ColumnCards from './components/ColumnCards';

function App() {
  

  return (
    <div className="App">
      {/* <JustCards/> */}
      <ColumnCards/>
      
    </div>
  );
}

export default App;
