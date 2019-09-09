import React from 'react';
import Header from './components/header'
import Footer from './components/footer'
import ContentIndex from './components/content'
import './styles/styles.bundle.css'

const App = () => (
    <div className="body-wrapper">
      <Header />
      <ContentIndex />
      <Footer />
    </div>
  );

export default App;