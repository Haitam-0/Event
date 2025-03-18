import '../../pages/Home/Home.css'
import Card from '../../components/Card/Card.jsx'
import Review from '../../components/Review/review.jsx'
function Home (){
    return (
        <>
         <div className='img'>
        <div className='input-search'> 
            <input type="text" placeholder='...Search'/>
        </div>
        
       </div>
        <h1 className='h1'>Nos Evenement</h1>
        <div className='Card-container'> 
            <Card/>
            <Card/>
            <Card/>
            <Card/>
        </div>
        <br /><br />
        <h1 className='h1'>testimonial</h1>
        <div className='Card-container review-container'>
        <Review/>
        <Review/>

        </div>


        </>
    )
}
export default Home ; 