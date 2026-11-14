import HeaderComponent from './components/Header/Header'

import './index.css';
import ReadingBar from './components/ReadingBar/ReadingBar';
import WhereItHurts from './sections/WhereItHurts/WhereItHurts';
import WhyUs from './sections/whyus/whyus';
import People from './sections/people/people';
import Questions from './sections/Question/Question';
import ButtonCallMobile from "./features/ButtonCallMobile/ButtonCallMobile";
import Hero from './sections/Hero/Hero';
import Band from './sections/Band/Band';
import CloseMain from './sections/Close/CloseMain';
import Footer from './sections/Footer/footer';
function App() {
 

  return (
     <>
         <ReadingBar />
          
        <HeaderComponent/>
        <main id='main'>
          <Hero/>
          <WhereItHurts/>
          <WhyUs/>
          <People/>
          <Band/>
          <Questions/>
           <CloseMain/>
          <ButtonCallMobile/>
           
        </main>
        <Footer/>
        
        
    </>
   
  )
}

export default App
