import '../Card/Card.css';

function Card() {
    const events = [
        { img: "http://localhost:5000/marriage1.jpg", title: "Marriage" },
        { img: "http://localhost:5000/marriage1.jpg", title: "Anniversaire" },
        { img: "http://localhost:5000/marriage1.jpg", title: "Funerailles" },
        { img: "http://localhost:5000/marriage1.jpg", title: "Fêtes Personnalisées" }
    ];

    return (
        <div className="event-section">
            <h2 className="event-title">NOS EVENEMENTS</h2>
            <div className="event-grid">
                {events.map((event, index) => (
                    <div key={index} className="event-card">
                        <div 
                            className="event-image" 
                            style={{ backgroundImage: `url(${event.img})` }}
                        ></div>
                        <h3 className="event-name">{event.title}</h3>
                        <p className="event-info">2,345 properties • 746 miles away</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Card;
