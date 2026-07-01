# Login flow test plan

## Application Overview

Test plan for the OpenBoxes login flow using the existing seed test as a baseline and focusing on successful authentication plus common failure and validation paths.

## Test Scenarios

### 1. Login flow

**Seed:** `tests/seed.spec.ts`

#### 1.1. should log in with valid credentials and land on location selection

**File:** `tests/login.spec.ts`

**Steps:**
  1. Open the login page at /auth/login
    - expect: The login form is displayed with email/username, password, and Login fields.
  2. Enter a valid email or username from the environment configuration
    - expect: The email/username input contains the provided value.
  3. Enter the corresponding valid password from the environment configuration
    - expect: The password input contains the provided value.
  4. Click the Login button
    - expect: The page navigates to the location selection screen and the URL contains chooseLocation.

#### 1.2. should show an error for a valid username with an incorrect password

**File:** `tests/login.spec.ts`

**Steps:**
  1. Open the login page at /auth/login
    - expect: The login form is displayed.
  2. Enter a valid username with an incorrect password
    - expect: The credentials are entered into the form.
  3. Click the Login button
    - expect: An authentication error message is shown and the user remains on the login page.

#### 1.3. should show an error for a non-existent username with a correctly-formatted password

**File:** `tests/login.spec.ts`

**Steps:**
  1. Open the login page at /auth/login
    - expect: The login form is displayed.
  2. Enter a non-existent username with a correctly-formatted password
    - expect: The credentials are entered into the form.
  3. Click the Login button
    - expect: An authentication error message is shown and the user remains on the login page.

#### 1.4. should show an error when both the username and password are invalid

**File:** `tests/login.spec.ts`

**Steps:**
  1. Open the login page at /auth/login
    - expect: The login form is displayed.
  2. Enter an invalid username and an invalid password
    - expect: The credentials are entered into the form.
  3. Click the Login button
    - expect: An authentication error message is shown and the user remains on the login page.

#### 1.5. should block submission when required fields are empty

**File:** `tests/login.spec.ts`

**Steps:**
  1. Open the login page at /auth/login
    - expect: The login form is displayed.
  2. Leave the email/username and password fields empty
    - expect: The form does not submit successfully.
  3. Click the Login button
    - expect: The user remains on the login page and validation feedback is shown for the required fields.
