import React from 'react';

interface Props {
  children: React.ReactNode;
}

const Title = ({ children }: Props): JSX.Element => {
  return <div>{children}</div>;
};

export default Title;
