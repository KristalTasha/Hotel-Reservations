import logo from './logo.svg';
import Navbar from './components/navbar';
import BookRoom from './components/book-room';
import Reservations from './components/reservations';
import Footer from './components/footer';
import './reception.scss';

function Reception() {

  
  return (
    <div className="reception-cont">
     <Navbar/>
     <div className='front-desk'>
      <Reservations/>
       <BookRoom/>
     </div>

      <Footer/>

    </div>
  );
}

export default Reception;
