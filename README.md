<div align="center">

![banner](https://github.com/fullstacksjs/npm-check-last-publish/blob/main/assets/banner-dark.png?raw=true#gh-dark-mode-only)
![banner](https://github.com/fullstacksjs/npm-check-last-publish/blob/main/assets/banner-light.png?raw=true#gh-light-mode-only)

</div>

# npm-check-last-publish

A simple CLI tool that helps developers check the last published versions of their project dependencies.

## Features

- Displays outdated dependencies in a clear table format.
- Shows the last published time, average and version of each dependency.
- Helps developers keep their dependencies up to date.
- Supports wildcard pattern matching for package names.
- Customizable warning/error day thresholds.

![report screenshot](https://github.com/fullstacksjs/npm-check-last-publish/blob/main/assets/demo.png?raw=true)

## Usage

Just navigate to your project directory and run:

```bash
npx npm-check-last-publish
```

## Check Specific Packages

To check packages not listed in your `package.json`, just pass their names:

```bash
npx npm-check-last-publish zod react
```

## CLI Options

| Option                  | Description                                        | Default | Allowed Values                                  |
| ----------------------- | -------------------------------------------------- | ------- | ----------------------------------------------- |
| `--sort <TYPE>`         | Sort packages by a specific field                  | `date`  | `name`, `date`, `average`                       |
| `--order <DIR>`         | Sort direction (ascending or descending)           | `asc`   | `asc`, `desc`                                   |
| `--pattern`             | Enable wildcard pattern matching for package names | (off)   | Glob pattern, e.g., `"react-*"` or `"@types/*"` |
| `--warn-days <NUMBER>`  | Days threshold for warning                         | `180`   | Any positive integer                            |
| `--error-days <NUMBER>` | Days threshold for error                           | `365`   | Any positive integer                            |

## Examples

#### Sort alphabetically

```bash
npx npm-check-last-publish --sort name
```

#### Sort by average publish frequency, descending

```bash
npx npm-check-last-publish --sort average --order desc zod react cspell
```

#### Check packages matching a wildcard pattern

```bash
npx npm-check-last-publish --pattern "@types/*"
```

```bash
npx npm-check-last-publish --pattern "react-*"
```

#### Customize warning and error thresholds

```bash
npx npm-check-last-publish --warn-days 60 --error-days 120
```

## Help

Run the following command to see usage and available options:

```bash
npx npm-check-last-publish --help
```

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

If you find any bugs or issues, please [create a new issue](https://github.com/fullstacksjs/npm-check-last-publish/issues/new) on GitHub. Include as much detail as possible to help us understand and reproduce the problem.
