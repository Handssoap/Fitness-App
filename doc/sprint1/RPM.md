Release Planning Meeting Document (RPM.md)
Project Name: Fitness App
Release Version: v1.0 (Initial MVP Release)

1. Meeting Details

Date: October 23, 2023
Time: 10:00 AM - 11:30 AM
Location: Zoom Virtual Meeting
Facilitator: Max Chornenkyy

2. Participants

| Name                    | Attended |
|-------------------------|----------|
| Max Chornenkyy          | Yes      |
| Vince Flores            | Yes      |
| Manille Jao Villacorta  | Yes      |
| Subhan Hanif            | Yes      |
| Jiawei Yang             | Yes      |

Note: All participants attended the meeting and actively contributed to the discussions.

3. Release Goal

Objective: Deliver a Minimum Viable Product (MVP) for user testing, including core functionality for user authentication, exercise search, and basic workout setup.
Expected Outcome: Enable initial user engagement with basic app functionality, gather feedback on user experience, and validate database and API connections in a production-like environment.

Release Goal: To complete an MVP version of the fitness app, enabling core user interactions such as onboarding, browsing exercises, and creating a workout plan. This release will set up the essential backend services and frontend framework for future iterations.

4. Project Scope (Epics/Key Features)

List the high-level features (epics) that will be covered in this release.

Scope of Work:

Epic 1: User Onboarding and Authentication
Key Features:
User Registration: Allows users to sign up with email and password using Clerk authentication.
User Login: Users can securely log in to their accounts.
Profile Setup: Enables basic profile creation and management (User Story 01).

Epic 2: Exercise Library and API Integration
Key Features:
Exercise Search: Connects to the API to retrieve a variety of exercises based on user-selected muscle groups (User Story 08).
API Integration: Utilizes external API to fetch exercise data and images, providing a dynamic and responsive exercise library (User Story 02).

Epic 3: Workout Creation and Management
Key Features:
Add Exercise to Workout: Users can select exercises and add them to a workout plan.
Remove Exercise from Workout: Users can remove unwanted exercises from their workout plan.
Save Workout: Users can save their workout for future access (User Story 02 & 19).

Epic 4: User Interface Enhancements
Key Features:
UI Improvements: Polished frontend components for a consistent and visually appealing interface.
Responsive Layouts: Adjusts layouts to ensure compatibility across device sizes.

5. User Stories for Completion

Specific user stories that are prioritized for completion in this release.

User Story 09: As a new user, I want to be able to register for an account
User Story 02: As a casual fitness enthusiast, I want to log simple workouts, so that I can maintain a regular fitness routine without needing complex details.
User Story 19: As a gym enthusiast, I want to be able to create and customize my own workout routines and diets so that I can focus on specific areas of my training.

6. Discussion Highlights

Prioritization: The team agreed to prioritize user onboarding and authentication, as well as the exercise library and workout creation features, to ensure essential functionality is available in the MVP.

Risks & Challenges: Making sure everyone was on the same page on the tasks and how its broken down.

Backend Challenges: There were some concerns about potential delays in backend development, especially around Clerk authentication and API data handling.

Data Load on API: Discussed handling API rate limits effectively to avoid delays in exercise loading.

Next Steps:
Assign tasks based on the prioritized user stories.
Conduct regular check-ins to ensure ongoing alignment on sprint goals.
Focus on testing the setup of the database, Clerk authentication, and API connections to guarantee a smooth user experience.
