import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const level = process.argv[2];
const levels = new Set(["patch", "minor", "major"]);

function command(binary, args, options = {}) {
  const output = execFileSync(binary, args, {
    cwd: root,
    encoding: "utf8",
    stdio: options.capture ? ["ignore", "pipe", "pipe"] : "inherit",
  });
  return typeof output === "string" ? output.trim() : "";
}

function fail(message) {
  console.error(`Release cancelled: ${message}`);
  process.exit(1);
}

function bump(current, kind) {
  const match = /^(\d+)\.(\d+)\.(\d+)$/.exec(current);
  if (!match)
    fail(`Unsupported version: ${current}. Expected major.minor.patch.`);
  const major = Number(match[1]);
  const minor = Number(match[2]);
  const patch = Number(match[3]);

  if (kind === "major") return `${major + 1}.0.0`;
  if (kind === "minor") return `${major}.${minor + 1}.0`;
  return `${major}.${minor}.${patch + 1}`;
}

if (!levels.has(level) || process.argv.length !== 3) {
  fail("Usage: pnpm release:patch | pnpm release:minor | pnpm release:major");
}

if (
  command("git", ["branch", "--show-current"], { capture: true }) !== "master"
) {
  fail("Releases must be prepared from master.");
}
if (
  command("git", ["status", "--porcelain", "--untracked-files=normal"], {
    capture: true,
  })
) {
  fail("Working tree must be clean. Commit or stash changes first.");
}

command("git", ["fetch", "origin", "master", "--tags"]);
const head = command("git", ["rev-parse", "HEAD"], { capture: true });
const upstream = command("git", ["rev-parse", "origin/master"], {
  capture: true,
});
if (head !== upstream)
  fail("Local master differs from origin/master. Pull or push first.");

const packagePath = resolve(root, "package.json");
const original = readFileSync(packagePath, "utf8");
const pkg = JSON.parse(original);
const next = bump(pkg.version, level);
const tag = `v${next}`;

if (command("git", ["tag", "--list", tag], { capture: true })) {
  fail(`Tag ${tag} already exists.`);
}

console.info(`Preparing ${tag} from ${pkg.version}...`);
command("pnpm", ["verify"]);

const versionLine = /("version"\s*:\s*")[^"]+("\s*,)/;
if (!versionLine.test(original))
  fail("Could not locate version in package.json.");
writeFileSync(packagePath, original.replace(versionLine, `$1${next}$2`));

try {
  command("pnpm", ["install", "--lockfile-only", "--ignore-scripts"]);
  command("pnpm", [
    "exec",
    "git-cliff",
    "--tag",
    tag,
    "--output",
    "CHANGELOG.md",
  ]);
  command("git", [
    "add",
    "--",
    "package.json",
    "pnpm-lock.yaml",
    "CHANGELOG.md",
    "public/sitemap.xml",
    "public/rss.xml",
  ]);
  command("git", ["commit", "-m", `chore(release): ${tag}`]);
  command("git", ["tag", "-a", tag, "-m", `Release ${tag}`]);
} catch (error) {
  console.error(
    "Release preparation failed. Review local changes before retrying.",
  );
  throw error;
}

console.info(
  `\nCreated commit chore(release): ${tag} and annotated tag ${tag}.`,
);
console.info(`Review with: git show --stat HEAD && git show --no-patch ${tag}`);
console.info(
  `When ready to deploy: git push origin master && git push origin ${tag}`,
);
