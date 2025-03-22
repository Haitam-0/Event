import { useEffect, useState } from "react";
import "./Reserver.css"

function Reserver() {
    const [event, setEvent] = useState([]); // Initialiser comme un tableau vide
    const [service, setService] = useState([]);
    const [formData, setFormData] = useState({
        eventName: '',
        description: '',
        address: '',
        category: '',
        service: '',
        eventDate: ''
    });

    useEffect(() => {
        fetch(`http://localhost:5000/api/events`)
            .then((res) => res.json())
            .then((data) => {
                console.log("Fetched event:", data);
                setEvent(data); // Mettre à jour l'état des événements
            })
            .catch((err) => console.error("Error fetching event:", err));

        fetch("http://localhost:5000/api/services")
            .then((res) => res.json())
            .then((data) => {
                console.log("Fetched services:", data);
                setService(data); // Mettre à jour l'état des services
            })
            .catch((err) => {
                console.error("Error fetching services:", err);
            });
    }, []);

    // Fonction pour obtenir la date de demain
    const getTomorrowDate = () => {
        const today = new Date();
        today.setDate(today.getDate() + 1);
        return today.toISOString().split("T")[0]; // Format YYYY-MM-DD
    };

    // Fonction de gestion du changement de champ de formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Fonction pour créer l'événement
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Event data submitted:", formData);
        // Ajouter la logique pour envoyer les données à l'API
        fetch('http://localhost:5000/api/createEvent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Event created successfully:', data);
            // Gérer la réponse après création (par exemple, redirection, message de succès, etc.)
        })
        .catch((error) => {
            console.error('Error creating event:', error);
        });
    };

    return (
        <>
            <h1 className="h11">Information General</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="eventName">Nom de l'événement</label><br />
                <input
                    type="text"
                    name="eventName"
                    value={formData.eventName}
                    onChange={handleChange}
                    placeholder="Nom de l'événement"
                /><br />

                <label htmlFor="description">Description</label><br />
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                /><br />

                <label htmlFor="address">Adresse</label><br />
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Adresse"
                /><br />

                <label htmlFor="category">Catégorie</label>
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                >
                    {event.map((eventItem) => (
                        <option key={eventItem.id} value={eventItem.id}>{eventItem.name}</option>
                    ))}
                </select><br />

                <label htmlFor="service">Service</label>
                <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                >
                    {service.map((serviceItem) => (
                        <option key={serviceItem.id} value={serviceItem.id}>{serviceItem.name}</option>
                    ))}
                </select><br />

                <label htmlFor="eventDate">Date</label><br />
                <input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    min={getTomorrowDate()} // Empêcher la sélection d'une date avant demain
                /><br />

                {/* Bouton pour créer l'événement */}
                <button type="submit" className="btn">Créer l'événement</button>
            </form>
        </>
    );
}

export default Reserver;
