import React from "react";
import { PROFILEUPD, REGISTER, SIGNIN } from "../../constants/constants";
import "./register.css";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      age: 0,
      pet: "",
      password: "",
    };
  }

  onNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  onAgeChange = (event) => {
    this.setState({ age: event.target.value });
  };

  onPetChange = (event) => {
    this.setState({ pet: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  saveAuthTokenInSession = (token) => {
    window.sessionStorage.setItem("token", token);
  };

  onSubmitSignUp = () => {
    fetch(REGISTER, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        age: this.state.age,
        pet: this.state.pet,
        password: this.state.password,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          fetch(SIGNIN, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: this.state.email,
              password: this.state.password,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.userId && data.success === "true") {
                this.saveAuthTokenInSession(data.token);
                fetch(PROFILEUPD + `${data.userId}`, {
                  method: "get",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: data.token,
                  },
                })
                  .then((resp) => resp.json())
                  .then((user) => {
                    if (user && user.email) {
                      this.props.loadUser(user);
                      this.props.onRouteChange("home");
                    }
                  });
              }
            });
        }
      });
  };

  onEnterPress = (event) => {
    if (event.key === "Enter") {
      this.onSubmitSignUp();
    }
  };

  render() {
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">
                  Name
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black"
                  type="text"
                  name="name"
                  id="name"
                  onChange={this.onNameChange}
                  onKeyPress={this.onEnterPress}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                  onKeyPress={this.onEnterPress}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="age">
                  Age
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black"
                  type="number"
                  name="age"
                  id="age"
                  onChange={this.onAgeChange}
                  onKeyPress={this.onEnterPress}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="pet">
                  Pet
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black"
                  type="text"
                  name="pet"
                  id="pet"
                  onChange={this.onPetChange}
                  onKeyPress={this.onEnterPress}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                  onKeyPress={this.onEnterPress}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.onSubmitSignUp}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register"
              />
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Register;
