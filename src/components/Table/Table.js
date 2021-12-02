import styled from "styled-components";
import { WindowIcon } from "../../asset";

const Container = styled.div`
  height: 250px;
  display: flex;
`;

const SeatContainer = styled.div`
  width: 1300px;
  height: 100%;
  display: flex;
  flex-wrap: wrap;

  @media only screen and (max-width: 1500px){
    width: 900px;
    
  }

  @media only screen and (max-width: 1160px){
    width: 692px;
    
  }

  @media only screen and (max-width: 960px){
    width: 468px;

  }
  
`;

const WindowSeatContainer = styled.div`
  width: 16.6666%;
  height: 185px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 0 0 16.6666%;
  align-items: center;
`;

const NomalSeatContainer = styled.div`
  width: 66.6666%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  flex: 0 0 66.6666%;
`;

const SeatPlace = styled.div`
  width: 25%;
  height: 50%;
  flex: 0 0 25%;
  display: flex;
  justify-content: center;
`;

const Seat = styled.div`
  width: 60px;
  height: 60px;
  background-color: #bebebe;
`;

const Img = styled.img`
  width: 100px;
  height: 100px;
  margin-top:50px;
  

  @media only screen and (max-width: 1500px){
    width: 80px;
    
  }

  @media only screen and (max-width: 1160px){
    width: 50px;
    
  }

  @media only screen and (max-width: 960px){
    width: 30px;

  }
`;

const Table = () => {
  return (
    <Container>
      <Img src = {WindowIcon} />
      <SeatContainer>
        <WindowSeatContainer>
          <Seat />
          <Seat />
        </WindowSeatContainer>
        <NomalSeatContainer>
          <SeatPlace><Seat /></SeatPlace>
          <SeatPlace><Seat /></SeatPlace>
          <SeatPlace><Seat /></SeatPlace>
          <SeatPlace><Seat /></SeatPlace>
          <SeatPlace><Seat /></SeatPlace>
          <SeatPlace><Seat /></SeatPlace>
          <SeatPlace><Seat /></SeatPlace>
          <SeatPlace><Seat /></SeatPlace>
        </NomalSeatContainer>
        <WindowSeatContainer>
          <Seat />
          <Seat />
        </WindowSeatContainer>
      </SeatContainer>
      <Img src={WindowIcon} />
    </Container>
  );
};

export default Table;
