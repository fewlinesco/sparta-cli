export default `
# Initialize your GitHub repository

## Create the repository on GitHub

When pressing a key, the GitHub repository creation will open.

Create a \`public\` repository and fill the requested information.

Check the \`Add .gitignore\` checkbox

## Bind the repository to your local directory

Go to your exercises directory and add your GitHub repo as a remote:

\`\`\`bash
$ git remote add origin git@github.com:<your-github-username>/<your-repository-name>.git
$ git pull origin master
\`\`\`

Congratulations! Your exercises directory is now ready to be used.
`;
