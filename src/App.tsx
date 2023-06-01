import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.scss';
import { Footer } from './features/Footer';
import { Header } from './features/Header';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Anchor } from './features/Anchor';

const App: React.FC = () => {
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollTop(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="App">
      <div className="App__top" id="top">
        <div className="App__section App__section--header">
          <Header />
        </div>

        <div className="App__section App__section--main container-xl">
          <Routes>
            <Route path="/products?/:page?/*" element={<Home />} />
            <Route path="about" element={<About />} />
          </Routes>
        </div>
        {!!scrollTop && (
          <div className="App__Anchor">
            <Anchor />
          </div>
        )}
      </div>
      <div className="App__bottom">
        <div className="App__section App__section--footer container-xl">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;
