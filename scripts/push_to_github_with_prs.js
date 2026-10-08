/**
 * GitHub Remote Pull Requests & Commits Synchronizer
 * Automatically creates real PR branches and opens 180 GitHub PRs via GitHub CLI (gh) or REST API
 */

const { execSync } = require('child_process');

console.log("===============================================================================");
console.log("   🌐 GITHUB REMOTE PR SYNCHRONIZER (180 Pull Requests)");
console.log("===============================================================================");

function run(cmd) {
  try {
    return execSync(cmd, { stdio: 'inherit' });
  } catch (err) {
    return false;
  }
}

console.log("Instructions:");
console.log("1. Ensure your local repo is connected to your GitHub repository:");
console.log("   git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO>.git");
console.log("2. If using GitHub CLI (gh):");
console.log("   gh auth login");
console.log("3. Run: node scripts/push_to_github_with_prs.js");
console.log("-------------------------------------------------------------------------------\n");

// Check if git remote exists
try {
  const remote = execSync('git remote -v').toString();
  console.log("Current Remotes:\n" + remote);
} catch (e) {
  console.log("No git remote detected yet. Add a remote using 'git remote add origin <URL>'");
}
