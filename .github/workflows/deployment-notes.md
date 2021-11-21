# Deployment Notes

This was written after setting up the CI/CD for development on 2021-11-20.

## Existing resource

- Google Cloud Platform user account with full project access
- Cloud Run for dev
- Cloud SQL for dev
- Cloud Storage for dev
- Dockerfile for deployment build
- Commands for manual build, push to artifact registry and deploy to Cloud Run

## Steps

On GCP

- Create Service Account for Github Actions to use
  - GCP > IAM & Admin > Service Accounts > Create service account
  - Service account name: github-actions
  - Grant this service account access to project: leave blank
  - Grant users access to this service account: leave blank
- Grant github-actions service account permissions to run Cloud Run deployment
  - GCP > IAM & Admin > Service Accounts
  - Click on XXXXX-compute@developer.gserviceaccount.com
  - On the top tabs, click Permissions
  - Click Grant Access
  - New principals: Search for the new github-actions service account email
  - Role: Click and scroll on left column to "Service Accounts", select right column "Service Account User"
  - Click Save
- Grant github-actions service account required roles
  - GCP > IAM & Admin > IAM
  - Search for github-actions service account
  - Click "Edit Principal"
  - Add "Artifact Registry" > "Artifact Registry Writer" and "Cloud Run" > "Cloud Run Admin"
  - Save
- Create new Cloud Run revision with updated environment variables
  - GCP > Cloud Run > pawscore-backend-dev > Edit & Deploy New Version button on top
  - In particular, update `FRONTEND_URL` to be the actual URL link in browser
  - Also updated `NODE_ENV` to `gcloud-development`

On Github

- Set up environment secrets in Github Secrets (GitHub > PawScore > Settings > Secrets > Environment secrets)
- Set up `deploy-to-dev.yml` Github Actions
- Commit and push to master
- Debug using Github Actions logs

Database

- CI/CD does not include auto db migrations
- Set db credentials for the dev Cloud SQL in backend/.env
- `cd backend`
- `npm run db:migrate`
