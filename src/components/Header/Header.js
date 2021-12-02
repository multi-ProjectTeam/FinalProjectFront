import styled from "styled-components";

const Container = styled.div`
  display: flex;
  margin-bottom: 150px;
`;

const Title = styled.span`
  font-size: 2.2rem;
  font-weight: bold;
  line-height: 70px;
`;

const Header = () => {
  return (
    <Container>
      <Title>테이블 점유상태</Title>
      <ul>
        <li>창가자리:0/4</li>
        <li>일반자리:0/8</li>
      </ul>
    </Container>
  );
};

export default Header;
