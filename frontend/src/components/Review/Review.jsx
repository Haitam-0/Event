import '../Review/Review.css'
function Review(props){

    return(
        <div className="review-container">
            <div className="image-container" 
                    style={{ backgroundImage: `url("${props.picture}")` }} 
            ></div>
            <h2 className="h2"> {props.name} </h2>
            <button className="button">****</button>
        </div>
    )
}

export default Review ;