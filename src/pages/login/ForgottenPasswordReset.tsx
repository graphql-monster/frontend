import React, { useEffect, useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { Modal, Form, Alert, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { User, useUserDispatch, USER_LOGIN } from '../../contexts/userContext';
import { isEmailValid } from "../../common/utils";
import _ from "lodash";

const FORGOTTEN_PASSWORD_CHECK_MUTATION = gql`
  mutation forgottenPasswordCheck($token: String!) {
    check: forgottenPasswordCheck_v1(token: $token) {
      status
    }
  }
`;

const FORGOTTEN_PASSWORD_RESET_MUTATION = gql`
  mutation forgottenPasswordReset($token: String!, $password: String!) {
    reset: forgottenPasswordReset_v1(token: $token, password: $password) {
      refreshToken
      token
      user {
        roles{name}
        id,
        email,
        verified
      }
    }
  }
`;

export const ForgotenPasswordReset: React.FC<any> = ({match}) => {
  const token = _.get(match, 'params.token')
  const [password, setPassword] = useState("");
  const [copy, setCopy] = useState("");

  const history = useHistory()
  const dispatch = useUserDispatch()

  const [doForgottenPasswordCheck, { loading: loadingForgottenPasswordCheck, data: dataForgottenPasswordCheck, error: errorForgottenPasswordCheck }] = useMutation(FORGOTTEN_PASSWORD_CHECK_MUTATION, {
    errorPolicy: "none",
  });

  const [doForgottenPasswordReset, { loading, data, error }] = useMutation(FORGOTTEN_PASSWORD_RESET_MUTATION, {
    errorPolicy: "none",
  });

  
  const [invalidPass, setInvalidPass] = useState(false);
  const [validPass, setValidPass] = useState(false);

  const [invalidCopy, setInvalidCopy] = useState(false);

  useEffect(()=>{
    const doCheck = async () => {
      try{
        await doForgottenPasswordCheck({ variables: {token}})
      } catch(ex) {

      } finally {
      }
      
    }

    doCheck()

  }, [token, doForgottenPasswordCheck])

  const onReset = async () => {

    if (password !== copy) {
      setInvalidCopy(true)
      return
    }

    try {
      const { data } = await doForgottenPasswordReset({ variables: { token, password } })
      dispatch({
        type: USER_LOGIN,
        userToken: data.reset
      })
      history.replace('/user/projects')
    } catch (ex) {
        console.log('onError', data)
        
      }
  
  };

  const onPasswordChange = (event: any) => {
    const pass = event.target.value as string
    const regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
    setValidPass(regularExpression.test(pass))

    setPassword(pass);
    setInvalidPass(false);
  };

  const onCopyChange = (event: any) => {
    const c = event.target.value
    setCopy(c)
    setInvalidPass(false)

    if (c == password) {
      setInvalidCopy(false)
    }
  };

  if(loadingForgottenPasswordCheck){
    return (<Alert variant={"success"}>Checking token</Alert>)
  } else if ( dataForgottenPasswordCheck && dataForgottenPasswordCheck.check && dataForgottenPasswordCheck.check.status === 'valid') {
    return (<>
      <section id="subheader" data-bgimage="url(images/background/5.png) bottom">
        <div className="center-y relative text-center" data-scroll-speed="4">
          <div className="container">
            <div className="row">
              <div className="col-md-8 offset-md-2">
                <form action='blank.php' className="row" id='form_subscribe' method="post" name="myForm">
                  <div className="col-md-12 text-center">
                    <h1>User Password Reset</h1>
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
                  
  
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      onChange={onPasswordChange}
                      value={password}
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
                  {!loading && <Button className="btn-round" variant="primary" onClick={() => onReset()}>Reset password</Button>}
                  {loading && <Button className="btn-round" variant="primary" disabled>Loading...</Button>}
  
                  <div className="clearfix"></div>
  
  
                </div>
  
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
    );
  } else {
    return (<Alert variant={"danger"}>The <b>{token}</b> is not valid or already used</Alert>)
  }

  
};

export default ForgotenPasswordReset;
