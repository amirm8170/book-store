import React, { useState } from "react";
import Api from "../../utils/Api";

const UpdateBook = () => {
  const [id, setId] = useState("");
  const [id2, setId2] = useState("");
  const [state, setState] = useState({});
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await Api.put(`/books/${id}`,{...state});
      alert(`${res.data.newBook.title} updated`)
      setId('')
      setState({})
    } catch (error) {
      alert(error.response.data.error.errorMessage)
    }
  };
  const submitHandler2 = async (e) => {
    e.preventDefault();
    try {
      const res = await Api.delete(`/books/${id2}`);
      alert(`${res.data.title} deleted`)
      setId2('')
    } catch (error) {
      alert(error.response.data.error.errorMessage)
    }
  };
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const onchangeHandler = (e) => {
    setId(e.target.value);
  };
  const onchangeHandler2 = (e) => {
    setId2(e.target.value);
  };
  return (
    <div className="container">
      <div className="get-container">
        <div className="form-container-get">
          <form onSubmit={submitHandler} className="form-add">
            <label>
              id
              <input
                type="text"
                onChange={onchangeHandler}
                name="id"
                value={id || ''}
              />
            </label>
            <label>
              title
              <input
                type="text"
                onChange={changeHandler}
                name="title"
                value={state.title || ''}
              />
            </label>
            <label>
              description
              <input
                type="text"
                onChange={changeHandler}
                name="description"
                value={state.description || ''}
              />
            </label>
            <label>
              author
              <input
                type="text"
                onChange={changeHandler}
                name="author"
                value={state.author || ''}
              />
            </label>
            <label>
              year
              <input
                type="text"
                onChange={changeHandler}
                name="year"
                value={state.year || ''}
              />
            </label>
            <label>
              cover
              <input
                type="text"
                onChange={changeHandler}
                name="cover"
                value={state.cover || ''}
              />
            </label>
            <button type="submit">Edit book</button>
          </form>
        </div>
        <div className="form-container-get">
          <form onSubmit={submitHandler2} className="form-add">
            <label>
              id
              <input
                type="text"
                onChange={onchangeHandler2}
                name="id"
                value={id2 || ''}
              />
            </label>
            <button type="submit">Delete book</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateBook;
