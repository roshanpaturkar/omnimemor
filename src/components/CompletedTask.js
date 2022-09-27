import styled from "styled-components";

const CompletedTask = (task) => {
    return (
        <TaskStyle>
            <h4><span style={{ textDecoration: 'line-through' }}>{task.task.description}</span></h4>
            <ButtonRow>
                <UndoButton>Undo</UndoButton>
                <DeleteButton>Delete</DeleteButton>
            </ButtonRow>
        </TaskStyle>
    );
};

export default CompletedTask;

const TaskStyle = styled.div`
    background-color: lightgray;
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

const UndoButton = styled.button`
  background-color: orange;
  color: white;
  width: 50%;
`

const DeleteButton = styled.button`
  background-color: #fa2323;
  color: white;
  width: 50%;
`
