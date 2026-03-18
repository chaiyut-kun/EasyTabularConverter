# Project Name
Tabular data format converter (such as csv, json[array], excel, markdown table etc.)

# Project Description
[For Gemini Agents] This project use for make a web prototype
there are less function but can show concept and how this project work

# Coding conventions
- Use ESM modules in this project for modern Node.js conventions
- Use camelCase for variable & functions
- Make type, interface fits for data that use for project & useful for understand, reading and fix code later 

# Tech Stack
- React [version 19] (typescript)
- Node.js [i have mine version 22]
- Tailwindcss [version 4] (for style)
- Useful library that fits my figma design

# Development guidelines
- Looking at my designs, action, page, and implement by follwing my contructions
- Always add a relevant test case when fixing a bug, refactoring or creating a new feature
- Always run `npm run lint` after you finished your tasks and fix any errors
- Always run `npm run test` after you finished your tasks and fix any errors

# Coming Features
- [x] 1. Convert from `Text` to any data format of this project use whitespaces as delimiter such as
```input
Name	Title
Ross Gellar	Paleontologist
Monica Gellar	Chef
Phoebe Buffay	Musician
```

```output
Name,Title
Ross,Gellar,Paleontologist
Monica,Gellar,Chef
Phoebe,Buffay,Musician
```

- [x] 2. Convert from `any source` to any SQL Insert Script
**Example**
```input
Name	Title
Ross Gellar	Paleontologist
Monica Gellar	Chef
Phoebe Buffay	Musician
```

```output
INSERT INTO `Employees` (`Name`,`Title`) VALUES
('Ross Gellar','Paleontologist'),
('Monica Gellar','Chef'),
('Phoebe Buffay','Musician');
```

- [x] 3. Convert from `any source` to Markdown Table
**Example**
```input
Name,Title
Ross Gellar,Paleontologist
Monica Gellar,Chef
Phoebe Buffay,Musician
```

```output
| Name          | Title          |
|---------------|----------------|
| Ross Gellar   | Paleontologist |
| Monica Gellar | Chef           |
| Phoebe Buffay | Musician       |
```