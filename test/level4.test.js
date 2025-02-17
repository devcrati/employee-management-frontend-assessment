import { expect } from 'chai';

describe('Employee Management System - Level 4', function () {
    let page;
    
    before(async function () {
        this.timeout(0);
        page = await global.browser.newPage();
        await page.setDefaultNavigationTimeout(0);
        await page.goto('http://localhost:5173', {waitUntil: 'load', timeout: 10000});
        await page.waitForNetworkIdle({idleTime: 2000, timeout: 5000});
    });

    after(async function () {
        await page.close();
    })

    const getEmployeeName = async (book) => book.$eval('.employee__name', (el) => el.innerText);

    const getEmployeePosition = async (book) => book.$eval('.employee__position', (el) => el.innerText);

    const getPropertyValue = async (element, propertyName) => await (await element.getProperty(propertyName)).jsonValue();

    const getEmployeeDepartmentFromSelect = async (employee) => {
        return await getPropertyValue(await employee.$('.employee__select-btn'), 'value');
    };

    it('level 4 - should display dropdown with the corresponding department on every employee card', async function () {
        await page.waitForSelector('.departments-container .department .department__employees .employee', {visible: true, timeout: 2000});
        const employees = await page.$$('.departments-container .department .department__employees .employee');
        expect(employees.length).to.be.equal(13);
        for (const employee of employees) {
            const departmentDropdown = await employee.$('.employee__select-btn');
            expect(!!departmentDropdown, 'Every employee card should contain a department dropdown').to.be.true;

            const options = await departmentDropdown.$$eval('option', (nodes) => nodes.map(n => n.innerHTML));
            expect(options.length).to.be.equal(6);
            expect(options[0]).to.be.equal('Onboarding');
            expect(options[1]).to.be.equal('General Management Department');
            expect(options[2]).to.be.equal('Sales and Marketing Department');
            expect(options[3]).to.be.equal('HR Department');
            expect(options[4]).to.be.equal('Finance Department');
            expect(options[5]).to.be.equal('Engineering Department');
        }

        const departments = await Promise.all(employees.map((emp) => getEmployeeDepartmentFromSelect(emp)));

        const expectedDepartments = [
            '6195254f-ea6c-456b-a95c-6415422e436e',
            '6a7b4d56-c278-4d33-ae69-2bdd6e19503f',
            '6a7b4d56-c278-4d33-ae69-2bdd6e19503f',
            '1cfddf69-d2b9-4682-b1c5-d9da61c1a743',
            '1cfddf69-d2b9-4682-b1c5-d9da61c1a743',
            '9594748d-2b9d-4a96-8041-b5401994d322',
            '2503ece9-80af-477b-88ed-59808950c0d1',
            'b6ca1832-e61a-4920-a019-0381763459bb',
            'b6ca1832-e61a-4920-a019-0381763459bb',
            'b6ca1832-e61a-4920-a019-0381763459bb',
            'b6ca1832-e61a-4920-a019-0381763459bb',
            'b6ca1832-e61a-4920-a019-0381763459bb',
            'b6ca1832-e61a-4920-a019-0381763459bb',            
        ];

        expect(departments).to.have.ordered.members(expectedDepartments);
    })

    it('level 4 - should move the employee to the correspondent section whenthe department is changed', async function () {
        const departments = await page.$$('.departments-container .department');
        const onboardingEmployees = await departments[0].$$('.department__employees .employee');

        const options = await onboardingEmployees[0].$$eval('select option', (nodes) => nodes.map(n => n.getAttribute('value')));
        await page.select('select', options[5]);

        const engineeringEmployees = await departments[5].$$('.department__employees .employee');
        expect(engineeringEmployees.length).to.be.equal(7);
        expect(await getEmployeeName(engineeringEmployees[6])).to.be.equal('Peter Miller');    
        expect(await getEmployeePosition(engineeringEmployees[6])).to.be.equal('Trainee');
    })    
})