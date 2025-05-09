# Cypress + Next.js Boilerplate Setup Guide

This guide explains how to set up **Cypress** for **E2E** and **Component Testing** in a **Next.js** project, with **Code Coverage** reporting included.

---

## ✨ Initial Project Setup

1. **Create a Next.js project:**
   ```bash
   npx create-next-app@latest my-nextjs-app
   cd my-nextjs-app
   ```

2. **Install Cypress and Coverage Tools:**
   ```bash
   npm install --save-dev cypress @cypress/code-coverage nyc istanbul-lib-coverage babel-plugin-istanbul
   ```

3. **Install required Cypress dependencies for component testing:**
   ```bash
   npm install --save-dev @cypress/react @cypress/webpack-dev-server
   ```

---

## 🔄 Modify Scripts and Configuration

### package.json

Update scripts:
```json
"scripts": {
  "dev": "next dev -p 4200",
  "cypress:open:e2e": "cypress open --e2e",
  "cypress:open:component": "cypress open --component",
  "coverage:report": "nyc report --reporter=text --reporter=html"
}
```

### cypress.config.js

Create `cypress.config.js`:
```js
import { defineConfig } from 'cypress';
import codeCoverageTask from '@cypress/code-coverage/task';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',
    setupNodeEvents(on, config) {
      codeCoverageTask(on, config);
      return config;
    },
    supportFile: 'cypress/support/e2e.js'
  },
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
    setupNodeEvents(on, config) {
      codeCoverageTask(on, config);
      return config;
    },
    supportFile: 'cypress/support/component.js'
  }
});
```

### Babel Configuration (.babelrc.js)

Create or edit `.babelrc.js`:
```js
module.exports = {
  presets: ['next/babel'],
  plugins: ['istanbul']
};
```

---

## 🔀 Create Cypress Folder Structure

```
cypress/
├── component/
│   └── [component tests]
├── e2e/
│   └── [e2e tests]
├── fixtures/
├── support/
    ├── component.js
    └── e2e.js
```

### cypress/support/e2e.js
```js
import '@cypress/code-coverage/support';
```

### cypress/support/component.js
```js
import '@cypress/code-coverage/support';
```

---

## 🌍 Example Pages and Components for Testing

### pages/index.js
```jsx
import Link from 'next/link';

export default function Home() {
  const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ];

  return (
    <div>
      <h1>Team</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}
            <Link href={`/user/${user.id}`}>
              <button>View Profile</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### pages/user/[id].js
```jsx
import { useRouter } from 'next/router';

export default function UserProfile() {
  const { id } = useRouter().query;
  return (
    <div>
      <h2>User Profile</h2>
      <p>User ID: {id}</p>
    </div>
  );
}
```

### components/Button.js
```jsx
export default function Button({ label, onClick }) {
  return <button onClick={onClick}>{label}</button>;
}
```

---

## 🔢 Example E2E Test

### cypress/e2e/home.cy.js
```js
describe('Home Page', () => {
  it('navigates to a user profile', () => {
    cy.visit('/');
    cy.contains('View Profile').first().click();
    cy.url().should('include', '/user/1');
    cy.contains('User ID: 1');
  });
});
```

## 🔢 Example Component Test

### cypress/component/Button.cy.js
```js
import Button from '../../components/Button';

describe('<Button />', () => {
  it('renders and responds to click events', () => {
    const onClick = cy.stub().as('onClickHandler');
    cy.mount(<Button label="Click Me" onClick={onClick} />);
    cy.get('button').click();
    cy.get('@onClickHandler').should('have.been.calledOnce');
  });
});
```

---

## ✨ Run and Generate Coverage Report

### 1. Start Dev Server
```bash
npm run dev
```

### 2. Open Cypress for E2E Testing
```bash
npm run cypress:open:e2e
```

### 3. Open Cypress for Component Testing
```bash
npm run cypress:open:component
```

### 4. Run Tests
Execute tests in Cypress UI or CLI.

### 5. Generate Coverage Report
```bash
npm run coverage:report
```

### 6. View Report
Open `coverage/index.html` in a browser.

---

## 📈 Useful Tips
- Always run tests before generating a report (to create `.nyc_output`)
- Ignore warnings about deprecated packages unless critical
- Use `data-cy` attributes in components for better test stability
- Ensure `@cypress/code-coverage` is imported properly in both support files

---

# Happy Testing ✨ with Next.js + Cypress!

