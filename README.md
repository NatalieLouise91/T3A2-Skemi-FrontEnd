# Skemi

## Purpose

Skemi (pronounced ske-mi) is an event planning and scheduling app built for a sydney based company that plans and services approximately 200 events a year. These events require meticulous organisation and as the business scales, current planning and scheduling processes have become outdated, slow, and unreliable.

The purpose of this app is to streamline the event planning process for Shared Affair by replacing the current procedure and tools in place; they currently use google calendar, excel spreadsheets and direct communication. The app will allow admins to easily create and roster events as well as provide a streamlined method for employees to track upcoming events, allow employees to self register for work, provide relevant event information including other rostered employees, food lists and custom notes, and provide a way to easily track upcoming work schedules.

Although there are existing systems and software like Deputy, foundU and Kronos that handle employee scheduling, these systems are built around immutable variables that make it difficult for event planning and catering businesses to use. As it stands, most rostering tools allow an admin user to create a roster based on a consistent location (this may be the entire business or an area of the business like the “Kitchen” at a cafe).

While a business can set different locations, the information associated to the location does not allow for changes or updates and lacks the functionality to create a significant number of “locations”. In addition, these systems do not allow a location to be created with associated document uploads, notes, or specific information and because of this lacking functionality they do not meet the needs of Shared Affair who are looking for a solution that allows them to plan and schedule out hundreds of events and rosters and share the information with it’s employees.

## Functionality and Features

### Account Authentication

- Secure account creation
- Authentication through third party API
- Simple log in/out (saving secure account data)
- Admin and standard user permissions
- Password and account recovery

### Event record creation

Create a record for an event that logs and tracks time, location details and rostered employees. 

### Event record interaction (non-admin users)

Users can interact with all created events including relevant details and information.  

- Users can schedule themselves to work an event

**Design amendment** - It was decided that users should only be able to view the shifts that they were allocated. This functionality change aimed to create a fairer environment, in which employees would be granted equal hours across events. 

### Event record interaction (Admin users)

- Admin users can update event details and information
- Admin users can delete an event
- Admin users can update an event roster
- Admin users can delete shifts and rosters

### UI

- Users (admin and standard) can interact with a navigation bar and page links
- Users are notified when an action is completed on event records (pop up confirmations)
- Users can view future scheduled events
- Users can view their scheduled events

## Target Audience

Given this app is being created to solve a specific problem within a Sydney based events and catering business called Shared Affair, the target audience are the managers and employees within the business.

Specific target audience personas are portrayed in the app by implementing features for the different job roles and responsibilities of users including features and functionality for managers (admins in the system) or general employees (users in the system). These two groups of users make up the target audience and are being considered throughout the planning and build process.

## Tech Stack

#### React.js

React.js will be used to build the user interface. While React.js is a requirement of this assignment, we’re also choosing to use this JavaScript library because of its simple component based infrastructure and available methods to easily manage UI state, rendering and re-rendering.

#### Rails

We have chosen to use Rails for the backend CRUD operations and routes as it uses the MVC architecture allowing for a straight forward implementation and integration of the back end as well as it’s simple integration to React through either web packer and the react-rails gem, or using the Rails API.

#### Postgresql

Postgresql will be used for the database as it is a powerful, open source object-relational database system with a strong reputation and has been used by all team members in previous projects.

#### Material UI

MUI started back in 2014, to unify React and Material Design and offers a complete styling library for react.

## Architecture Diagram

![app-architecture-diagram](./docs/app-architecture-diagram.png)

## Dataflow Diagram

### Standard User DFD

![standard-user-DFD](./docs/standard-user-DFD.png)

### Admin User DFD - Create and Read Features

![admin-user-create-read-features](./docs/admin-create-read-DFD.png)

### Admin User DFD - Search and Update Features

![admin-user-search-update-features](./docs/admin-search-update-DFD.png)

## User Stories

#### As an admin user I want to be able to create a record for an upcoming event so that I can track relevant information

-  As an admin user I want to be able to schedule an event so that I can track relevant event information and schedule employees to work
-  As an admin user I want to have the option to update an event so that changes can be made to the event information
-  As an admin user I want to be able to delete an event so that everyone is aware if an event is cancelled
-  As an admin user I want to assign employees to work an event so that I can proactively fill shifts with available employees
-  As an admin user I want to be able to update a roster so that I can make changes if circumstances change and someone can no longer work an event
-  As an admin user I want to receive a confirmation every time a change is made to an event or roster

#### As a user I want a secure way to sign up for the app so I can access all app features and return to my saved information

-  As a user I want a secure way to create an account so that I can access all of the features in the app
-  As a user I want to log in and out of the app so that I can save my secure information
-  As a user I want to be able to sign up as a standard user or an admin user

#### As a user I want to create a personal profile so that I can see my rostered events

-  As a user I want to create a profile page with a profile picture so that others can see who they are working with at the event
-  As a user I want to add personal contact information so that others in the business can contact me

***Bonus features after MVP: -**
-  As a user I want to add my job role to my personal profile so that others can see my job role
-  As a user I want to be able to update information so that I can keep information updated if it changes
-  As a user I want to be able to update my profile picture so that it stays current

#### As a user I want to see created events so that I can view event related information

-  As a user I want to see when an event is scheduled including the name, location, date and time and contact information for client.
-  As a user I want to see how many job roles are listed at the event

***Bonus features after MVP: -**
- As a user I want to be able to view what job roles are needed for the event so that I can roster myself to work

#### As a user I want to be able to register for an event so that I can work

