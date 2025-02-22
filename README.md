# npm-check-last-publish
A simple CLI tool that helps developers check the last published versions of their project dependencies. 

## Features
- Displays outdated dependencies in a clear table format.
- Shows the last published time, average and version of each dependency.
- Helps developers keep their dependencies up to date.

![report screenshot](./assets/report-screenshot.png)

## Installation
Simply use npx to run it without installing it globally:
```bash
npx npm-check-last-publish
```

Or install it globally:
```bash
npm install -g npm-check-last-publish
```

## Usage
Just navigate to your project directory and run:
```bash
npx npm-check-last-publish
```
### Why Use This Tool?
- Quickly check outdated dependencies.
- Improve security by keeping dependencies up to date.
- Avoid compatibility issues caused by outdated packages.

## How to Contribute
All contributions are welcome to further enhance this project. Whether you’re fixing an issue, adding a feature or improving the documentation, are much valued.

Before submitting a pull request, please make sure the following is done:
1. Fork this repository and then clone it to your local machine.
2. Create a new branch for your feature or bug fix: `git checkout -b my-feature`.
3. Make your changes and commit them with descriptive commit messages: `git commit -m 'Add new feature'`.
4. Ensure everything is ok `npm run check`.
5. Push your changes to your fork: `git push origin my-feature`.
6. Create a pull request (PR) against the `main` branch of this repository.

### Issues and Bug Reports
If you find any bugs or issues, please [create a new issue]([https://github.com/yourusername/yourproject/issues](https://github.com/fullstacksjs/npm-check-last-publish/issues/new)) on GitHub. Include as much detail as possible to help us understand and reproduce the problem.
