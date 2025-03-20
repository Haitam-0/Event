import '../../pages/Details_event/Detail_event.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Detail_event() {
    const { id } = useParams(); // Get event ID from URL
    const [event, setEvent] = useState(null); // Store event details
    const [services, setServices] = useState([]); // Store services
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        // Fetch event details
        fetch(`http://localhost:5000/api/events/${id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("Fetched event:", data);
                setEvent(data);
            })
            .catch((err) => console.error("Error fetching event:", err));

        // Fetch services
        fetch("http://localhost:5003/api/services")
            .then((res) => res.json())
            .then((data) => {
                console.log("Fetched services:", data);
                setServices(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching services:", err);
                setLoading(false);
            });
    }, [id]);

    return (
        <div>
            {event ? (
                <>
                    <div 
                className="event-image" 
                style={{ backgroundImage: `url("http://${event.picture}")` }} 
            ></div>
             <h1>{event.name}</h1>
             <p>{event.description}</p>
                </>
            ) : (
                <p>Loading event details...</p>
            )}

            <h1>Services</h1>
            {loading ? (
                <p>Loading services...</p>
            ) : services.length === 0 ? (
                <p>No services available.</p>
            ) : (
                <ul>
                    {services.map((service) => (
                        <li key={service.id}>
                            <strong>{service.name}</strong> - {service.description} (${service.price})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Detail_event;
