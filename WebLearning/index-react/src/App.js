import React from 'react';
import Header from './components/header/Header.js'
import Basement from './components/basement/Basement.js'
import ContentIndex from './components/content/ContentIndex.js'

const App = () => (
    <div className="body-wrapper">
      <Header />
      <ContentIndex />
      <Basement />
    </div>
  );

export default App;