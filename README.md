# Beevents Frontend

## Summary

This repo is the frontend code of Beevents, a platform for creating and booking events.

Once a user has signed up to a new account, they can book onto new events and use the Stripe payment interface to make payments.  Users can use the personal dashboard to view, archive, and cancel any bookings they have made, as well as use the calendar view to see what events they have been booked onto.

A staff user can create new events, archive/unarchive events, and cancel any active events they have created.  A staff user can also view their event calendar to see what events are upcoming.

The project showcases the use of modern frontend development techniques and practices, including component-based architecture, state management, and responsive design.

#### Tech stack:

* Next.js (React.js framework) with app router
* TailwindCSS and Shadcn UI components
* Tanstack Query for data calls and state management
* Zod for form validation and handling
* FastAPI (Python library) server hooked to a Supabase postgres instance for the backend database
* Supabase Auth for secure user logins
* Stripe API for secure payment handling

## Live Demo

You can access the live demo of the project [here](https://beevents.vercel.app/).

## Backend Repository

You can find the backend repository [here](https://github.com/swlho/beevents-be).

## Getting Started

To configure this project locally, please follow these steps:

### Prerequisites

* Node.js (minimum version: v20)

### Installation

**1. Clone the repository:**

```
git clone https://github.com/swlho/beevents-fe
```

**2. Install dependencies:**

```
cd beevents-fe
npm install
```

**3. Run the project locally:**

```
npm run dev
```

This will start the local development server, which can be accessed via the terminal. This will show as: <http://localhost>:[port number]

## Using the Beevents app

### As a user

#### Sign up/onboarding

1. Click login at the top of the page, and click 'User login' on the pop-up dialog
2. Create a login using an email and password, and clicking 'Sign up'

> Use a service like <https://internxt.com/temporary-email> to sign up using a temporary email for testing purposes

3. Validate your login by clicking the link within the email sent to the email (check 'Junk' folder if it does not appear in your inbox)

#### Booking an event

4. Browse events on the homepage or the 'All events' page
5. Click on an event and go to the event page
6. Book the event.

* If the event is free:
  * Click 'Book a spot' and 'Confirm'
  * If successful, the user is booked onto the event

* If the event is a paid event:
  * Click 'Book spot and pay' and 'Confirm'
  * Once redirected to the payment screen, enter the required details and click 'Pay'
  * If payment is successful, you will be redirected to the payment success page

> For testing purposes, use any email and cardholder name and country with the following:
>
> Card number: 4242 4242 4242 4242
>
> Expiry date: 12/34
>
> CVC: 123

#### Using the dashboard

7. If logged in, view the user dashboard by clicking 'Dashboard' on the top right of the app page
8. Under the 'My events' tab:

- View upcoming events and cancel made bookings
- View any past events that are available to view (these will be past events that a user has previously made a booking for).  From this tab, a user can archive an event.
- View any user archived events.  A user can also either unarchive or delete an event from the dashboard.

9. Under the 'Calendar' tab, a user can scroll through a monthly view to see when a booked event will be held.
10.  Under the 'Profile' and 'Password' tabs, a user can update their user profile (currently limited to changing user's name).

### As a staff user

#### Login

1. Click login at the top of the page, and click 'Staff login' on the pop-up dialog.  Enter the staff login details.  If successful, the staff user will be redirected to the staff dashboard.

> Use the following staff login for testing:
>
> spandie2@example-company.com
>
> password3

#### Using the dashboard

2. Under the 'My events' tab:

- View upcoming active events and cancel/archive an active event (these will be events that the staff user has personally created).  Cancelling an event will make this event unavailable for booking by users.
- View any past events that are available to view (these will be past events that a staff user has previously created).  From this tab, a staff user can archive an event.
- View any staff archived events.  A staff user can also either unarchive or delete an event from the dashboard (future events cannot be unarchived, however).

3. Under the 'Calendar' tab, a staff user can scroll through a monthly view to see when a created event will be held.
4.  (NOT IMPLEMENTED IN MVP DEMO) Under the 'Profile' and 'Password' tabs, a staff user can update their staff profile.

#### Creating a new event
5. Under 'My events', click 'Create new'
6. Use the form to create a new event (all fields are required).
