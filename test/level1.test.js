import { expect } from "chai";

describe("Employee Managment System - Level 1", function () {
  let page;

  before(async function () {
    this.timeout(0);
    page = await global.browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto("http://localhost:5173", {
      waitUntil: "load",
      timeout: 10000,
    });
    await page.waitForNetworkIdle({
      idleTime: 2000,
      timeout: 5000,
    });
  });

  after(async function () {
    await page.close();
  });

  const getEmployeeNameAndPosition = async (emp) => {
    const name = await emp.$eval(".employee__name", (el) => el.innerText);
    const position = await emp.$eval(
      ".employee__position",
      (el) => el.innerText
    );
    return [name, position];
  };

  const validateNamesAndPositions = async (
    namesAndPositions,
    departmentEmployees
  ) => {
    const allNamesAndPositions = await Promise.all(
      departmentEmployees.map((e) => getEmployeeNameAndPosition(e))
    );

    expect(allNamesAndPositions).to.have.deep.members(namesAndPositions);
  };

  it('level 1 - should display employees in the "Onboarding" section', async function () {
    const namesAndPositions = [["Peter Miller", "Trainee"]];

    await page.waitForSelector(".departments-container .department", {
      visible: true,
      timeout: 2000,
    });

    const departments = await page.$$(".departments-container .department");
    const onboardingEmployees = await departments[0].$$(
      ".department__employees .employee"
    );
    await validateNamesAndPositions(namesAndPositions, onboardingEmployees);
  });

  it('level 1 - should display employees in the "General Managment" Department section', async function () {
    const namesAndPositions = [
      ["Philip Hilton", "CEO"],
      ["Lynda Olson", "CTO"],
    ];

    const departments = await page.$$(".departments-container .department");
    const generalManagementEmployees = await departments[1].$$(
      ".department__employees .employee"
    );
    await validateNamesAndPositions(
      namesAndPositions,
      generalManagementEmployees
    );
  });

  it('level 1 - should display employees in the "Sales and Marketing Department" section', async function () {
    const namesAndPositions = [
      ["Donovan Marsh", "SVP of Sales and Marketing"],
      ["Ivy Richmond", "Marketing Manager"],
    ];

    const departments = await page.$$(".departments-container .department");
    const salesAndMarketingEmployees = await departments[2].$$(
      ".department__employees .employee"
    );
    await validateNamesAndPositions(
      namesAndPositions,
      salesAndMarketingEmployees
    );
  });
});
