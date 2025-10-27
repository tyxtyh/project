import React, { useState } from 'react';
import TopBar from './components/TopBar';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Catalog from './components/Catalog';
import WorkStages from './components/WorkStages';
import Advantages from './components/Advantages';
import About from './components/About';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import OrderModal from './components/OrderModal';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [orderModalType, setOrderModalType] = useState('call');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    // Плавная прокрутка к каталогу
    setTimeout(() => {
      const catalogElement = document.getElementById('catalog');
      if (catalogElement) {
        catalogElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const openOrderModal = (type = 'call') => {
    setOrderModalType(type);
    setIsOrderModalOpen(true);
  };

  const closeOrderModal = () => {
    setIsOrderModalOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const scrollToCatalog = () => {
    const catalogElement = document.getElementById('catalog');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="App">
      <TopBar 
        onCallbackClick={() => openOrderModal('call')} 
        isMenuOpen={isMenuOpen}
        onMenuToggle={toggleMenu}
      />
      <Header 
        onCallbackClick={() => openOrderModal('call')} 
        isMenuOpen={isMenuOpen}
        onMenuClose={closeMenu}
      />
      <Hero />
      <Features onCategoryClick={handleCategoryClick} />
      <Catalog initialCategory={selectedCategory} onCallbackClick={() => openOrderModal('call')} />
      <WorkStages onCatalogClick={scrollToCatalog} onCallbackClick={() => openOrderModal('call')} />
      <Advantages />
      <About onCatalogClick={() => openOrderModal('call')} />
      <Gallery />
      <Reviews />
      <ContactForm />
      <Footer />
      <ScrollToTop />
      <OrderModal isOpen={isOrderModalOpen} onClose={closeOrderModal} type={orderModalType} />
    </div>
  );
}

export default App;
