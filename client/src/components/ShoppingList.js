import React, { useEffect } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useDispatch, useSelector } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import ItemModal from './ItemModal';

const ShoppingList = () => {
  const dispatch = useDispatch();
  const item = useSelector((state) => state.item.items);

  useEffect(() => {
    dispatch(getItems());
  }, []);

  return (
    <Container>
      <ItemModal />
      <ListGroup>
        <TransitionGroup className='shopping-list'>
          {item.map(({ _id, name }) => (
            <CSSTransition key={_id} timeout={500} classNames='fade'>
              <ListGroupItem>
                <Button
                  className='remove-btn'
                  color='danger'
                  size='sm'
                  onClick={() => {
                    dispatch(deleteItem(_id));
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
