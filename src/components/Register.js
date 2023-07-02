import React, { useEffect, useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";
import { useNavigate, useParams } from "react-router-dom";

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="invalid-feedback d-block">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="invalid-feedback d-block">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="invalid-feedback d-block">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const Register = (props) => {
  const form = useRef();
  const checkBtn = useRef();
  const navigate = useNavigate();
  const { id } = useParams();
  const [username, setUsername] = useState("");
  const [Name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangName = (e) => {
    const name = e.target.value;
    setName(name);
  };
  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      if(id){
        console.log('update',Name, username, email, password, id)
        AuthService.registerUpdate(Name, username, email, password, id).then(
          (response) => {
            setMessage(response);
            setSuccessful(true);
            AuthService.loadAllusers();
            setTimeout(() => {
              navigate('/users');
              window.location.reload();
            }, 3000);
          },
          (error) => {
            setMessage(error);
            setSuccessful(false);
          }
        );
      }else{
        AuthService.register(Name,username, email, password).then(
          (response) => {
            setMessage(response);
            setSuccessful(true);
            const user = AuthService.getCurrentUser(); 
            setTimeout(() => { 
              if(!user){
                navigate('/login');
              }else{
                navigate('/users');
              }
             
              window.location.reload();
            }, 1500);
          },
          (error) => {
            setMessage(error);
            setSuccessful(false);
          }
        );
      }
    }
  };

  useEffect(() => {
    if(id){
      const users = JSON.parse(localStorage.getItem('users'));
      const user = users.find(u => u._id === id);
      setUsername(user.username);
      setName(user.name);
      setEmail(user.email);
      // setPassword(user.password);
    }
  }, []);

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>

              <div className="form-group">
                <label htmlFor="name">Name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="name"
                  value={Name}
                  onChange={onChangName}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required, vusername]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>
              {id?
              <div className="form-group">
              <button className="btn btn-primary btn-block">Update</button>
            </div>:
            <div className="form-group">
            <button className="btn btn-primary btn-block">Sign Up</button>
          </div>}
              
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Register;
