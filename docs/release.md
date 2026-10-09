# How-to: Release

## Update package version without creating a Git tag
pnpm version minor --no-git-tag-version

## Generate changelog, treating unreleased commits as v1.1.0
pnpm exec git-cliff --unreleased --tag v1.1.0 --output CHANGELOG.md

## Review the changes
git diff

## Commit version and changelog together
git add package.json CHANGELOG.md
git commit -m "chore(release): v1.1.0"

## Tag that release commit
git tag -a v1.1.0 -m "Release v1.1.0"

## Push commit and tag
git push origin master
git push origin v1.1.0