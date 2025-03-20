import '../Card/Card.css';

function Card({ event }) {
    return (
        <div className="event-card">
            <div 
                className="event-image" 
                style={{ backgroundImage: `url("http://${event.picture}")` }} 
            ></div>
            <h3 className="event-name">{event.name}</h3>
            <p className="event-info">{event.feedback}</p>
        </div>
    );
}

export default Card;
