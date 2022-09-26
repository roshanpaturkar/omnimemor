import styled from "styled-components";

const Sidebar = () => {
  return (
    <SidebarStyle>
      <h1>Sidebar</h1>
      <h2>Name</h2>
      <h3>Email</h3>
    </SidebarStyle>
  );
};

const SidebarStyle = styled.nav`
  width: 25vw;
  height: 100vh;
  background-color: black;
  position: sticky;
  top: 0;
  left: 0;
  padding: 20px;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 15px;
  h1 {
    font-size: 4rem;
  }
`;

export default Sidebar;
