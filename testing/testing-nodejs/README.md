# Testing NodeJS Application

1. Testing Framework

- https://mochajs.org/getting-started/
- https://www.chaijs.com/guide/installation/

- Mocha is a popular JavaScript test framework that provides a flexible structure for writing and running tests. It allows for organizing tests in suites and supports asynchronous testing, making it suitable for both unit and integration tests.

- Chai is an assertion library that works seamlessly with Mocha. It provides expressive and readable assertions, enabling developers to write tests that are easy to understand and maintain. Chai supports multiple assertion styles (such as expect, should, and assert), allowing for flexibility in test writing.

- Using Mocha and Chai together helps ensure code correctness, facilitates test-driven development, and improves code quality by catching errors early in the development process.

```sh
npm i -D mocha
npm install --save-dev chai
```

## Testing Types

### Unit Test:

- Tests individual functions or components in isolation.
- Ensures that a specific unit of code works as expected.
- Typically uses mocks or stubs for dependencies.
- Example: Testing a single function's output given specific inputs.

### Integration Test:

- Tests how multiple units or components work together.
- Ensures that interactions between modules or services are correct.
- May involve real or mocked dependencies.
- Example: Testing a service that interacts with a database.

### End-to-End (E2E) Test:

- Tests the complete flow of an application from start to finish.
- Simulates real user scenarios and interactions.
- Typically runs against a fully deployed application.
- Example: Testing user login, navigation, and data submission in a web app.

## Testing Methodologies

### BDD

BDD = Behavior Driven Development

```
Requirement → Behavior description → Automated test → Implementation
```

```md
Given a user has an account
When the user logs in with correct password
Then the system returns a JWT token
```

Mocha itself is not a BDD framework.
Mocha simply provides a BDD-style interface.

```js
describe("Login feature", () => {
  describe("when password is correct", () => {
    it("should return JWT token", () => {});
  });
});
```

| Aspect   | TDD              | BDD                |
| -------- | ---------------- | ------------------ |
| Focus    | Code correctness | System behavior    |
| Audience | Developers       | Dev + business     |
| Style    | Unit tests       | Behavior scenarios |
| Syntax   | testAdd()        | should add numbers |
| Language | technical        | human-readable     |

- The BDD interface provides describe(), context(), it(), specify(), before(), after(), beforeEach(), and afterEach().
- The TDD interface provides suite(), test(), suiteSetup(), suiteTeardown(), setup(), and teardown()
