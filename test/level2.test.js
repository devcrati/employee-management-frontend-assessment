import { expect } from 'chai';

describe('Employee Management System - Level 2', function () {
    let page;

    before(async function () {
        this.timeout(0);
        page = await global.browser.newPage();
        await page.setDefaultNavigationTimeout(0);
        await page.goto('http://localhost:5173', {
            waitUntil: 'load',
            timeout: 10000
        });
        await page.waitForNetworkIdle({
            idleTime: 2000,
            timeout: 5000
        });
    });

    after(async function () {
        await page.close();
    });

    const getEmployeeName = async (emp) => emp.$eval('.employee__name', (el) => el.innerText);

    const getEmployeePosition = async (emp) => emp.$eval('.employee__position', (el) => el.innerText);

    const getPropertyValue = async (element, propertyName) => await (await element.getProperty(propertyName)).jsonValue();

    const setInputValue = async (selector, text) => {
        const input = await page.$(selector);
        await input.click({clickCount: 3});
        if (!!text) {
            await input.type(text);
        } else {
            await page.keyboard.press('Backspace');            
        }
    };

    const setFirstNameInputValue = async (text) => setInputValue('.add-employee-form input[name="firstName"]', text);

    const getFirstNameInputValue = async () => page.$eval('.add-employee-form input[name="firstName"]', (el) => el.value);

    const setLastNameInputValue = async (text) => setInputValue('.add-employee-form input[name="lastName"]', text);

    const getLastNameInputValue = async () => page.$eval('.add-employee-form input[name="lastName"]', (el) => el.value);

    const setPositionInputValue = async (text) => setInputValue('.add-employee-form input[name="position"]', text);

    const getPositionInputValue = async () => page.$eval('.add-employee-form input[name="position"]', (el) => el.value);

    const clickSubmitButton  = async () => {
        const addNewEmployeeButton = await page.$('.add-employee-form input[type=submit]');
        await addNewEmployeeButton.click();
    }

    it('level 2 - should render the form', async function () {
        await page.waitForSelector('main .add-employee-form', {
            visible: true, timeout: 2000
        });
        const form = await page.$('main .add-employee-form');

        const firstNameInput = await form.$('input[name="firstName"]');
        expect(await getPropertyValue(firstNameInput, 'placeholder')).to.be.equal('First name*');

        const lastNameInput = await form.$('input[name="lastName"]');
        expect(await getPropertyValue(lastNameInput, 'placeholder')).to.be.equal('Last name*');

        const positionInput = await form.$('input[name="position"]');
        expect(await getPropertyValue(positionInput, 'placeholder')).to.be.equal('Position*');

        const addNewEmployeeButton = await form.$('input[type=submit]');
        expect (await getPropertyValue(addNewEmployeeButton, 'value')).to.be.equal('Add');
    }) ;

    it('level 2 - should not submit form if "position" field is empty', async function () {
        const firstName = 'Peter';
        await setFirstNameInputValue(firstName);
        expect(await getFirstNameInputValue()).to.be.equal(firstName);

        const lastName = 'Hilton' ;
        await setLastNameInputValue(lastName);
        expect(await getLastNameInputValue()).to.be.equal(lastName);

        await clickSubmitButton();
        await new Promise(r => setTimeout(r, 200));

        await page.waitForSelector('.departments-container .department', {
            visible: true,
            timeout: 2000
        });
        const departments = await page.$$('.departments-container .department');
        const onboardingEmployees = await departments[0].$$('.department__employees .employee');
        expect(onboardingEmployees.length).to.be.equal(1);

        expect(await getFirstNameInputValue(), '"firstName" field should not be cleared because form was not submitted').to.be.equal(firstName);
        expect(await getLastNameInputValue(), '"lastName" field should not be cleared because form was not submitted').to.be.equal(lastName);
    });

    it('level 2 - should not submit form if "firstName" field is empty', async function () {
        const firstName = '';
        await setFirstNameInputValue(firstName);
        expect(await getFirstNameInputValue()).to.be.equal(firstName);

        const lastName = 'Hilton';
        await setLastNameInputValue(lastName);
        expect(await getLastNameInputValue()).to.be.equal(lastName);

        const position = 'HR';
        await setPositionInputValue(position);
        expect(await getPositionInputValue()).to.be.equal(position);

        await clickSubmitButton();
        await new Promise(r => setTimeout(r, 200));
        
        const departments = await page.$$('.departments-container .department');
        const onboardingEmployees = await departments[0].$$('.department__employees .employee');
        expect(onboardingEmployees.length).to.be.equal(1);

        expect(await getFirstNameInputValue()).to.be.equal('');
        expect(await getLastNameInputValue(), '"lastName" field should not be cleared because form was not submitted').to.be.equal(lastName);
        expect(await getPositionInputValue(), '"position" field should not be cleared because form was not submitted').to.be.equal(position); 
    })

    it('level 2 - should not submit form if "lastName" field is empty', async function () {
        const firstName = 'Peter';
        await setFirstNameInputValue(firstName);
        expect(await getFirstNameInputValue()).to.be.equal(firstName);

        const lastName = '';
        await setLastNameInputValue(lastName);
        expect(await getLastNameInputValue()).to.be.equal(lastName);

        const position = 'HR';
        await setPositionInputValue(position);
        expect(await getPositionInputValue()).to.be.equal(position);

        await clickSubmitButton();
        await new Promise(r => setTimeout(r, 200));

        const departments = await page.$$('.departments-container .department');
        const onboardingEmployees = await departments[0].$$('.department__employees .employee');
        expect(onboardingEmployees.length).to.be.equal(1);
        
        expect(await getFirstNameInputValue(), '"firstName" field should not be cleared because form was not submitted').to.be.equal(firstName);
        expect(await getLastNameInputValue(), '"lastName" field should not be cleared because form was not submitted').to.be.equal(lastName);
        expect(await getPositionInputValue(), '"position" field should not be cleared because form was not submitted').to.be.equal(position);
    });

    it('level 2 - should submit form and add a new employee', async function () {
        const firstName = 'Peter';
        await setFirstNameInputValue(firstName);
        expect(await getFirstNameInputValue()).to.be.equal(firstName);

        const lastName = 'Hilton';
        await setLastNameInputValue(lastName);
        expect(await getLastNameInputValue()).to.be.equal(lastName);

        const position = 'HR';
        await setPositionInputValue(position);
        expect(await getPositionInputValue()).to.be.equal(position);

        await clickSubmitButton();
        await new Promise(r => setTimeout(r, 200));

        const departments = await page.$$('.departments-container .department');
        const onboardingEmployees = await departments[0].$$('.department__employees .employee');
        expect(onboardingEmployees.length).to.be.equal(2);
        expect(await getEmployeeName(onboardingEmployees[1])).to.be.equal(`${firstName} ${lastName}`);
        expect(await getEmployeePosition(onboardingEmployees[1])).to.be.equal(position);
        
        expect(await getFirstNameInputValue(), '"firstName" field should be cleared because form was submitted').to.be.equal('');
        expect(await getLastNameInputValue(), '"lastName" field should be cleared because form was submitted').to.be.equal('');
        expect(await getPositionInputValue(), '"position" field should be cleared because form was submitted').to.be.equal('');
    });
})