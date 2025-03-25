import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './Detail_event.css'; // Import the CSS

function DetailEvent() {
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
        fetch("http://localhost:5000/api/services")
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
        <div className='event-wrapper'>
            {event ? (
                <>
                    <div 
                        className="event-banner" 
                        style={{ backgroundImage: `url("http://${event.picture2}")` }} 
                        ></div>
                    <h1 className="event-title" >{event.name}</h1>
                    <p className="event-description">{event.description}</p>
                </>
            ) : (
                <p>Loading event details...</p>
            )}

            <h1 className='h1'>Nos Services</h1>
            {loading ? (
                <p>Loading services...</p>
            ) : services.length === 0 ? (
                <p>No services available.</p>
            ) : (
                <ul className="service-list">
                    {services.map((service) => (
                        <li key={service.id}>
                            <div className='service-card'>
                                <div className='service-image'
                                    style={{ backgroundImage: `url("${service.image}")` }} 
                                ></div>
                                <h1 className="service-title">{service.name}</h1>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            <div className='localContainer'>
            <h1 className='local-h1'>Nos locaux</h1>
            <img src="http://localhost:5000/public/marrakech.jpg" alt=""  className='img1'/>
            <img src="http://localhost:5000/public/local2.jpg" alt=""  className='imgMom img1'/>
            <img src="http://localhost:5000/public/local3.jpg" alt="" className='img1'/>
            </div>


            <Link to={`/Reserver/`}>
            <button>reserver</button>

            </Link>




                <h1 className='local-h1 retour-h1'> Nos Retours</h1>
            <div className='review-div'>

                <div className='review-son'>
                <img src="http://localhost:5000/public/php1.jpg" alt="" className='img2'/>
                <p className='p2'>Nous avons fait appel à votre service pour organiser notre mariage, et tout était parfait
                     ! La décoration, l’ambiance, et la coordination étaient au-delà de nos attentes. Merci d’avoir
                      rendu ce jour encore plus magique !</p>
                </div>

                <div className='review-son'>
                <img src="http://localhost:5000/public/mike.jpg" alt="" className='img2'/>
                <p className='p2'>J’ai organisé une fête surprise pour l’anniversaire de ma femme et grâce à votre équipe, tout s’est déroulé
                     à merveille ! L’attention portée aux détails et l’originalité du thème ont vraiment impressionné nos invités.</p>
                </div>

                <div className='review-son'>
                <img src="http://localhost:5000/public/conor.jpg" alt="" className='img2'/>
                <p className='p2'>Dans un moment aussi difficile, votre équipe a su nous accompagner avec professionnalisme et bienveillance. 
                    L’organisation était sobre et respectueuse,
                    ce qui nous a permis de nous concentrer sur l’essentiel. Merci infiniment.</p>
                </div>

                <div className='review-son'>
                <img src="http://localhost:5000/public/khabib.jpg" alt="" className='img2'/>
                <p className='p2'>Nous sommes ravis d’avoir choisi vos services pour le baptême de notre fils. L’événement était doux, 
                    chaleureux et parfaitement orchestré.La décoration et le buffet ont été très
                     appréciés par tous nos invités !</p>
                </div>
                
                

                

            </div>
        </div>
    );
}

export default DetailEvent;
