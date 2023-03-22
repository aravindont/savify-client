import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ContactService } from "../services/ContactService";
import { Spinner } from "./Spinner";

export const ContactList = () => {
  const [query, setQuery] = useState({
    text: "",
  });

  const [state, setState] = useState({
    loading: false,
    contacts: [],
    filteredContacts: [],
    group: {},
    errorMessage: "",
  });
  useEffect(() => {
    async function handleResp() {
      try {
        setState({ ...state, loading: true });
        const response = await ContactService.getAllContacts();
        setState({
          ...state,
          loading: false,
          contacts: response.data,
          filteredContacts: response.data,
        });
      } catch (err) {
        setState({ ...state, loading: false, errorMessage: err.message });
      }
    }
    handleResp();
  }, []);

  const clickDelete = async (contactId) => {
    try {
      const response = await ContactService.deleteContact(contactId);
      if (response) {
        setState({ ...state, loading: true });
        const response = await ContactService.getAllContacts();
        setState({
          ...state,
          loading: false,
          contacts: response.data,
          filteredContacts: response.data,
        });
      }
    } catch (err) {
      setState({ ...state, loading: false, errorMessage: err.message });
    }
  };
  const searchContacts = (event) => {
    setQuery({ ...query, text: event.target.value });
    let theContacts = state.contacts.filter((contact) => {
      return contact.name
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    setState({
      ...state,
      filteredContacts: theContacts,
    });
  };
  let { loading, contacts, filteredContacts, errorMessage } = state;
  return (
    <>
      <section className="contact-search p-5">
        <div className="container">
          <div className="grid">
            <div className="col">
              <div className="row">
                <p className="h3">
                  Contact List
                  <Link to={"/contacts/add"} className="btn btn-primary ms-2">
                    <i className="fa fa-plus-circle me-2" /> New
                  </Link>
                </p>
                <p className="fst-italic">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
                  officia consectetur pariatur aut quae suscipit sunt similique
                  autem doloremque repellat.
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <form className="row">
                  <div className="col">
                    <div className="mb-2">
                      <input
                        name="text"
                        value={query.text}
                        type="text"
                        onChange={searchContacts}
                        className="form-control"
                        placeholder="search names"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-2">
                      <input
                        type="submit"
                        value="Search"
                        className="btn btn-outline-dark"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {loading ? (
        <Spinner />
      ) : (
        <section className="contact-list">
          <div className="container">
            <div className="row">
              {filteredContacts.length > 0 &&
                filteredContacts.map((contact) => {
                  return (
                    <div className="col-md-6 " key={contact.id}>
                      <div className="card my-2">
                        <div className="card-body">
                          <div className="row d-flex align-items-center justify-content-around p-2">
                            <div className="col-md-4 img-fluid">
                              <img
                                src={contact.photo}
                                alt="avatar"
                                className="contact-img"
                              />
                            </div>
                            <div className="col-md-7">
                              <ul className="list-group">
                                <li className="list-group-item list-group-item-action">
                                  Name:
                                  <span className="fw-bold">
                                    {contact.name}
                                  </span>
                                </li>
                                <li className="list-group-item list-group-item-action">
                                  Phone:
                                  <span className="fw-bold">
                                    {contact.mobile}
                                  </span>
                                </li>
                                <li className="list-group-item list-group-item-action">
                                  Email:
                                  <span className="fw-bold">
                                    {contact.email}
                                  </span>
                                </li>
                              </ul>
                            </div>
                            <div className="col-md-1 d-flex flex-md-column align-items-center justify-content-center mt-md-0 mt-4">
                              <Link
                                to={`/contacts/view/${contact.id}`}
                                className="btn btn-warning my-md-2 me-md-0 me-4"
                              >
                                <i className="fa fa-eye" />
                              </Link>
                              <Link
                                to={`/contacts/edit/${contact.id}`}
                                className="btn btn-primary my-md-2 me-md-0 me-4"
                              >
                                <i className="fa fa-pen" />
                              </Link>
                              <button
                                className="btn btn-danger my-md-2 me-md-0 me-4"
                                onClick={() => clickDelete(contact.id)}
                              >
                                <i className="fa fa-trash" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </section>
      )}
    </>
  );
};
