import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../pages/Home/Home.css";
import Card from "../../components/Card/Card.jsx";
import Review from "../../components/Review/review.jsx";

function Home() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch events when the component mounts
    useEffect(() => {
        fetch('http://localhost:5000/api/events') 
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setEvents(data);  // Update the state with fetched events
                setLoading(false); // Set loading to false when the data is loaded
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
                setLoading(false); // Set loading to false even if there's an error
            });
    }, []);  // Empty array to run only once when the component mounts

    return (
        <>
            <div className="img">
            </div><br /><br /><br />
            <h1 className="h1">NOS EVENEMENTS</h1>
            <div className="event-list">
                {loading ? (
                    <p>Loading events...</p> 
                ) : (
                    events.map(event => (
                        <Link to={`/Details_event/${event._id}`}>

                        <Card key={event._id} event={event} /> 
                        
                        </Link>
                    ))
                )}
            </div>

            <h1 className="h1">TESTIMONIAL</h1>
            <div className="Card-container review-container">
                <Review name="Amine et Olive" picture="http://localhost:5000/public/marriage3.jpg" />
                <Review  name="Simo" picture="http://localhost:5000/public/anniv3.jpg" />
            </div>
        </>
    );
}

export default Home;
