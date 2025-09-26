# 🎭 Playwright E2E Automation – Playground Website

This project contains **end-to-end automation tests** for the Playground demo website using [Playwright](https://playwright.dev/).  
It covers scenarios like login, wishlist, cart management, filtering products, and checkout with multiple users.

---

## 🚀 Getting Started

### 1. Clone the repo

git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
2. Install dependencies

npm install
**3. Generate storage states (auth JSON)**
Before running tests, log in with both users to save their sessions.


npx ts-node tests/setup/setup-poornima.ts
npx ts-node tests/setup/setup-user2.ts
This will create:

playwright/.auth/poornima.json

playwright/.auth/user2.json

These files are used so tests can reuse logged-in sessions instead of logging in again every time.

**4. Run tests**

npx playwright test
Run a specific test file:


npx playwright test tests/E2E.spec.ts
Run headed mode (with browser UI):


npx playwright test --headed
📊 Reports
Playwright HTML Report
After test execution:


npx playwright show-report
Allure Report
Generate and open Allure report:


npx allure generate artifacts/allure-results --clean -o artifacts/allure-report
npx allure open artifacts/allure-report
⚙️ GitHub Actions (CI/CD)
This repo has a GitHub Actions workflow (.github/workflows/playwright.yml) which runs automatically on push and pull requests to main.

The workflow:

Installs dependencies

Runs setup scripts (for both users)

Executes all Playwright tests

Uploads reports as artifacts:

playwright-html-report

allure-results

You can download them from the Actions run page.

📂 Project Structure

playground-auto/
├── tests/
│   ├── setup/                 
│   │   ├── setup-poornima.ts      # Setup for Poornima user
│   │   └── setup-user2.ts         # Setup for User2
│   ├── E2E.spec.ts                # Main E2E test
│   └── ...                        
├── utils/
│   └── data/test-data.json        # Test data (URLs, users, etc.)
├── playwright.config.ts           # Playwright configuration
├── package.json
└── tsconfig.json
👩‍💻 Author
Poornima K R - Associate Test Engineer

