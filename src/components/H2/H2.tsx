import React, { ReactElement } from 'react';
import styles from './H2.module.css';

interface Props {
  children?: React.ReactNode;
}

const H2: React.FC<Props> = ({ children }: Props): ReactElement => (
  <h2 className={styles.h2}>{children}</h2>
);

export default H2;
