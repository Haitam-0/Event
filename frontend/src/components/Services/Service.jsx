import './Services.css'
function Services(props){

    return(
        <div className='service-container'>
            <div className='img-container'
              style={{ backgroundImage: `url("http://localhost:5000/public${props.picture}.jpg")` }} 
              ></div>
              <h1> {props.name} </h1>
        </div>
    )

}
export default Services ; 