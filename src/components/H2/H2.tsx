import React from 'react';
import styles from './H2.module.css';

interface IProps {
  children?: React.ReactNode;
}

function H2({ children }: IProps) {
  return <h2 className={styles.h2}>{children}</h2>;
}

export default H2;
