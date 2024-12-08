# Typescript monorepo boilerplace

My preferred stack is Typescript, with a Node.js based back-end and a React based front-end.

Typically, I have a repository for each one. But I find that there aren't a lot of benefits especially in new projects or small engineering teams of < 20 people.

Challenges:

- Most features likely require some front-end and back-end work
- We want to share Typescript types and other shared code between the two projects
- We want similar project configurations between them (ex. Typescript versions, linting, etc.)
- The feedback loops is slow when you have to build/test/commit for each project instead of working on them together

However, this does not mean that I want to move to a full-stack framework. There are clear and tangible benefits to having separated API and web codebases and architectures. Thus, this project was born.

This repository is meant to be a boilerplate starting point for any full-stack application project I want to pursue.

# Folder structure

```
lumber/
├── package.json
├── eslint.config.js
├── tsconfig.json
├── ... other global configuration files
├── api/
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       └── index.ts
│       └── ... rest of the API application
├── common/
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       └── index.ts
│       └── ... rest of the common shared code
├── web/
│   ├── package.json
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   ├── tsconfig.node.json
│   ├── vite.config.ts
│   ├── index.html
│   └── src/
│       └── index.tsx
│       └── ... rest of the web application
```

# How it is set up

The project is a yarn workplace (should work the same whether it's an npm or pnpm workspace) that consists of 3 projects:

1. API
2. Web
3. Common

It was challenging to set up all the right configurations for each of these projects. It would be simpler if it was just a JS project, but with a TS transpilation step, I ran into many gotchas. I was also learning about the concept of yarn workspaces for the first time.

- The root directory has a package.json and any globally applicable configuration files such as eslint and prettier. This package.json contains packages that should be globally available, such as Typescript and any packages associated with the configurations.
- Each project has their own package.json and tsconfig.json.
- Each package.json needs:
  - A name (in my case, @lumber/api, @lumber/web, @lumber/common - I chose lumber because it's related to a project I may work on next)
  - In my case I made each package.json of "type": "module" - while not strictly necessary, I find it helps especially with Vite web projects that expect it by default
  - A "main" entry point, which is typically the /dist/index.js file
  - In any common/shared packages, it is useful to put an "exports" property that defaults to the index.ts file so that types can be referenced during local development without having to build (requires more testing)
- Each tsconfig.json needs:
  - To extend from the root tsconfig.json for some global consistency
  - In my case, I decided I wanted each project to have the "module" type be "ESNext". This works well for new projects, but if you have an existing project with many dependencies that may have funny module resolution behaviours, you may need to keep things CommonJS.
  - For projects that need to import code from other projects, a "references": [] entry that points to those imports.

All dependencies are up to date as of Dec 2024.

# How to run

1. Git clone
2. At the root level, run `yarn install`
3. `yarn build` to build, or
4. `yarn start` to start the API and web server concurrently with `npm-run-all` (the `concurrently` package didn't play well with modules)

# What's next

I may continue to add to this project over time to customize to my general use cases. Others may find it useful to clone if they have a similar project structure coming up and want a working starting point, but I recommend anyone starting a new project to give the setup a crack on their own. Depending on your familiarity with these tools, it may take upwards of a day to truly get right, as it was the case for me.
