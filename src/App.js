import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchDetail from "./searchdetail/routes/SearchDetail";
import Wrapper from "./businessesdetail/wrapper";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/businesses"                 element={<SearchDetail />} />
        <Route exact path="/businesses/:enterpriseCode" element={<Wrapper userType="owner" />} />
      </Routes>
    </Router>
  );
}

export default App;
