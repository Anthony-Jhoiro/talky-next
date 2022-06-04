# Talky

Talky is a small social network project

## Setup

- clone the repository
- copy the `.env.example` file to a `.env.local`file and replace the variables
- Install dependencies with `yarn`
- Start the dev server with `yarn dev`

## Git hooks

The project has git hooks managed by husky. They are automatically installed when running yarn (with a version prior to v2).
Your commit must start with a gitmoji character (see : [https://gitmoji.dev/](https://gitmoji.dev/)).
It helps us manage releases and keep a nice quality between each commit.
Tests and linter are also run during commit.

## Code generation

The taly api exposes 3 openapi endpoints that are used to generate a part of the code in the `src/api/generated` directory.
If you need to update these files, you can run the `openapi-codegen.sh` script.
It requires `yarn` executable in your path and the dex dependencies installed (install them using `yarn`)
