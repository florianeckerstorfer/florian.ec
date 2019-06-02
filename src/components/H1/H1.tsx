import * as React from 'react';
import styles from './H1.module.css';
import classnames from 'classnames';

interface Props {
  children: React.ReactNode;
  className?: string;
}

function H1({ children, className }: Props) {
  return <h1 className={classnames(styles.h1, className)}>{children}</h1>;
}

export default H1;
