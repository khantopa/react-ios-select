# react-ios-select

![npm](https://img.shields.io/npm/v/react-ios-select)
![NPM](https://img.shields.io/npm/l/react-ios-select)

`react-ios-select` is a React component that provides an iOS-style select menu for your web applications. It offers a sleek and intuitive way for users to make selections, mimicking the experience of selecting options on an iOS device.

## Installation

You can install `react-ios-select` via npm:

```bash
npm install react-ios-select
```

or via yarn:

```bash
yarn add react-ios-select
```

## Usage

To use `react-ios-select` in your React application, simply import the component and render it with the appropriate props:

```jsx
import React from 'react';
import IOSSelect from 'react-ios-select';

const MyComponent = () => {
  const options = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'orange', label: 'Orange' },
  ];

  return (
    <div>
      <h1>Choose a Fruit</h1>
      <IOSSelect
        options={options}
        onChange={(selectedOption) => console.log(selectedOption)}
      />
    </div>
  );
};

export default MyComponent;
```

## Props

- `options` (array): An array of objects representing the options available in the select menu. Each object should have `value` and `label` properties.
- `onChange` (function): A callback function that is called whenever the selected option changes. It receives the selected option object as an argument.
- `defaultValue` (string): The default selected option value.
- `disabled` (boolean): Disables the select menu if set to `true`.
- `className` (string): Additional CSS class names to apply to the select menu.

## Example

You can find an example of `react-ios-select` in action in the `example` directory of this repository.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Issues

If you encounter any issues or have suggestions for improvements, please feel free to [open an issue](https://github.com/khantopa/react-ios-select/issues).

---

Replace `yourusername` in the Issues section with your GitHub username if you're hosting the project on GitHub. This template provides a basic structure for your README, but feel free to customize it further to suit your project's specific needs.
