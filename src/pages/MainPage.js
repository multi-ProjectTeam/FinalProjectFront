import styled from "styled-components";
import { Header, Table } from "../components";

const Container = styled.div`
  
  margin: 0 auto;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainPage = () => {
  return (
    <Container>
      <Header />
      <Table />
    </Container>
  );
};

export default MainPage;
