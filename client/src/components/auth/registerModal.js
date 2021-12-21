import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert,
} from 'reactstrap';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const RegisterModal = () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(null);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const error = useSelector((state) => state.error);
  const previousError = usePrevious(error);

  useEffect(() => {
    if (error !== previousError) {
      //Check for register error
      if (error?.id === 'REGISTER_FAIL') {
        setMsg(error?.msg?.msg);
      } else {
        setMsg(null);
      }
    }

    //If Authenticated Close the modal
    if (modal && isAuthenticated) {
      setModal(!modal);
    }
  });

  const onSubmit = (e) => {
    e.preventDefault();
    //Create user object
    const newUser = {
      name,
      email,
      password,
    };
    //Register Action
    dispatch(register(newUser));
  };

  return (
    <div>
      <NavLink
        onClick={() => {
          dispatch(clearErrors());
          setModal(!modal);
        }}
        href='#'
      >
        Register
      </NavLink>
      <Modal
        isOpen={modal}
        toggle={() => {
          dispatch(clearErrors());
          setModal(!modal);
        }}
      >
        <ModalHeader
          toggle={() => {
            dispatch(clearErrors());
            setModal(!modal);
          }}
        >
          Register
        </ModalHeader>
        <ModalBody>
          {msg ? <Alert color='danger'>{msg}</Alert> : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for='name'>Name</Label>
              <Input
                type='text'
                name='name'
                id='name'
                className='mb-3'
                placeholder='Name'
                onChange={(e) => setName(e.target.value)}
              ></Input>
              <Label for='email'>Email</Label>
              <Input
                className='mb-3'
                type='email'
                name='email'
                id='email'
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
              ></Input>
              <Label for='name'>Password</Label>
              <Input
                className='mb-3'
                type='password'
                name='password'
                id='password'
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
              ></Input>
              <Button
                type='submit'
                color='dark'
                style={{ marginTop: '2rem' }}
                block
              >
                Register
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default RegisterModal;
