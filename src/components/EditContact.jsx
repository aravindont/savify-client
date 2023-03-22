import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ContactService } from "../services/ContactService";
import { Spinner } from "./Spinner";

export const EditContact = () => {
  let { contactId } = useParams();
  let navigate = useNavigate();
  let [state, setState] = useState({
    loading: false,
    contact: {
      name: "",
      photo: "",
      mobile: "",
      email: "",
      company: "",
      title: "",
      groupId: "",
    },
    groups: [],
    errorMessage: "",
  });
  useEffect(() => {
    async function handleResp() {
      try {
        setState({ ...state, loading: true });
        const response = await ContactService.getContact(contactId);
        const groupResponse = await ContactService.getGroups();
        setState({
          ...state,
          loading: false,
          contact: response.data,
          groups: groupResponse.data,
        });
      } catch (err) {
        setState({ ...state, loading: false, errorMessage: err.message });
      }
    }
    handleResp();
  }, [contactId]);
  let handleInput = (event) => {
    setState({
      ...state,
      contact: {
        ...state.contact,
        [event.target.name]: event.target.value,
      },
    });
  };
  let { loading, contact, groups, errorMessage } = state;
  const submitForm = async (event) => {
    event.preventDefault();

    try {
      const response = await ContactService.updateContact(contact, contactId);
      if (response) {
        navigate("/contacts/list", { replace: true });
      }
    } catch (err) {
      setState({ ...state, errorMessage: err.message });
      navigate(`/contacts/edit/${contactId}`, { replace: false });
    }
  };
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="add-contact p-3">
            <div className="container">
              <div className="row">
                <div className="col">
                  <p className="h3 text-primary fw-bold">Edit Contact</p>
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col-md-4">
                  <form onSubmit={submitForm}>
                    <div className="mb-2">
                      <input
                        required={true}
                        name="name"
                        value={contact.name}
                        onChange={handleInput}
                        type="text"
                        placeholder="Name"
                        className="form-control"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        required={true}
                        name="photo"
                        value={contact.photo}
                        onChange={handleInput}
                        type="text"
                        placeholder="Photo Url"
                        className="form-control"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        required={true}
                        name="mobile"
                        value={contact.mobile}
                        onChange={handleInput}
                        type="number"
                        placeholder="Mobile"
                        className="form-control"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        required={true}
                        name="email"
                        value={contact.email}
                        onChange={handleInput}
                        type="email"
                        placeholder="Email"
                        className="form-control"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        required={true}
                        name="company"
                        value={contact.company}
                        onChange={handleInput}
                        type="text"
                        placeholder="Company"
                        className="form-control"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        required={true}
                        name="title"
                        value={contact.title}
                        onChange={handleInput}
                        type="text"
                        placeholder="Title"
                        className="form-control"
                      />
                    </div>
                    <div className="mb-2">
                      <select
                        required={true}
                        name="groupId"
                        value={contact.groupId}
                        onChange={handleInput}
                        className="form-control"
                      >
                        <option value="">Select a Group</option>
                        {groups.length > 0 &&
                          groups.map((group) => {
                            return (
                              <option key={group.id} value={group.id}>
                                {group.name}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                    <div className="mb-2">
                      <input
                        type="submit"
                        className="btn btn-primary"
                        value="Update"
                      />
                      <Link to={`/contacts/list`} className="btn btn-dark ms-2">
                        Cancel
                      </Link>
                    </div>
                  </form>
                </div>
                <div className="col-md-6">
                  <img
                    src={contact.photo}
                    alt="avatar"
                    className="contact-img"
                  />
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};
