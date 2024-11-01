import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import "bootstrap/dist/js/bootstrap.bundle.min";
import Explore from './components/Explore';
import Testmonial from './components/Testmonial';

function App() {
  return (
    <>
<Header/>    
<Explore />
<Testmonial />
    </>
  );
}

export default App;