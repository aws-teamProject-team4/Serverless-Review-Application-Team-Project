import React, { Component } from 'react';
import axios from 'axios';
import "./Form.css";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chkId: '',
      chkPw: '',
      isLoggedIn: false,
      isError: false,
      loginMessage: '',
      errorMessage: '',
      systemMessage: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleGetAllItem = this.handleGetAllItem.bind(this);

  }

  handleChange(event) {
    const inputValue = event.target.value;
    const stateField = event.target.name;
    this.setState({
      [stateField]: inputValue,
    });
    console.log(this.state);
  }
    // 전체 데이터 조회
    async handleGetAllItem(event) {
      event.preventDefault();
      try {
        const response = await axios.get(`/items`);
        this.setState({
          items: response.data,
          systemMessage: `전체 데이터 조회 성공!!!`
        });
        console.log('handleGetItem state:', this.state, response);
      } catch (error) {
        console.error('Error get item:', error);
        this.setState({ systemMessage: `전체 데이터 조회 실패...` });
      }
    }

  // 로그인
  async handleLogin(event) {
    event.preventDefault();
    const { chkId, chkPw } = this.state;
    try {
      const response = await axios.get(`/items/${chkId}`);
      const item = response.data;

      if (item && item.pw === chkPw) {
        this.setState({
          isLoggedIn: true,
          isError: false,
          loginMessage: `ID ${chkId} 로그인 성공!!!`,

        });
      } else {
        this.setState({
          isLoggedIn: false,
          isError: true,
          errorMessage: '로그인 실패 (ID 또는 비밀번호가 일치하지 않습니다)...',
        });
      }
    } catch (error) {
      console.error('Error get item:', error);
      this.setState({
        isLoggedIn: false,
        isError: true,
        errorMessage: '로그인 실패 (해당 ID 없음)...',
      });
    }
  }

  render() {
    const { isLoggedIn, isError, loginMessage, errorMessage, systemMessage } = this.state;

    return (
      <div  className="form-wrapper">
        {/* Display System Message */}
        <h1 className="system-message">{systemMessage}</h1>
        <h1>Login Page</h1>

         {/* Login */}
         <div className="form-container">
          <form onSubmit={this.handleLogin} className="form-item">
            <label> ** Login ** </label>
            <div className="input-field">
              <input
                type="text"
                name="chkId"
                onChange={this.handleChange}
                value={this.state.chkId}
                placeholder="id"
              />
            </div>
            <div className="input-field">
              <input
                type="text"
                name="chkPw"
                onChange={this.handleChange}
                value={this.state.chkPw}
                placeholder="pw"
              />
            </div>
            <button type="submit" className="signup-button">Login</button>
          </form>
        </div>

        {/* Display Login Result */}
        {isLoggedIn && <h1 className="login-message">{loginMessage}</h1>}
        {isError && <h1 className="error-message">{errorMessage}</h1>}

        {/* Get All Items Button */}
       <button
        type="button"
        className="custom-button get-items-button"
        onClick={this.handleGetAllItem}
        >
       Get All Items
     </button>

      {/* List output */}
      {Array.isArray(this.state.items) &&
       this.state.items.map((item, index) => (
         item && (
           <div key={index} className="item-container">
             <p>Created Date: {item.date}</p>
             <p>ID: {item.id}</p>
             <p>Password: {item.pw}</p>
             <p>Name: {item.name}</p>
           </div>
         )
       ))}
      </div>

     
    );

    
  }
}

export default Login;