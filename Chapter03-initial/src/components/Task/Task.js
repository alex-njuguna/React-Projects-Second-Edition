import './Task.css'

function Task({ id, title, body, onDragStart}) {

    return (
        <div className='Task-Wrapper' draggable onDragStart={(e) => onDragStart(e, id)}>
            <h3>{title}</h3>
            <p>{body}</p>
        </div>
    )
}

export default Task