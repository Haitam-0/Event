import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../pages/Home/Home.css";
import Card from "../../components/Card/Card.jsx";
import Review from "../../components/Review/review.jsx";

function Home() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5000/api/events")
        .then((res) => res.json())
        .then((data) => {
            console.log("Fetched events:", data);
            setEvents(data);  
            setLoading(false); 
        })
        .catch((err) => {
            console.error("Error fetching events:", err);
            setLoading(false); 
        });
    }, []);

    return (
        <>
            <div className="img">
                <div className="input-search">
                    <input type="text" placeholder="...Search" />
                </div>
            </div>

            <div className="event-list">
                {loading ? (
                    <p>Loading events...</p> 
                ) : events.length === 0 ? (
                    <p>No events available.</p> 
                ) : (
                    events.map((event, index) => (
                        event.id ? ( 
                            <Link
                                key={event.id || index} 
                                to={`/Details_event/${event.id}`}
                                className="no-underline"
                            >
                                <Card event={event} />
                            </Link>
                        ) : (
                            <div key={index} className="no-id-warning">
                                <p>Event data is incomplete</p>
                            </div>
                        )
                    ))
                )}
            </div>

            <h1 className="h1">TESTIMONIAL</h1>
            <div className="Card-container review-container">
                <Review />
                <Review />
            </div>
        </>
    );
}

export default Home;
