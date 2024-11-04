Project Name: Fitness App

Sprint: Sprint 1

1. Meeting Details

Date: October 25, 2023
Time: 10:00 AM - 11:30 AM
Location: Zoom Virtual Meeting
Facilitator: Max Chornenkyy


2. Participants and Team Capacity

List of all team members and indication of their attendance.

| Name                    | Attended |
|-------------------------|----------|
| Max Chornenkyy          | Yes      |
| Vince Flores            | Yes      |
| Manille Jao Villacorta  | Yes      |
| Subhan Hanif            | Yes      |
| Jiawei Yang             | Yes      |

Note: All participants attended and actively contributed to the meeting.

3. Sprint Goal

Objective: The primary goal of Sprint 1 is to establish the foundation of the fitness app by setting up backend infrastructure, implementing user authentication with Clerk, developing initial frontend layouts, and integrating the exercise API.

Expected Outcome: By the end of this sprint, the team will have a functioning backend, user registration and login via Clerk, initial frontend layouts, and API connectivity to fetch exercises based on muscle groups.

Sprint Goal:
To build the backend infrastructure, enable user authentication, design basic frontend layouts, and connect to the external exercise API for foundational functionality.

4. User Stories for Sprint 1

The following user stories have been prioritized for completion in this sprint to meet the MVP requirements:

User Story 09: As a new user, I want to be able to register for an account
User Story 02: As a casual fitness enthusiast, I want to log simple workouts, so that I can maintain a regular fitness routine without needing complex details.
User Story 19: As a gym enthusiast, I want to be able to create and customize my own workout routines and diets so that I can focus on specific areas of my training.

5. Decisions on User Stories and Spikes

User Authentication: The team will use Clerk for user registration and login to simplify authentication and enhance security.

Exercise API: The app will connect to an external API for exercise data, initially focusing on filtering exercises by muscle group.

Frontend Design: Basic layouts will be designed using a Tailwind CSS-inspired approach for a clean, responsive look.

Spikes Identified:
Spike 1: Research best practices for integrating Clerk authentication securely.
Spike 2: Investigate API rate limiting to ensure exercise data loads efficiently.

6. Task Breakdown

Each user story has been broken down into specific tasks assigned to team members, with estimated times and responsibilities.

* User Story 09: User Registration with Clerk Authentication
Task 1: Configure Clerk in the app (Vince Flores)
Task 2: Create registration screen UI and form validation (Max Chornenkyy)
Task 3: Integrate registration form with Clerk API and handle errors (Vince Flores) 
* User Story 09: User Login with Clerk Authentication
Task 1: Set up login screen UI (Vince Flores)
Task 2: Implement Clerk login integration and session management (Vince Flores)
Task 3: Add error handling and navigate upon success (Vince Flores)
User Story 09: Profile Setup and Management
Task 1: Create profile setup screen UI (Manille Jao Villacorta)
Task 2: Allow users to update and save profile information (Subhan Hanif)
* User Story 02/19: Exercise Library - Browse by Muscle Group
Task 1: Set up API connection to retrieve exercise data (Max Chornenkyy) 
Task 2: Map and display exercise data with default images if none available (Subhan Hanif)
Task 3: Design dropdown for muscle group selection (Max Chornenkyy)
Task 4: Implement loading indicators and error handling (Jiawei Yang)
* Basic Frontend Layout and UI Enhancements
Task 1: Set up initial layout structure with Tailwind-inspired classes (Jiawei Yang)
Task 2: Add headers, navigation components, and buttons (Manille Jao Villacorta)
Task 3: Test UI elements on various devices and orientations (Jiawei Yang)
* Responsive Layout for Various Screen Sizes
Task 1: Adjust layout for both mobile and tablet views (Manille Jao Villacorta)
Task 2: Implement responsive styles for multiple screen sizes (Manille Jao Villacorta)
Task 3: Test responsiveness across different devices (Jiawei Yang) 

7. Spikes for Sprint 1

Spike 1: Research Clerk API integration best practices and security implications to ensure secure user authentication (Vince Flores) - 3 hrs
Spike 2: Investigate API rate limiting and caching strategies to improve performance when loading exercise data (Subhan Hanif) - 3 hrs

8. Summary of Sprint Planning Decisions

The team agreed to prioritize user authentication, profile management, and the exercise library for this sprint to provide essential functionality in the MVP.
Initial frontend layouts will be created with a focus on responsive design and dark mode support to enhance user experience.
Two spikes were identified to address potential technical challenges with authentication and API rate limiting.

9. Next Steps

Team members will begin working on assigned tasks and participate in daily stand-ups to track progress, address blockers, and ensure alignment.
