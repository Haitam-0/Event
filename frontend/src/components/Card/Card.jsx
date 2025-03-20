import React, { useEffect, useState } from 'react';
import '../Card/Card.css';

<<<<<<< HEAD
function Card() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch("/events.json") // Ensure this file is inside the `public` folder
            .then((response) => response.json())
            .then((data) => setEvents(data))
            .catch((error) => console.error("Error loading events:", error));
    }, []);

    return (
        <div className="event-section">
            <h2 className="event-title">NOS EVENEMENTS</h2>
            <div className="event-grid">
                {events.map((event, index) => (
                    <div key={index} className="event-card">
                        <div 
                            className="event-image" 
                            style={{ backgroundImage: `url(${event.picture})` }}
                        ></div>
                        <h3 className="event-name">{event.name}</h3>
                        <p className="event-info">{event.description}</p>
                    </div>
                ))}
            </div>
=======
function Card({ event }) {
    return (
        <div className="event-card">
            <div 
                className="event-image" 
                style={{ backgroundImage: `url(http://localhost:5000/public/${event.image})` }} 
            ></div>
            <h3 className="event-name">{event.title}</h3>
            <p className="event-info">{event.description}</p>
>>>>>>> 4162428dde36f612ab39d0b01d280cc36ba3e310
        </div>
    );
}

export default Card;
