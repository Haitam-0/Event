import { useEffect, useState } from "react";
import "./Reserver.css";

function Reserver({ editingEvent, setEditingEvent }) {
    const [eventList, setEventList] = useState([]);
    const [services, setServices] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        address: "",
        category: "", // Category will store the name, not the ID
        services: [],
        eventDate: "",
    });
    const [totalPrice, setTotalPrice] = useState(0); // To store total price
    const [alertVisible, setAlertVisible] = useState(false); // For custom alert visibility

    // Fetch events and services
    useEffect(() => {
        fetch("http://localhost:5000/api/events")
            .then((res) => res.json())
            .then((data) => setEventList(data))
            .catch((err) => console.error("Error fetching events:", err));

        fetch("http://localhost:5000/api/services")
            .then((res) => res.json())
            .then((data) => setServices(data))
            .catch((err) => console.error("Error fetching services:", err));
    }, []);

    // Set form data when editing an event
    useEffect(() => {
        if (editingEvent) {
            setFormData({
                name: editingEvent.name || "",
                description: editingEvent.description || "",
                address: editingEvent.address || "",
                category: editingEvent.category || "", // Store category name here
                services: editingEvent.services || [],
                eventDate: editingEvent.eventDate ? editingEvent.eventDate.split("T")[0] : "",
            });
            // Calculate the price if editing
            calculatePrice(editingEvent.category, editingEvent.services);
        }
    }, [editingEvent]);

    // Get tomorrow's date for the minimum date selection
    const getTomorrowDate = () => {
        const today = new Date();
        today.setDate(today.getDate() + 1);
        return today.toISOString().split("T")[0];
    };

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (name === "category") {
            // Find the selected category by its name and update formData
            const categoryName = eventList.find((event) => event.name === value)?.name || "";
            setFormData((prev) => ({
                ...prev,
                category: categoryName, // Store the category name instead of ID
            }));
            calculatePrice(categoryName, formData.services); // Recalculate price with the category name
        }
    };

    // Handle service checkbox change
    const handleServiceChange = (e) => {
        const serviceName = e.target.name;
        setFormData((prev) => {
            const updatedServices = prev.services.includes(serviceName)
                ? prev.services.filter((name) => name !== serviceName)
                : [...prev.services, serviceName];
            calculatePrice(formData.category, updatedServices); // Recalculate the price
            return { ...prev, services: updatedServices };
        });
    };

    // Calculate the total price based on category and selected services
    const calculatePrice = (categoryName, selectedServices) => {
        let price = 0;

        // Find the category by matching the category name
        const categoryData = eventList.find((event) => event.name === categoryName);  // Compare name instead of ID
        if (categoryData) {
            price += categoryData.price; // Add the event price
        }

        // Add the price of selected services
        selectedServices.forEach((service) => {
            const serviceData = services.find((s) => s.name === service);
            if (serviceData) {
                price += serviceData.price;
            }
        });

        setTotalPrice(price); // Update the total price
    };

    // Handle form submission (Create or Update event)
    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (!formData.name || !formData.description || !formData.address || !formData.category || !formData.eventDate) {
            alert("Please fill in all required fields!");
            return;
        }
    
        const jsonData = { 
            ...formData, 
            price: totalPrice  // Add the total price to the payload
        };
    
        if (editingEvent) {
            // Send PUT request to update the event
            fetch(`http://localhost:5000/api/createEvent/${editingEvent._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(jsonData),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log("Event updated:", data);
                setEditingEvent(null);
                setAlertVisible(true);
                setTimeout(() => setAlertVisible(false), 3000);
                setFormData({
                    name: "",
                    description: "",
                    address: "",
                    category: "",
                    services: [],
                    eventDate: "",
                });
            })
            .catch((error) => console.error("Error updating event:", error));
        } else {
            // Send POST request to create a new event
            fetch("http://localhost:5000/api/createEvent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(jsonData),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log("Event created:", data);
                setAlertVisible(true);
                setTimeout(() => setAlertVisible(false), 3000);
                setFormData({
                    name: "",
                    description: "",
                    address: "",
                    category: "",
                    services: [],
                    eventDate: "",
                });
            })
            .catch((error) => console.error("Error creating event:", error));
        }
    };
    

    return (
        <>
            <h1 className="h11">{editingEvent ? "Modifier l'événement" : "Créer un événement"}</h1>
            <form onSubmit={handleSubmit} className="form">
                <label className="label">Nom de l'événement</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="input-text" required />

                <label className="label">Description</label>
                <input type="text" name="description" value={formData.description} onChange={handleChange} className="input-text" required />

                <label className="label">Adresse</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} className="input-text" required />

                <label className="label">Catégorie</label>
                <select name="category" value={formData.category} onChange={handleChange} className="select-input" required>
                    <option value="" disabled>Choisissez une catégorie</option>
                    {eventList.map((eventItem) => (
                        <option key={eventItem._id} value={eventItem.name}>  {/* Use eventItem.name */}
                            {eventItem.name}
                        </option>
                    ))}
                </select>

                <label className="label">Services</label>
                <div className="services-container">
                    {services.map((serviceItem) => (
                        <label key={serviceItem.id} className="service-item">
                            <input
                                type="checkbox"
                                name={serviceItem.name}
                                checked={formData.services.includes(serviceItem.name)}
                                onChange={handleServiceChange}
                            />
                            {serviceItem.name} (+{serviceItem.price} MAD)
                        </label>
                    ))}
                </div>

                <label className="label">Date</label>
                <input type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} min={getTomorrowDate()} className="input-date" required />

                <div className="total-price">
                    <strong>Prix Total: {totalPrice} MAD</strong>
                </div>

                <button type="submit" className="btn">{editingEvent ? "Mettre à jour" : "Créer"}</button>
            </form>

            {/* Custom alert */}
            {alertVisible && (
                <div className="alert show">
                    {editingEvent ? "Event updated successfully!" : "Event created successfully!"}
                </div>
            )}
        </>
    );
}

export default Reserver;
