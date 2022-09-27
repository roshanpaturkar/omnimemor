import styled from "styled-components";

const Task = (task) => {
  return (
    <TaskStyle isDone={task.task.completed}>
      <h4>{task.task.completed ? <span style={{ textDecoration: 'line-through' }}>{task.task.description}</span> : task.task.description}</h4>
      <ButtonRow>
        <Button isDeleteButton={false}>{task.task.completed? 'Undo': 'Done'}</Button>
        <Button isDeleteButton={true}>Delete</Button>
      </ButtonRow>
    </TaskStyle>
  );
};

export default Task;

const TaskStyle = styled.div`
  padding: 10px;
  border: 1px solid black;
  border-radius: 5px;
  margin: 10px;
  background-color: ${props => props.isDone ? 'lightgray' : 'white'};
`

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  justify-content: center;
  gap: 10px;
`

const Button = styled.button`
  background-color: ${props => props.isDeleteButton ? "white" : "black"};
  color: ${props => props.isDeleteButton ? "black" : "white"};
  border-radius: 5px;
`
