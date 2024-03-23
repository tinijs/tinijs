export function buildGithubRawUrl(repoUrl: string) {
  const ownerAndRepo = repoUrl.replace(/https?:\/\/github.com\//, '');
  return `https://raw.githubusercontent.com/${ownerAndRepo}`;
}
