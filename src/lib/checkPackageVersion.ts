import findPackageJson from 'find-package-json';
import semver from 'semver';

const versionRange = '<=13.3.1'; // specify the version range you want to check
const packageName = 'next'; // replace 'your-package' with the name of the package you want to check

const packageJsonIterator = findPackageJson();
let packageJson = packageJsonIterator.next().value;

while (packageJson) {
  if (packageJson.dependencies && packageJson.dependencies[packageName]) {
    const packageVersion = packageJson.dependencies[packageName];

    if (semver.satisfies(packageVersion, versionRange)) {
      console.log(`Package version ${packageVersion} satisfies the range ${versionRange}`);
    } else {
      console.log(`Package version ${packageVersion} does not satisfy the range ${versionRange}`);
    }

    break;
  }

  packageJson = packageJsonIterator.next().value;
}
