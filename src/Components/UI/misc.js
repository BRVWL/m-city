import React from 'react';
import { Link } from 'react-router-dom';

export const Tag = props => {
  const { link, linkTo, bck, size, color, children } = props;
  const template = (
    <div
      style={{
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
