import { Topbar } from "./components/Topbar";
import { Navigate, Route, Routes } from "react-router-dom";
import { AddContact } from "./components/AddContact";
import { ContactList } from "./components/ContactList";
import { EditContact } from "./components/EditContact";
function App() {
  return (
    <>
      <Topbar />
      <Routes>
        <Route path="/" element={<Navigate to={"/contacts/list"} />} />
        <Route path="/contacts/list" element={<ContactList />} />
        <Route path="/contacts/add" element={<AddContact />} />
        <Route path="/contacts/edit/:contactId" element={<EditContact />} />
      </Routes>
    </>
  );
}

export default App;
