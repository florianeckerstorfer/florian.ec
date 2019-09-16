interface NPMUser {
  username: string;
  email: string;
}

interface NPMRelease {
  from: string;
  to: string;
  count: number;
}

interface NPMDownload {
  from: string;
  to: string;
  count: number;
}

interface NPMSPackage {
  analyzedAt: string;
  collected: {
    metadata: {
      name: string;
      scope: string;
      version: string;
      description: string;
      keywords: string[];
      date: string;
      author: {
        name: string;
        email: string;
      };
      publisher: NPMUser;
      maintainers: NPMUser[];
      links: {
        npm: string;
        bugs: string;
        homepage: string;
      };
      license: string;
      dependencies: {
        [propName: string]: string;
      };
      devDependencies: {
        [propName: string]: string;
      };
      releases: NPMRelease[];
      hasTestScript: boolean;
      readme: string;
    };
    npm: {
      downloads: NPMDownload[];
      dependentsCount: number;
      starsCount: number;
    };
    source: {
      files: {
        readmeSize: number;
        testsSize: number;
      };
    };
  };
  evaluation: {
    quality: {
      carefulness: number;
      tests: number;
      health: number;
      branding: number;
    };
    popularity: {
      communityInterest: number;
      downloadsCount: number;
      downloadsAcceleration: number;
      dependentsCount: number;
    };
    maintenance: {
      releasesFrequency: number;
      commitsFrequency: number;
      openIssues: number;
      issuesDistribution: number;
    };
  };
  score: {
    final: number;
    detail: {
      quality: number;
      popularity: number;
      maintenance: number;
    };
  };
}
