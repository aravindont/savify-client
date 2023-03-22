import { Topbar } from "./components/Topbar";
import { Navigate, Route, Routes } from "react-router-dom";
import { AddContact } from "./components/AddContact";
import { ContactList } from "./components/ContactList";
function App() {
  return (
    <>
      <Topbar />
      <Routes>
        <Route path="/" element={<Navigate to={"/contacts/list"} />} />
        <Route path="/contacts/list" element={<ContactList />} />
        <Route path="/contacts/add" element={<AddContact />} />
      </Routes>
    </>
  );
}

export default App;
