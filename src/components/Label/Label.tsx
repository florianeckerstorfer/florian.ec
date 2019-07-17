import React, { ReactNode, ReactElement } from 'react';
import styles from './Label.module.css';
import classnames from 'classnames';

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
