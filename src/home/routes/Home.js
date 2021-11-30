import {useState, React} from 'react';
import Owner from '../components/Owner';
import MainSearch from '../components/MainSearch';

function Home() {
    return(
      <>
        <div style={{
          textAlign: "right"
        }}>
          <Owner placement="end" />
        </div>
        <div>
          <MainSearch />
        </div>
      </>
    );
}

export default Home;