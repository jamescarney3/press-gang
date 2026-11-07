import type { ReactNode } from 'react';

const Grid = (props: { children?: ReactNode }) => {
  return <section>{props.children}</section>;
};

export default Grid;
