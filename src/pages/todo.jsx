import styled from "styled-components";
import {useEffect, useState} from "react";

const Container = styled.div`
display:flex;
align-items:center;
justify-content: center;
// height: 100vh;
flex-direction: column;
`;
const NewTaskContainer = styled.div`
display:flex;
`
const TasksContainer = styled.div`
position: relative;
display: flex;
align-items: center;
justify-content: center;
flex-wrap: wrap;`;
const TaskContainer = styled.div`
font-weight: ${props => props.status === false ? 'bold' : 'normal'};
text-decoration: ${props => props.status === false ? 'none' : 'line-through'};
color: ${props => props.status === false ? 'black' : 'white'};
border: 1px solid black;
width: 400px;
margin: 0.5rem;
padding: 1rem;
background-color: ${props => props.status === false ? 'rgba(20, 100, 20, 0.8)' : 'rgba(100,0,255,.5)'};
`;
const Task = styled.h3``;
const Input = styled.input``;
const Button = styled.button``;
const Todo = () => {
    let Tasks = []
    let [stat, setStat] = useState(0)
    // let [Tasks, setTasks] = useState([])
    // let [Tasks, setTasks] = useState([])
    const [newTask, setNewTask] = useState('')
    useEffect(() => {
        // setTasks(Tasks)

        //save it to localstorage
    }, [newTask, stat])
    const addTask = (event) => {
        event.preventDefault();
        // add the new task to the array and clean the input
        if (newTask !== '') {
            const taskObject = {
                id: localStorage.length + 1,
                title: newTask,
                completed: false,
                deleted: false
            }
            localStorage.setItem(`todoappid${localStorage.length + 1}`, JSON.stringify(taskObject))
        }
        document.title = `TO-DOs - Created: ${newTask}`
        setNewTask('')
        updateLocalStorage()
    }
    function completeTask(id) {
        const completed = Tasks.find(task => task.id === id)
        completed.completed = !completed.completed
        document.title = completed.completed ? `TO-DOs - Completed: ${completed.title}` : `TO-DOs - Redoing: ${completed.title}`
        updateLocalStorage()

    }
    function deleteTask(id) {
        const deleted = Tasks.find(task => task.id === id)
        document.title = `TO-DOs - Deleted: ${deleted.title}`
        deleted.title = 'deleted'
        deleted.deleted = true
        updateLocalStorage()
    }
    const handleTaskChange = event => {
        setNewTask(event.target.value);
        // make the title dynamic
        document.title = newTask === '' ? 'TO-DOs App' : `TO-DOs - New Task: ${newTask}`
    }
    function destructureLocalObject (id) {
        return JSON.parse(localStorage.getItem(id))
    }
    function updateLocalStorage() {
        // console.log('Updating localStorage')
        for (let i=0; i <= Tasks.length; i++) {
            if (Tasks[i]) {
                localStorage.setItem(`todoappid${Tasks[i].id}`, JSON.stringify(Tasks[i]))
            }
        }
        setStat(Tasks)
    }
    for (let j = 1; j <= localStorage.length; j++ ) {
        if (destructureLocalObject(`todoappid${j}`) !== null) {
            Tasks.push(destructureLocalObject(`todoappid${j}`))
        }
    }
    return (
        <Container>
            <NewTaskContainer>
                <span>Total: {Tasks.filter(unDel => !unDel.deleted).length}</span>
                <form onSubmit={addTask}>
                    <Input value={newTask} onChange={handleTaskChange} placeholder="new task"/>
                    <Button type="submit">Add</Button>
                </form>
            </NewTaskContainer>
            <TasksContainer>

                {Tasks.filter(task => task.deleted === false).map(task =>
                    <TaskContainer key={task.id} status={task.completed}>
                        <Button onClick={() => {completeTask(task.id)}}>{task.completed ? 'reDo' : 'Done'}</Button>
                        <Button onClick={() => {deleteTask(task.id)}}>Delete</Button>
                        <Task>{task.title}</Task>
                    </TaskContainer>
                )}
            </TasksContainer>
        </Container>
    )
};

export default Todo;