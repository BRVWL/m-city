import React from 'react';
import { Link } from 'react-router-dom';

export const Tag = props => {
  const { link, linkTo, bck, size, color, children, add } = props;
  const template = (
    <div
      style={{
        ...add,
        background: bck,
        fontSize: size,
        color,
        padding: '5px 10px',
        display: 'inline-block',
        fontFamily: 'Righteous'
      }}>
      {children}
    </div>
  );
  if (link) {
    return <Link to={linkTo}>{template}</Link>;
  } else {
    return template;
  }
};

export const firebaseLooper = snapshot => {
  const data = [];
  snapshot.forEach(childSnapshot => {
    data.push({
      ...childSnapshot.val(),
      id: childSnapshot.key
    });
  });
  return data;
};

export const reverseArray = actualArray => {
  let reverseArray = [];
  for (let i = actualArray.length - 1; i >= 0; i--) {
    reverseArray.push(actualArray[i]);
  }
  return reverseArray;
};

export const validate = (element, value) => {
  let error = [true, ''];

  if (element.validation.email) {
    const valid = /\S+@\S+\.\S+/.test(value);
    const message = `${!valid ? 'Must be a valid email' : ''}`;
    error = !valid ? [valid, message] : error;
  }

  if (element.validation.required) {
    const valid = value.trim() !== '';
    const message = `${!valid ? 'This field is required' : ''}`;
    error = !valid ? [valid, message] : error;
  }
  return error;
};
