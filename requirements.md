# Instructions

Your task is to implement some UI features of an employee management system. All opeations that should be supported are listed below.

Solving this task consists of several levels. You always have access to the data for the current and all previous levels.

# Requirements

Your task is to implement some UI features of a employee management system. Plan your design according to the level specifications below:

- Level 1: The employee management system should show the list of employee cards in the dashboard.
- Level 2: The employee management system should support adding new employees to the dashboard via form.
- Level 3: The employee management system should support rendering the list of employees from a different source via API.
- Level 4: The employee management system should support moving employess within departments.

# Level 1

First, the system should display a dashboard with employee cards (containing their name and position) organized into 3 departments: `Onboarding`, `General Management Department`, and `Sales and Marketing Department`. For this level, implement functionality to render the dashboard from JSON objects containing employee data. The result should look as follows:

Check `level1.mp4` (/public)

https://github.com/user-attachments/assets/504f1ca5-cc6e-4164-9c7e-c53c9a706cb6



This is the HTML template for an employee card (note that it's pure HTML, and you might need to convert it to your framework's template syntax):

```html
<div class="employee">
  <h4 class="employee__name">Peter Miller</h4>
  <span class="employee__position">Trainee</span>
</div>
```

## Acceptance Criteria

```
Scenario: Displaying employee cards in the appropriate section on the dashboard
    Given A JSON object (imported in departmentService, exposed as departmentService.departments)
    When dashboard is rendered
    Then All employee cards are displayed in the appropriate section based on the given template
        And Employee cards contain employee names in the following format: `${firstName} ${lastName}`
```

# Level 2

The system should allow the user to add new employees to the dashboard. For this level, implement functionality to support such user input via an `Add a new employee` form. The following video shows the expected behavior of this form:

Check `level2.mp4` (/public)


https://github.com/user-attachments/assets/1f914912-9b61-424c-bf3e-05eb308b8e57



This is the HTML template for `Add a new employee` form:

```html
<div class="add-employee-form">
  <form>
    <input name="firstName" placeholder="First Name" />
    <input name="lastName" placeholder="Last Name" />
    <input name="position" placeholder="Position" />
    <input type="submit" value="Add" />
  </form>
</div>
```

Note: In order to generate a unique ID, the `uuid` library has been pre-installed. You may use it by importing it as follows: `import {v4 as uuidv4} from 'uuid`. Alternatively, you can use any unique randomly-generated string.

## Acceptance Criteria

```
Scenario: Submitting a filled form
    Given `First name`, `Last name`, and `Position` fields are not empty
    When "Add" button is clicked
    Then Form is submitted successfully
    And New employee card is added to the bottom of the "Onboarding" section
    And Form fields are cleared
```

```
Scenario: Submitting a form with empty mandatory fields
    Given An empty mandatory field, either `First name`, `Last name`, or `Position`
    When "Add" button is clicked
    Then Form is not submitted
    And New employee card is not added to the dashboard
    And Form fields are not cleared
```

# Level 3

For this level, instead of rendering the page using hardcoded data, implement functionality to support using APIs to retrieve data for departments and their employees. You are given 2 APIs:

- Departments API: `GET https://api-regional.codesignalcontent.com/employee-management-system/departments`

Departments API response example

```
[
    {
        "id": "844eb68c-d6ae-4eac-9808-fdf025b12746",
        "title": "Department 1",
        "description": "Department description",
        "employees": [
            "3965a48d-c137-420a-a8e0-43c56c3620a5",
            "66c950f3-2aba-4a95-aa6d-0c13ed621be0",
            ...
        ]
    },
    {
        "id": "1af2b4c0-ec46-4f15-8b8d-efbfbdb7ee0d",
        "title": "Department 2",
        "description": "Another department description",
        "employees": [
            "cd9f27b0-138a-4f65-b578-3b4743b865c1",
            ...
        ]
    }
]
```

- Employees API: `GET https://api-regional.codesignalcontent.com/employee-management-system/employees/${employeeId}`

Employees API response example
-- This endpoint may return a 404 response code indicating that the specified employee does not exist
-- You are not expected to optimize data retrieval. You should just request items one by one.

The `Departments` API returns the IDs of employees in the `"employees"` field.
Some employees may be deleted, so their cards should not be displayed.

After completing this level, the rendered dashboard should look as follows:

Check `level3.mp4` (/public)


https://github.com/user-attachments/assets/545c4730-ad96-4ad0-ad1b-2e8a50a00fc1



## Acceptance Criteria

```
Scenario: Using the Departments API
    Given Departments API returns a JSON with departments data
    When Dashboard is rendered
    Then All departments are displayed
```

```
Scenario: Displaying existing employees
    Given A department with IDs of employees
    And Employees API returns a 200 response with employee information
    When Department section is rendered
    Then Employee card for this employee is displayed
```

```
Scenario: Not displaying nonexistent employees
    Given A department with IDs of employees
    And Employees API returns a 404 response for a particular employee
    When Department section is rendered
    Then Employee card for this employee is not displayed
```

# Level 4

Users should be able to move employees between departments. For this level, implement functionality to move employees by adding a "Department" dropdown menu to each employee card. The following video shows the expected behavior of this dropdown menu:

Check `level4.mp4` (/public)


https://github.com/user-attachments/assets/718e7f36-78cd-4485-b4b3-f09b8b293d8a




This is the `updated` HTML template for an employee card with the "Department" dropdown:

```html
<div class="employee">
  <h4 class="employee__name">Peter Miller</h4>
  <select class="employee__select-btn" name="department">
    <option value="6195254f-ea6c-456b-a95c-6415422e436e">Onboarding</option>
    <option value="6a7b4d56-c278-4d33-ae69-2bdd6e19503f">
      General Management Department
    </option>
    <option value="1cfddf69-d2b9-4682-b1c5-d9da61c1a743">
      Sales and Marketing Department
    </option>
    <option value="9594748d-2b9d-4a96-8041-b5401994d322">HR Department</option>
    <option value="2503ece9-80af-477b-88ed-59808950c0d1">
      Finance Department
    </option>
    <option value="b6ca1832-e61a-4920-a019-0381763459bb">
      Engineering Department
    </option>
  </select>
  <span class="employee__position">Trainee</span>
</div>
```

## Acceptance Criteria

```
Scenario: Rendering "Department" dropdown menu
    Given Department API and Employees API return data about departments and their employees
    When Dashboard is rendered
    Then All employees cards are displayed in the appropriate sections based to the given template
    And All employee cards contains a "Department" dropdown
    And Selected value for the "Department" dropdown should display the current department for the employee
```

```
Scenario: Moving an employee to another department
    Given An employee card with the "Department" dropdown
    When "Department" dropdown is used to select another department
    Then Employee card is moved to the bottom of the newly selected department
```
