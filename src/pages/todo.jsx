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
    const [Tasks, setTasks] = useState([])
    const [newTask, setNewTask] = useState('')
    useEffect(() => {

        //save it to localstorage
    }, [newTask, Tasks])
    const addTask = (event) => {
        event.preventDefault();
        // add the new task to the array and clean the input
        if (newTask !== '') {
            Tasks.push({
                id: Tasks.length + 1,
                title: newTask,
                completed: false,
                deleted: false
            })
        }
        document.title = `TO-DOs - Created: ${newTask}`
        setNewTask('')
    }
    function completeTask(id) {
        const NewTasks = Tasks.map(x => x)
        const completed = NewTasks.find(task => task.id === id)
        completed.completed = !completed.completed
        document.title = completed.completed ? `TO-DOs - Completed: ${completed.title}` : `TO-DOs - Redoing: ${completed.title}`
        setTasks(NewTasks)

    }
    function deleteTask(id) {
        const NewTasks = Tasks.map(x => x)
        const deleted = NewTasks.find(task => task.id === id)
        document.title = `TO-DOs - Deleted: ${deleted.title}`
        deleted.title = 'deleted'
        deleted.deleted = true
        setTasks(NewTasks)

    }
    const handleTaskChange = event => {
        setNewTask(event.target.value);
        // make the title dynamic
        document.title = newTask === '' ? 'TO-DOs App' : `TO-DOs - New Task: ${newTask}`
    }
//     const tasks = [
//         {
//             id: 1,
//             title: 'code',
//             status: true
//
//         },
//         {
//             id: 2,
//             title: 'sleep',
//             status: true
//
//         },
// ]
    return (

        <Container>
            <NewTaskContainer>
                <span>Total: {Tasks.filter(undel => !undel.deleted).length}</span>
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