import '../Card/Card.css';

function Card({ event }) {
    return (
        <div className="event-card">
            <div 
                className="event-image" 
                style={{ backgroundImage: `url(http://localhost:5000/public/${event.image})` }} 
            ></div>
            <h3 className="event-name">{event.title}</h3>
            <p className="event-info">{event.description}</p>
        </div>
    );
}

export default Card;
