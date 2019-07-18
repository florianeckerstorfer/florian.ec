import React, { ReactElement, ReactNode } from 'react';

import classnames from 'classnames';
import styles from './Label.module.css';

interface Props {
  children?: ReactNode;
  inverse?: boolean;
}

const Label: React.FC<Props> = ({ children, inverse }: Props): ReactElement => (
  <span className={classnames(styles.label, { [styles.inverse]: inverse })}>
    {children}
  </span>
);

export default Label;
