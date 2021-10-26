import React from 'react';

const Container: React.FC = ({ children }) => {
  return <div className="container h-full mx-auto my-4">{children}</div>;
};

export default Container;