-  As a user I want to view all of the events I am registered to work
-  As a user I want to see others that are working the event so that I can see who I am working with
-  As a user I want to see the event details so that I can make an informed decision about working the event


***Bonus features after MVP: -**

-  As a user I want to be able to register my self for a shift so that I can work at an event
-  As a user I want to get a confirmation that I am signed up to an event so that I can be sure the request went through


#### As a user I want to view my work schedule so that I can see what events I am working

-  As a user I want to be able to view the upcoming events I am rostered/scheduled to work so that I never miss a work day
-  As a user I want to see event information so that I know where and when the event is scheduled
-  As a user I want to see who is working at an event so that I can work with people I know

***Bonus features after MVP: -**

-  As a user I want to see what jobs are available at an event so that I can know if there's a position vacant for a job role that suits me

#### As a user I want the website to be easy to navigate so that I'm not confused with any processes

-  As a user I want to interact with easy to use links so that I can easily navigate the website
-  As a user I want a website that is visually appealing so that I'm motivated to return and use it again
-  As a user I want process confirmations so that I know when something has been selected or completed

# Wireframes

## User Registration Desktop, Tablet & Mobile

![user-registration-wireframes](./docs/user-registration-wireframes.png)

**Note:** - the first user created for the application is the default administration user and will have administrative permissions. All other users after are defaulted to standard users. 

## Standard User Mobile Wireframes

![standard-user-mobile-wireframes](./docs/standard-mobile-wireframes.png)

## Standard User Tablet Wireframes

![standard-user-tablet-wireframes](./docs/standard-tablet-wireframes.png)

## Standard User Desktop Wireframes

![standard-user-desktop-wireframes](./docs/standard-desktop-wireframes.png)

## Admin User Mobile Wireframes: Read & Delete Events

![admin-mobile-wireframes-part1](./docs/admin-mobile-wireframes-part1.png)

## Admin User Mobile Wireframes: Create & Update Events Rosters

![admin-mobile-wireframes-part2](./docs/admin-mobile-wireframes-part2.png)

## Admin User Mobile Wireframes: Delete Individual Shifts

![admin-mobile-wireframes-part3](./docs/admin-mobile-wireframes-part3.png)

## Admin User Tablet Wireframes: Read & Delete Events

![admin-tablet-wireframes-part1](./docs/admin-tablet-wireframes-part1.png)

## Admin User Tablet Wireframes: Create & Update Events Rosters

![admin-tablet-wireframes-part2](./docs/admin-tablet-wireframes-part2.png)

## Admin User Tablet Wireframes: Delete Individual Shifts

![admin-tablet-wireframes-part3](./docs/admin-tablet-wireframes-part3.png)

## Admin User Desktop Wireframes: Read & Delete Events

![admin-desktop-wireframes-part3](./docs/admin-desktop-wireframes-part1.png)

## Admin User Desktop Wireframes: Create & Update Events Rosters

![admin-desktop-wireframes-part2](./docs/admin-desktop-wireframes-part2.png)

## Admin User Desktop Wireframes: Delete Individual Shifts

![admin-desktop-wireframes-part3](./docs/admin-desktop-wireframes-part3.png)



# Part B Documentation

## Project Management

Throughout the duration of the project, MVP was achieved through breaking the application down to the four main features of User authentication, Event Planning, Roster Integration, and an accessible event schedule interface. 

In the preliminary stage of the project, our team focused on the core crud functionality of an administrative user. At the beginning of the week, the team would discuss what needed to be achieved by the end of the week. Tasks were delegated based upon each team member's interests and experience and each task was listed within our team's Trello board. Within the Trello board, each task card was assigned labels dependent on whether they were on docuemntation, backend api development and frontend client development. Additionally, labels were assigned on priority, task size, and whether they were currently assigned to a team member and checklists were assigned to task cards that required several days to complete. Furthermore, a Discord server was created, giving each team member the opportunity to bring attention to any areas that required additional help. 

### Link to Trello Board

[Trello Board](https://trello.com/b/jMPLIWRs/full-stack-app)


## Testing 

### Manual User Testing Development

### User Feature

![Development-Testing-Authentication](./docs/Development-Testing-Authentication.png)

Link to demo of user authentication testing [here](https://streamable.com/rkteex)


### Event Feature

Create Event:
![Development-Testing-Create-Event](./docs/Development-Testing-Create-Event.png)

Read Event: 
![Development-Testing-Read-Event](./docs/Development-Testing-Read-Event.png)

Edit Event: 
![Development-Testing-Edit-Event](./docs/Development-Testing-Edit-Event.png)

Delete Event:
![Development-Testing-Delete-Event](./docs/Development-Testing-Delete-Event.png)

Link to demo of Event testing [here](https://streamable.com/3936yk) 

### Roster Feature

Create Roster:
![Development-Testing-Create-Roster](./docs/Development-Testing-Create-Roster.png)

Read Roster:
![Development-Testing-Read-Roster](./docs/Development-Testing-Read-Roster.png)

Edit Roster:
![Development-Testing-Edit-Roster](./docs/Development-Testing-Edit-Roster.png)

Delete Roster:
![Development-Testing-Delete-Roster](./docs/Development-Testing-Delete-Roster.png)

Link to demo of Roster testing [here](https://streamable.com/i924k5)


### Event Schedule Feature

![Development-Testing-Event-Schedule](./docs/Development-Testing-Event-Schedule.png)

Link to demo of Event Schedule testing [here](https://streamable.com/x3xid8)


### Link to Deployed Application

