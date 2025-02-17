# xAI Frontend Framework Assessment

## Overview

This project is a frontend framework assessment for an employee management system. It is built using React and Vite, and it involves implementing various UI features across multiple levels of complexity.

## Project Structure

- **src**: Contains the main source code for the application.
  - `index.jsx`: Entry point for the React application.
  - `App.jsx`: Main application component.
  - `DepartmentCard.jsx`: Component for displaying department information.
  - `AddEmployeeForm.jsx`: Component for adding new employees.
  - `index.scss`: Styles for the application.

- **public**: Contains static assets like videos demonstrating expected behavior for each level.

- **test**: Contains test files for different levels of the application.

## Levels

1. **Level 1**: Display a dashboard with employee cards organized into departments.
2. **Level 2**: Add new employees via a form.
3. **Level 3**: Fetch and display employee data from APIs.
4. **Level 4**: Move employees between departments using a dropdown menu.

## Setup

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Run the development server:
   ```bash
   pnpm dev
   ```

3. Build the project:
   ```bash
   pnpm build
   ```

4. Preview the build:
   ```bash
   pnpm preview
   ```

## Testing

Run tests for each level using Mocha:
- Level 1: `mocha test/bootstrap.test.js test/level1.test.js`
- Level 2: `mocha test/bootstrap.test.js test/level2.test.js`
- Level 3: `mocha test/bootstrap.test.js test/level3.test.js`
- Level 4: `mocha test/bootstrap.test.js test/level4.test.js`

## Dependencies

- React
- Vite
- Axios
- Mocha
- Chai
- Puppeteer

## License

This project is licensed under the MIT License.