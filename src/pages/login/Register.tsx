import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { Modal, Form, Alert, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { User, useUserDispatch, USER_LOGIN } from '../../contexts/userContext';

const REGISTER_MUTATION = gql`
  mutation register($email: String!, $pass: String!) {
    register_v1(email: $email, password: $pass) {
      refreshToken
      token
      user {
        roles{name}
        id,
        email,
      }
    }
  }
`;

export const Register: React.FC = () => {
  const [email, setEmail] = useState("ahoj");
  const [pass, setPass] = useState("ahoj");
  const [copy, setCopy] = useState("");

  const history = useHistory()
  const dispatch = useUserDispatch()

  const [register, { loading, data, error }] = useMutation(REGISTER_MUTATION, {
    errorPolicy: "none",
  });

  const [invalidEmail, setInvalidEmail] = useState(false);

  const [invalidPass, setInvalidPass] = useState(false);
  const [validPass, setValidPass] = useState(false);

  const [invalidCopy, setInvalidCopy] = useState(false);

  const onRegister = async () => {
    if (pass != copy) {
      setInvalidCopy(true)
      return
    }

    try {
      const { data } = await register({ variables: { email, pass } })
      dispatch({
        type: USER_LOGIN,
        userToken: data.register_v1
      })
      history.push('/user/projects')
    } catch (ex) {
        console.log('onError', data)
        setInvalidEmail(true)
      }
  
  };

  const onHide = () => {
    setPass("");
    setCopy("");
    // doHide();
  };

  const onEmailChange = (event: any) => {
    setEmail(event.target.value);
    setInvalidEmail(false);
  };

  const onPasswordChange = (event: any) => {
    const pass = event.target.value as string
    const regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
    setValidPass(regularExpression.test(pass))

    setPass(pass);
    setInvalidEmail(false);
    setInvalidPass(false);
  };

  const onCopyChange = (event: any) => {
    const c = event.target.value
    setCopy(c)
    setInvalidEmail(false)
    setInvalidPass(false)

    if (c == pass) {
      setInvalidCopy(false)
    }
  };

  return (<>
    <section id="subheader" data-bgimage="url(images/background/5.png) bottom">
      <div className="center-y relative text-center" data-scroll-speed="4">
        <div className="container">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <form action='blank.php' className="row" id='form_subscribe' method="post" name="myForm">
                <div className="col-md-12 text-center">
                  <h1>User Registration</h1>
                  <p>All big things starting here</p>
                </div>
                <div className="clearfix"></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="no-top" data-bgimage="url(images/background/3.png) top">
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form name="contactForm" id='contact_form' className="form-border" method="post" action='blank.php'>


              <Form>
                {invalidEmail && (<Alert variant={"danger"}>Email is probably taken, did you <Link to="/forgotten-password">forgotten password</Link>?</Alert>)}
                {invalidCopy && (<Alert variant={"danger"}>The retyped password is not the same</Alert>)}
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={onEmailChange}
                    value={email}
                    isInvalid={invalidEmail}
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
          </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={onPasswordChange}
                    value={pass}
                    isInvalid={invalidPass}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Re-Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Retype Password"
                    onChange={onCopyChange}
                    value={copy}
                    isInvalid={invalidCopy}
                  />
                </Form.Group>
              </Form>

              <div id='submit' className="pull-left">
                {!loading && <Button className="btn-round" variant="primary" onClick={() => onRegister()}>Register</Button>}
                {loading && <Button className="btn-round" variant="primary" disabled>Loading...</Button>}

                <div className="clearfix"></div>

                <div className="spacer-single"></div>

                <ul className="list s3">
                  <li>Or login with:</li>
                  <li><a href="#">Facebook</a></li>
                  <li><a href="#">Google</a></li>
                  <li><a href="#">Instagram</a></li>
                </ul>

              </div>

            </form>
          </div>
        </div>
      </div>
    </section>
  </>
  );

  //   <div>
  //   <Modal show={show} onHide={onHide}>
  //     <Modal.Header closeButton>
  //       <div>
  //         <Modal.Title>SigIn</Modal.Title>
  //       </div>
  //     </Modal.Header>

  //     <Modal.Body>
  //       {loading && <div>Loading...</div>}
  //       <div>
  //         {invalidEmail && (
  //           <Alert variant={"danger"}>Email is probably taken, did you <Link to="/forgotten-password">forgotten password</Link>?</Alert>
  //         )}
  //         {invalidCopy && (
  //           <Alert variant={"danger"}>The retyped password is not the same</Alert>
  //         )}
  //       </div>


  //     </Modal.Body>

  //     <Modal.Footer>
  //       <Button variant="primary" type="submit" onClick={() => onRegister()}>
  //         Register
  //       </Button>
  //       <Button variant="secondary" onClick={onHide}>
  //         Close
  //       </Button>
  //     </Modal.Footer>
  //   </Modal>
  // </div>
};

export default Register;
