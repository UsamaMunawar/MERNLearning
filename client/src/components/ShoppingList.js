import React, { useState } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { getItems } from '../actions/itemActions';

const ShoppingList = () => {
  const [items, setItems] = useState([]);

  return (
    <Container>
      <Button
        color='dark'
        className='mb-2'
        onClick={() => {
          const name = prompt('Enter Item');
          if (name) {
            setItems([...items, { id: uuidv4(), name }]);
          }
        }}
      >
        Add Item
      </Button>
      <ListGroup>
        <TransitionGroup className='shopping-list'>
          {items.map(({ id, name }) => (
            <CSSTransition key={id} timeout={500} classNames='fade'>
              <ListGroupItem>
                <Button
                  className='remove-btn'
                  color='danger'
                  size='sm'
                  onClick={() => {
                    setItems([...items.filter((item) => item.id !== id)]);
                  }}
                >
                  &times;
                </Button>
                {name}
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
};

export default ShoppingList;
