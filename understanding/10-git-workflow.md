# 10 — Git Workflow

## Repository

TwoNomadix is hosted on GitHub.

Use the repository configured for the project as the source of truth.

## Before changes

```powershell
git status
git branch
```

## After changes

```powershell
git status
```

Review exactly what changed.

## Stage intentionally

Prefer:

```powershell
git add frontend/src/pages/Home.jsx
```

or stage the specific files changed.

## Commit

Use meaningful messages:

```powershell
git commit -m "Add Dubai Thailand and Vietnam destinations"
```

## Push

```powershell
git push
```

## Check remote

```powershell
git remote -v
```

## Never commit

```text
.env
.venv/
node_modules/
dist/
*.pyc
__pycache__/
```

## Line-ending warnings

Messages such as:

```text
LF will be replaced by CRLF
```

are generally Git line-ending warnings on Windows, not application errors.

## Safe workflow

```text
Change
 ↓
Test locally
 ↓
git status
 ↓
Review
 ↓
git add specific files
 ↓
git commit
 ↓
git push
```

## Important

Do not use Git commands to delete files unless you are certain the files should be removed.

If something unexpectedly appears as deleted:

```powershell
git status
```

and investigate before committing.
