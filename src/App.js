
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Contact from './Components/Contact';
import Home from './Components/Home';
import ProductList from './Components/ProductList';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Api from './Assets/Api';
import Login from './Components/Login';



function App() {
  return (
    
    <div className='App'>
      <Header />
      <main>
        <Routes>
        <Route path='/Login' element={<Login/>} />
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<ProductList/>} />
          
          
        </Routes>

        {/* <Login /> */}
       
      </main>
      
     
      
      <Footer />
    </div>
    
  );
}

export default App;
