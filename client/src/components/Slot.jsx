const Slot = ({ startTime, endTime, isCurrent, onClick, name, id }) => {
    return (
        <div>
            <h3>{new Date(startTime).toLocaleTimeString()} - {new Date(endTime).toLocaleTimeString()}</h3>
            <p>{name}</p>
            {isCurrent && <button onClick={() => onClick(id)}>Join Meet</button>}
        </div>
    )
}

export default Slot;