import React, { useState } from "react";
import Api from "../../utils/Api";

const AddBook = () => {
  const [addedBook , setAddedBook] = useState({})
  const [state, setState] = useState({
    title: "",
    description: "",
    author: "",
    year: "",
    cover: "",
  });
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await Api.post('/books',{...state})
      setAddedBook(res.data)
      setState({
        title: "",
        description: "",
        author: "",
        year: "",
        cover: "",
      })
    } catch (error) {
      console.log(error)
      alert(error.response.data.error.errorMessage)
    }
  };
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  return (
    <div className="form">
      <form onSubmit={submitHandler} className="form-add">
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
        <button type="submit">send data</button>
      </form>
      {addedBook.title && <div>
        <h1>this book added</h1>
        <div>
          <p>id: {addedBook._id}</p>
          <p>title :{addedBook.title}</p>
          <p>author: {addedBook.author}</p>
          <p>year: {addedBook.year}</p>
          <p>description: {addedBook.description}</p>
          <p>cover: {addedBook.cover}</p>
          </div>
      </div>}
    </div>
  );
};

export default AddBook;
