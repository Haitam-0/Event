import '../../pages/Details_event/Detail_event.css';
import { useState, useEffect } from 'react';

function Detail_event() {
    const [services, setServices] = useState([]);  // Store services
    const [loading, setLoading] = useState(true);  // Loading state

    useEffect(() => {
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
    }, []);

    return (
        <div>
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
