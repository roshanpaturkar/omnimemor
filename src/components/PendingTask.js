import styled from "styled-components";

const PendingTask = (task) => {
  return (
    <TaskStyle>
      <h4>{task.task.description}</h4>
      <ButtonRow>
        <DoneButton>Done</DoneButton>
        <DeleteButton>Delete</DeleteButton>
      </ButtonRow>
    </TaskStyle>
  );
};

export default PendingTask;

const TaskStyle = styled.div`
  padding: 10px;
  border: 1px solid black;
  border-radius: 5px;
  margin: 10px;
`

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  justify-content: center;
  gap: 10px;
`

const DoneButton = styled.button`
  background-color: #2C8943;
  color: white;
  width: 50%;
`

const DeleteButton = styled.button`
  background-color: #fa2323;
  color: white;
  width: 50%;
`
