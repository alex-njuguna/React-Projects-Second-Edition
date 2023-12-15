import './Task.css'

function Task({title, body}) {

    return (
        <div className='Task-Wrapper'>
            <h3>{title}</h3>
            <p>{body}</p>
        </div>
    )
}

export default Task