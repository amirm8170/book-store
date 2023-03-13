import Cookies from "js-cookie";
import React, { useState } from "react";
import Api from "../../utils/Api";

const Token = ({refreshToken , setTab}) => {
  const [name, setName] = useState("");
  const setTokenValue = (res) => {
    const { accessToken, refreshToken } = res;
    Cookies.set("Token", accessToken);
    sessionStorage.setItem("refreshToken", refreshToken);
  };
  const setTokenValue2 = (res) => {
    const { accessToken } = res;
    Cookies.set("Token", accessToken);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await Api.post("/token", { name });
      setTokenValue(res.data);
      setTab(0)
    } catch (error) {
      alert(error.response.data.error.errorMessage)
    }
  };
  const changeHandler = (e) => {
    setName(e.target.value);
  };
  const refreshTokenHandler = async () => {
    try {
      const res = await Api.post('/token/renew' , {refreshToken:refreshToken})
      setTokenValue2(res.data);
      setTab(0)
    } catch (error) {
      alert(error.response.data.error.errorMessage)
    }
  }
  return (
    <div className="container center books">
      {refreshToken.length>0 ? <button onClick={refreshTokenHandler}>refresh token</button> : 
      <form className="form-" onSubmit={submitHandler}>
        <label>
          name
          <input type="text" value={name} onChange={changeHandler} />
        </label>
        <button type="submit">send data</button>
      </form>
      }
    </div>
  );
};

export default Token;
