import '../../pages/Home/Home.css'
import Card from '../../components/Card/Card.jsx'
import Review from '../../components/Review/review.jsx'
import { Link } from 'react-router-dom'
function Home (){
    return (
        <>
         <div className='img'>
        <div className='input-search'> 
            <input type="text" placeholder='...Search'/>
        </div>
        
       </div>
        <Link to="Details_event" className='no-underline'><Card /></Link> 
        <br /><br />
        <h1 className='h1'>TESTIMONIAL</h1>
        <div className='Card-container review-container'>
        <Review/>
        <Review/>
        </div>


        </>
    )
}
export default Home ; 