import React, { ReactNode } from 'react';
import styles from './Label.module.css';
import classnames from 'classnames';

interface IProps {
  children?: ReactNode;
  inverse?: boolean;
}

const Label: React.FC<IProps> = ({ children, inverse }: IProps) => (
  <span className={classnames(styles.label, { [styles.inverse]: inverse })}>
    {children}
  </span>
);

export default Label;
