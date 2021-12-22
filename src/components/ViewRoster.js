import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import { getRoster } from '../services/rosterServices';
import { useGlobalState } from '../utils/stateContext';
import { deleteRoster } from '../services/rosterServices';

export default function ViewRoster() {
    const [roster, setRoster] = useState(null);
    const { id } = useParams();
    let navigate = useNavigate();
    const { store, dispatch } = useGlobalState();
    // const { loggedInUser } = store

    useEffect(() => {
        getRoster(id)
        .then((roster) => setRoster(roster))
        .catch((error) => console.log(error))
    }, [id])

    if(!roster) return null

    function handleDelete() {
        deleteRoster(id)
        .then(() => {
            dispatch({type: 'deleteRoster', data: id})
            navigate('/rosters')
        })
    }

    return (
        <div>
            <p>{roster.name}</p>
            <p>{roster.role}</p>
            <p>{roster.start_time}</p>
            <p>{roster.end_time}</p>
        </div>
    )
}
