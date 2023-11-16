import { useState } from 'react';

import CloseIcon from '../../assets/icons/close.svg';
import EyeIcon from '../../assets/icons/eye.svg';
import GoogleIcon from '../../assets/icons/google.svg';
import Logo from '../../assets/logo.svg';
import './styles.css';

function FormHome() {
  const [formActive, setFormActive] = useState(1);

  function activeForm(value: number) {
    console.log(value);
    setFormActive(value);
  }

  console.log(formActive);

  if (formActive === 1) {
    return (
      <aside className="form-container">
        <div className="change-form">
          <button onClick={() => activeForm(1)}>Sign in</button>
          <button onClick={() => activeForm(0)} className="active">
            Register
          </button>
        </div>
        <div className="title">
          <h3>Welcome to</h3>
          <img src={Logo} alt="Checkr" />
        </div>

        <form>
          <label htmlFor="">
            <input type="text" placeholder="Digite seu Email" />
            <img src={CloseIcon} alt="" />
          </label>

          <label htmlFor="">
            <input
              type="password"
              name=""
              id=""
              placeholder="Digite sua senha"
            />
            <img src={EyeIcon} alt="" />
          </label>
          <button className="signIn">Sign in</button>
          <div className="or">
            <p>Or continue with</p>
          </div>
          <button className="google-button">
            <img src={GoogleIcon} alt="" /> Login with Google
          </button>
        </form>
      </aside>
    );
  }
  if (formActive === 0) {
    return (
      <aside className="form-container">
        <div className="change-form">
          <button onClick={() => activeForm(1)} className="active">
            Sign in
          </button>
          <button onClick={() => activeForm(0)}>Register</button>
        </div>
        <div className="title">
          <h3>Welcome to</h3>
          <img src={Logo} alt="Checkr" />
        </div>

        <form>
          <label htmlFor="">
            <input type="text" placeholder="Digite seu Nome" />
          </label>

          <label htmlFor="">
            <input type="text" placeholder="Digite seu Email" />
          </label>

          <label htmlFor="">
            <input
              type="password"
              name=""
              id=""
              placeholder="Digite sua senha"
            />
          </label>
          <button className="signIn">Sign in</button>
          <div className="or">
            <p>Or continue with</p>
          </div>
          <button className="google-button">
            <img src={GoogleIcon} alt="" /> Login with Google
          </button>
        </form>
      </aside>
    );
  }
}

export default FormHome;
