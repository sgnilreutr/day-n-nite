day-n-nite
=======================

This is a simple React and Next.js project that allows users to toggle between light and dark modes, with an additional "auto" mode that listens to the prefers-color-scheme media element. The mode setting is stored using localStorage, so that it persists even after the user leaves the page.

Features
--------

*   Light and dark mode toggle button
*   Auto mode that listens to prefers-color-scheme media element
*   Mode setting is stored in localStorage
*   Compatible with React and Next.js projects
*   Written in TypeScript
*   Uses tailwindcss for styling

Installation
------------

1.  Install the `day-n-nite` package in your project:

    `npm i day-n-nite`
    `yarn add day-n-nite`
    `pnpm i day-n-nite`

2.  Set the path and darkmode for tailwind.config.js in your project:

    `module.exports = {
      content: [..., "./node_modules/day-n-nite/dist/**/*.{js,ts,jsx,tsx}"],
      darkMode: 'class',
      ...
    }`

3.  Import the `ModeSwitch` component from the package in your project:

    import { modeSwitch } from 'day-n-nite';

4.  Use the `ModeSwitch` component in your React or Next.js component:

    `const MyComponent = () => {
      return (
        <div>
          <h1>My App</h1>
          <ModeSwitch />
        </div>
      );
    };`

That's it! Your users can now toggle between light and dark mode, and their preference will be stored in localStorage.

Props
-----

The `ModeSwitch` component accepts the following props:

*   `defaultMode` (string): The default mode to use when the component is first rendered. Possible values are "light", "dark", and "auto". Default value is "auto".
*   `onChange` (function): A callback function that is called whenever the mode is changed. The function receives the new mode as an argument.

Contributing
------------

If you'd like to contribute to this project, feel free to submit a pull request or open an issue on GitHub. Please ensure that your code is well-tested and follows the existing coding style.
