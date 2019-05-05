import React, { ReactNode } from 'react';
import styles from './Label.module.css';

interface Props {
  children?: ReactNode;
}

const Label: React.FC = ({ children }: Props) => (
  <span className={styles.label}>{children}</span>
);

export default Label;
