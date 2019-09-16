import dayjs from 'dayjs';
import npmLogo from './npm-logo.svg';
import React, { ReactNode } from 'react';
import styles from './NpmPackage.module.css';
import withNpmPackageData from './withNpmPackageData';
import { WithNpmPackageDataProps } from './withNpmPackageData';

export interface Props {
}

interface LinkProps {
  children: ReactNode;
  href?: string;
}

function ExternalLink({ children, href }: LinkProps) {
  if (!href) {
    return null;
  }
  return (
    <a href={href} className={styles.externalLink} target="_blank" rel="noopener">
      {children}
    </a>
  );
}

export function NpmPackage({ pckgName, pckgData }: Props & WithNpmPackageDataProps) {
  return (
    <div className={styles.container}>
      <img src={npmLogo} alt="NPM" className={styles.npmLogo} />
      <div className={styles.pckg}>
        <div className={styles.pckgName}>{pckgName}</div>
        {pckgData && (
          <>
            <div className={styles.pckgVersion}>
              Version {pckgData.collected.metadata.version} (
              {dayjs(pckgData.collected.metadata.date).format('MMMM D, YYYY')})
            </div>
          </>
        )}
      </div>
      {pckgData && (
        <div className={styles.externalLinks}>
          <ExternalLink href={pckgData.collected.metadata.links.homepage}>
            Homepage
          </ExternalLink>
          <ExternalLink href={pckgData.collected.metadata.links.npm}>
            NPM
          </ExternalLink>
          <ExternalLink href={pckgData.collected.metadata.links.bugs}>
            Bugs
          </ExternalLink>
        </div>
      )}
    </div>
  );
}

export default withNpmPackageData(NpmPackage);
