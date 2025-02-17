import { expect } from 'chai';

describe('Employee Management System - Level 3', function () {
    let page;

    const requests = [];
    const API_GATEWAY = 'https://api-regional.codesignalcontent.com/employee-management-system';

    before(async function () {
        this.timeout(0);
        page = await global.browser.newPage();
        await page.setRequestInterception(true);
        page.on('request', (request) => {
            requests.push(request.url().toString());
            request.continue();            
        });
        await page.setDefaultNavigationTimeout(0);
        await page.goto('http://localhost:5173', {waitUntil: 'load', timeout: 10000});
        await page.waitForNetworkIdle({idleTime: 2000, timeout: 5000});
    });

    after(async function () {
      await page.close();  
    })

    const checkHttpRequestWasMade = (url) => {
        expect(requests.includes(url), `Your application must send an HTTP request to ${url}`).to.be.true;
    }

    const getEmployeeNameAndPosition = async (emp) => {
        const name = await emp.$eval('.employee__name', (el) => el.innerText);
        const position = await emp.$eval('.employee__position', (el) => el.innerText);
        return [name, position];
    }

    const validateIdsAndNamesAndPositions = async (employeeIds, namesAndPositions, departmentEmployees) => {
        const allNamesAndPositions = await Promise.all(
            departmentEmployees.map((e) => getEmployeeNameAndPosition(e))
        );

        expect(allNamesAndPositions).to.have.deep.members(namesAndPositions);
        employeeIds.forEach((eid) => checkHttpRequestWasMade(`https://api-regional.codesignalcontent.com/employee-management-system/employees/${eid}`))
    }

    it('level 3 - should display employees in the "Onboarding" section', async function () {
        const employeeIds = ['b3ad9acd-22b4-4ec1-8227-8060f002b89f'];

        const namesAndPositions = [['Peter Miller', 'Trainee']];

        await page.waitForSelector('.departments-container .department', {visible: true, timeout: 2000});

        checkHttpRequestWasMade(`${API_GATEWAY}/departments`);

        const departments = await page.$$('.departments-container .department');
        const onboardingEmployees = await departments[0].$$('.department__employees .employee');

        await validateIdsAndNamesAndPositions(employeeIds, namesAndPositions, onboardingEmployees);
    })

    it('level 3 - should display employees in the "General Management" Department section', async function () {
        const employeeIds = ['a9f39c40-b073-11ec-b909-0242ac120002', 'a5caa712-b073-11ec-b909-0242ac120002'];
        const namesAndPositions = [['Philip Hilton', 'CEO'], ['Lynda Olson', 'CTO']];

        checkHttpRequestWasMade(`${API_GATEWAY}/departments`);

        const departments = await page.$$('.departments-container .department');
        const generalManagementEmployees = await departments[1].$$('.department__employees .employee');
        validateIdsAndNamesAndPositions(employeeIds, namesAndPositions, generalManagementEmployees);
    });

    it('level 3 - should display employees in the "Sales and Marketing Department" section', async function () {
        const employeeIds = ['f9f6757f-c07e-46d7-ae93-21cbe1f9980b', 'e2cc07b6-fb29-490e-b2c6-40c2cd5a12805'];

        const namesAndPositions = [['Donovan Marsh', 'SVP of Sales and Marketing'], ['Ivy Richmond', 'Marketing Manager']];

        checkHttpRequestWasMade(`${API_GATEWAY}/departments`);

        const departments = await page.$$('.departments-container .department');
        const salesAndMarketingEmployees = await departments[2].$$('.department__employees .employee');
        validateIdsAndNamesAndPositions(employeeIds, namesAndPositions, salesAndMarketingEmployees);
    });

    it('level 3 - should display employees in the "HR Department" section', async function () {
        const employeeIds = ['382dffad-4988-45c8-912f-c26477ac0d6d'];

        const namesAndPositions = [['Thelma Drew', 'Director of Recruiting']];

        checkHttpRequestWasMade(`${API_GATEWAY}/departments`);

        const departments = await page.$$('.departments-container .department');
        const hrEmployees = await departments[3].$$('.department__employees .employee');
        validateIdsAndNamesAndPositions(employeeIds, namesAndPositions, hrEmployees);
    })

    it('level 3 - should display employees in the "Finance Department" section', async function () {
        const employeeIds = ['70491684-9c57-456c-9c66-37f4c1f7e8d2'];

        const namesAndPositions = [['Byron Higgs', 'Head of Finance and Accounting']];

        checkHttpRequestWasMade(`${API_GATEWAY}/departments`);

        const departments = await page.$$('.departments-container .department');
        const financeEmployees = await departments[4].$$('.department__employees .employee');
        validateIdsAndNamesAndPositions(employeeIds, namesAndPositions, financeEmployees);
    })

    it('level 3 - should display employees in the "Engineering Department" section', async function () {
        const employeeIds = ['531df641-aa7a-440e-b84e-edf80c820b08',
            'b709d581-f737-4a81-8aeb-ed750e66dd25',
            'ed69223f-814b-4a1c-96f9-c311838c5a44',
            'a18e486c-4840-41fd-8ab8-f327e7804b3a',
            '274b1a59-026d-4c9d-bcba-cd47a1a4ba96',
            '2b7722f5-39d6-4acc-87bb-ee7c7339f880'
        ];
        const namesAndPositions = [
            ['Sophia Rodgers', 'Sr. Frontend Engineer'],
            ['Lisa Lake', 'Team Lead'],
            ['Bella Mcdonnell', 'DevOps Engineer'],
            ['Kayla Glenn', 'Sr. Backend Engineer'],
            ['Kaiya Russo', 'Frontend Engineer'],
            ['Nolan Stout', 'Sr. Backend Engineer']
        ];

        checkHttpRequestWasMade(`${API_GATEWAY}/departments`);

        const departments = await page.$$('.departments-container .department');
        const engineeringEmployees = await departments[5].$$('.department__employees .employee');
        validateIdsAndNamesAndPositions(employeeIds, namesAndPositions, engineeringEmployees);        
    })
})