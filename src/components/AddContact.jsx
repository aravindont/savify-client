import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContactService } from "../services/ContactService";

export const AddContact = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
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
  const updateInput = (event) => {
    setState({
      ...state,
      contact: {
        ...state.contact,
        [event.target.name]: event.target.value,
      },
    });
  };
  let { loading, contact, groups, errorMessage } = state;
  useEffect(() => {
    async function handleResp() {
      try {
        setState({ ...state, loading: true });
        const response = await ContactService.getGroups();

        setState({
          ...state,
          loading: false,
          groups: response.data,
        });
      } catch (err) {
        setState({ ...state, loading: false, errorMessage: err.message });
      }
    }
    handleResp();
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await ContactService.createContact(state.contact);

      if (response) {
        navigate("/contacts/list", { replace: true });
      }
    } catch (err) {
      setState({ ...state, errorMessage: err.message });
      navigate("/contacts/add", { replace: false });
    }
  };
  return (
    <div>
      <section className="add-contact p-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h3 text-success fw-bold">Create Contact</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <form onSubmit={submitForm}>
                <div className="mb-2">
                  <input
                    required={true}
                    name="name"
                    value={contact.name}
                    onChange={updateInput}
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
                    onChange={updateInput}
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
                    onChange={updateInput}
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
                    onChange={updateInput}
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
                    onChange={updateInput}
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
                    onChange={updateInput}
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
                    onChange={updateInput}
                    className="form-control"
                  >
                    <option value="">Select a Group</option>
                    {groups.length > 0 &&
                      groups.map((group) => {
                        return (
                          <option value={group.id} key={group.id}>
                            {group.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="mb-2">
                  <input
                    type="submit"
                    className="btn btn-success"
                    value="Create"
                  />
                  <Link to={`/contacts/list`} className="btn btn-dark ms-2">
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
