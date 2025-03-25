import '../../pages/Events/Events.css'
import Card from '../../components/Card/Card.jsx'
import { useEffect , useState } from 'react';
import { Link } from 'react-router-dom';

function Events(){
    const [events , setEvents]=useState([])
    const [loading , setLoading]=useState(true)
    useEffect(() => {
            fetch('http://localhost:5000/api/events') 
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setEvents(data); 
                    setLoading(false); 
                })
                .catch(error => {
                    console.error('There has been a problem with your fetch operation:', error);
                    setLoading(false); 
                });
        }, []); 
    return(
        <>
        <div className='titles'>
            <h1>Nos Evenements</h1>
            <hr />
        </div>

        <div className='event-list'>
            {loading ? (
                <p>Loading events...</p>
            ) : (
                events.map(event => (
                    <Link to={`/Details_event/${event._id}`}>

                    <Card key={event._id} event={event} /> 
                    
                    </Link>
                ))
            )}
            <hr />
        </div></>

 
    )
}
export default Events ; 