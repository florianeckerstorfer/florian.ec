import fetch from 'cross-fetch';

async function fetchNpmsPackage(packageName: string): Promise<NPMSPackage> {
  const response = await fetch(`https://api.npms.io/v2/package/${packageName}`);
  return await response.json();
}

export default fetchNpmsPackage;
