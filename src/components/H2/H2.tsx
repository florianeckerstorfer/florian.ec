import React, { ReactElement } from 'react';

import classnames from 'classnames';
import styles from './H2.module.css';

interface Props {
  children?: React.ReactNode;
  style?: 'aside';
}

const H2: React.FC<Props> = ({ children, style }: Props): ReactElement => (
  <h2 className={classnames(styles.h2, style ? styles[style] : undefined)}>
    {children}
  </h2>
);

export default H2;
