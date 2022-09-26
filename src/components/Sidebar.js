import styled from "styled-components";

const Sidebar = () => {
    return (
        <SidebarStyle>
            <h1>Sidebar</h1>
            <h1>Name</h1>
            <h3>Email</h3>
        </SidebarStyle>
    );
};

const SidebarStyle = styled.nav`
   width: 250px;
   height: 100%;
   background-color: grey;
`;

export default Sidebar;
