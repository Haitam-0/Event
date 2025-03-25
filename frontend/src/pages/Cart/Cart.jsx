import React, { useState, useEffect } from "react";
import axios from "axios";
import Reserver from "../Reserver/Reserver"; // Import the form component
import "./Cart.css"; 

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [editingEvent, setEditingEvent] = useState(null); // Track the event being edited
    const [showModal, setShowModal] = useState(false); // For modal visibility
    const [selectedEvent, setSelectedEvent] = useState(null); // Store selected event for details

    // Fetch events from API
    useEffect(() => {
        axios.get("http://localhost:5000/api/createEvent")
            .then(response => setCart(response.data))
            .catch(error => console.error("Error fetching events:", error));
    }, []);

    // Remove event from cart and database
    const removeFromCart = (eventId) => {
        axios.delete(`http://localhost:5000/api/createEvent/${eventId}`)
            .then(() => {
                setCart(cart.filter(item => item._id !== eventId));
            })
            .catch(error => console.error("Error removing event:", error));
    };

    // Open edit form with existing data
    const openEditForm = (event) => {
        setEditingEvent(event);
    };

    // Open View Details Modal
    const openViewDetails = (event) => {
        setSelectedEvent(event);
        setShowModal(true); // Show the modal
    };

    // Close modal
    const closeModal = () => {
        setShowModal(false);
        setSelectedEvent(null);
    };

    // Get category-specific image
    const getCategoryImage = (category) => {
        switch (category) {
            case "Anniversaire":
                return "http://localhost:5000/public/anniv1.jpg";
            case "Marriage":
                return "http://localhost:5000/public/marriage1.jpg";
            case "Funeraille":
                return "http://localhost:5000/public/funeraille.jpg";
            case "Fête Personnalisée":
                return "http://localhost:5000/public/buffet1.jpg";
            case "Baptême":
                return "http://localhost:5000/public/bapt1.jpg";
            case "Sbou3":
                return "http://localhost:5000/public/bapt1.jpg";
            default:
                return "http://localhost:5000/public/default.jpg";
        }
    };

    return (
        <div className="page-container">
            <div className="content-wrap">
                <h1>Mes Evenements</h1>

                {cart.length === 0 ? (
                    <p>No items in cart</p>
                ) : (
                    <div className="cart">
                        {cart.map(event => (
                            <div key={event._id} className="cart-item">
                                <img src={getCategoryImage(event.category)} alt={event.name} className="cart-image" />
                                <div>
                                    <h3>{event.name}</h3>
                                    <p>{event.description}</p>
                                    <p><strong>Price:</strong> {event.price || 0} MAD</p>
                                </div>
                                <div>
                                    <button onClick={() => removeFromCart(event._id)}>Remove</button>
                                    <button onClick={() => openEditForm(event)}>Edit</button>
                                    <button onClick={() => openViewDetails(event)}>View Details</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Render the Reserver form only when editing */}
                {editingEvent && <Reserver editingEvent={editingEvent} setEditingEvent={setEditingEvent} />}

                {/* Modal for View Details */}
                {showModal && selectedEvent && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={closeModal}>×</span>
                            <h2>Event Details</h2>
                            <p><strong>Name:</strong> {selectedEvent.name}</p>
                            <p><strong>Description:</strong> {selectedEvent.description}</p>
                            <p><strong>Category:</strong> {selectedEvent.category}</p>
                            <p><strong>Price:</strong> {selectedEvent.price} MAD</p>
                            <p><strong>Event Date:</strong> {selectedEvent.eventDate}</p>
                            <p><strong>Services:</strong> {selectedEvent.services.join(", ")}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
