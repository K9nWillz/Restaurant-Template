import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedMenu } from './components/FeaturedMenu';
import { DailySpecials } from './components/DailySpecials';
import { About } from './components/About';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Testimonials } from './components/Testimonials';
import { Gallery } from './components/Gallery';
import { DeliveryInfo } from './components/DeliveryInfo';
import { Contact } from './components/Contact';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { FloatingAction } from './components/FloatingAction';
import { Chatbot } from './components/Chatbot';
import { Admin } from './components/Admin';

function MainApp() {
  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <CartDrawer />
      
      <main>
        <Hero />
        <FeaturedMenu />
        <DailySpecials />
        <About />
        <WhyChooseUs />
        <Testimonials />
        <Gallery />
        <DeliveryInfo />
        <Contact />
        <Newsletter />
      </main>

      <Footer />
      <FloatingAction />
      <Chatbot />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}


