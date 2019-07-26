import React, { ReactElement } from 'react';

import classnames from 'classnames';
import styles from './H1.module.css';

interface Props {
  children: React.ReactNode;
  className?: string;
}

const H1: React.FC<Props> = ({ children, className }: Props): ReactElement => (
  <h1 className={classnames(styles.h1, className)}>{children}</h1>
);

export default H1;
