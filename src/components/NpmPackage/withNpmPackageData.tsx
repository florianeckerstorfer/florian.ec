import React, { useState, useEffect, ComponentType, ReactElement } from 'react';
import fetchNpmsPackage from '../../lib/fetchNpmsPackage';

export interface Props {
  pckgName: string;
}

export interface WithNpmPackageDataProps {
  pckgName: string;
  pckgData: NPMSPackage;
}

function withNpmPackageData(
  WrappedComponent: ComponentType<WithNpmPackageDataProps>
) {
  return function(props: Props): ReactElement<WithNpmPackageDataProps> | null {
    const [pckgData, setPckgData] = useState();

    async function loadPckgDataToState() {
      const json = await fetchNpmsPackage(props.pckgName);
      setPckgData(json);
    }

    useEffect(() => {
      loadPckgDataToState();
    }, []);

    if (!pckgData) {
      return null;
    }

    return <WrappedComponent pckgName={props.pckgName} pckgData={pckgData} />;
  };
}

export default withNpmPackageData;
