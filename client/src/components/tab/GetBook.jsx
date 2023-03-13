import React, { useState } from "react";
import Api from "../../utils/Api";

const GetBook = () => {
  const [id, setId] = useState("");
  const [list , setList] = useState([])
  const onsubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await Api.get(`/books/${id}`);
      setList([res.data.book])
    } catch (error) {
      alert(error.response.data.error.errorMessage)
    }
  };

  const onchangeHandler = (e) => {
    setId(e.target.value);
  };

  const getAll = async () => {
    try {
      const res = await Api.get("/books");
      setList(res.data)
      setId('')
    } catch (error) {
      alert(error.response.data.error.errorMessage)
    }
  };
  return (
    <div className="container">
      <div className="get-container">
        <div className="form-container-get">
          <form onSubmit={onsubmitHandler}>
            <label>
              get a books
              <input
                type="text"
                name="id"
                value={id}
                onChange={onchangeHandler}
              />
            </label>
            <button type="submit">send data</button>
          </form>
        </div>
        <div className="form-container-get books">
          <button onClick={getAll}>get all books</button>
        </div>
      </div>
      <div className="container-list ">
        {list.map((item,index)=>{          
          return (<div key={index} className='mb'>
            <p>id : {item._id}</p>
            <p>title : {item.title}</p>
            <p>description : {item.description}</p>
            <p>author : {item.author}</p>
            <p>cover : {item.cover}</p>
            <p>createdAt : {item.createdAt}</p>
          </div>)
        })}
      </div>
    </div>
  );
};

export default GetBook;
