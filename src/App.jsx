import HeaderComponent from './components/Header/Header'

import './index.css';
import ReadingBar from './components/ReadingBar/ReadingBar';
import WhereItHurts from './sections/WhereItHurts/WhereItHurts';
import WhyUs from './sections/whyus/whyus';
import People from './sections/people/people';
import Questions from './sections/Question/Question';
import ButtonCallMobile from "./features/ButtonCallMobile/ButtonCallMobile";
import Hero from './sections/Hero/Hero';
function App() {
 

  return (
     <>
        <body>
          <ReadingBar />
          <Hero></Hero>
        <HeaderComponent/>
        <main id='main'>
          <WhereItHurts/>
         <WhyUs/>
          <People/>
           <Questions/>
          <ButtonCallMobile/>
        </main>
        </body>
        
        
    </>
   
  )
}

export default App
