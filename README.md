# Calendar

Calendar is a web application, where you can create, delete, view and update calendar events. 

### Events
Events have title, date and type associated to them. 
Types are predefined and each type has a different color to it. Events are displayed with the type color and name on the calendar.
By clicking on an event a modal will be opened, where you can update or delete the event.

## Running the program

**Before you start make sure you have Node.js installed**

1. Start backend server by navigating to /api directory and running following commands

- `npm install`
- `npm run json-server`

2. Start frontend server by navigating to /ui directory and running following commands:

- `npm install`
- `npm start`

If the commands ran haven't opened the app in the browser go to https://localhost:3000

## Images
Main page

![image](https://github.com/ItsKris1/calendar/assets/69897943/cdad46f4-1ca3-4081-9a88-6c9a084b4129)

Example of modal, which is shown when you want to create, delete or change an event.

![image](https://github.com/ItsKris1/calendar/assets/69897943/e94f4f06-bcf4-4a53-98a2-ad22e711c331)


## Technologies

UI

- React
- TypeScript
- Redux
- ReactStrap & Bootstrap 5

Server

- json-server
