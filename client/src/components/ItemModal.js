import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';
import { addItem } from '../actions/itemActions';

const ItemModal = () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');

  const onChange = (e) => {
    setName(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      name: name,
    };
    dispatch(addItem(newItem));
    setModal(!modal);
  };

  return (
    <div>
      <Button
        color='dark'
        style={{ marginBottom: '2rem' }}
        onClick={() => setModal(!modal)}
      >
        Add Item
      </Button>
      <Modal isOpen={modal} toggle={() => setModal(!modal)}>
        <ModalHeader toggle={() => setModal(!modal)}>
          Add to Shopping List
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for='item'>Item</Label>
              <Input
                type='text'
                name='name'
                id='item'
                placeholder='Add Shopping Item'
                onChange={onChange}
              ></Input>
              <Button
                type='submit'
                color='dark'
                style={{ marginTop: '2rem' }}
                block
              >
                Add Item
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ItemModal;
