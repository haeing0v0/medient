import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./page/home/Home";
import DrugSearch from "./page/drug/DrugSearch";
import DrugDetail from "./page/drug/DrugDetail";
import Login from "./page/member/Login";
import Join from "./page/member/Join";
// import DurCheck from "./page/dur/DurCheck";
// import MyDrugList from "./page/mydrug/MyDrugList";
// import Stats from "./page/stats/Stats";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/drugs" element={<DrugSearch />} />
          <Route path="/drugs/:itemSeq" element={<DrugDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          {/* <Route path="/my-drugs" element={<MyDrugList />} />
          <Route path="/dur-check" element={<DurCheck />} />
          <Route path="/stats" element={<Stats />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
