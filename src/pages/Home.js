import React from 'react';
import Header from '../Components/Header';
import Hero from '../Components/Hero';
import 'swiper/css';
import Services from '../Components/Services';
import CarBrands from '../Components/CarBrands';
import Footer from '../Components/Footer';

const Home = () => {
  return (
    <div>
      {/* Header page */}
      <Header page='index' />
      {/* Hero page */}
      <Hero />
      {/* Services function */}
      <Services />
      {/* Car brands */}
      <CarBrands />
      <Footer />
    </div>
  );
};

export default Home;
