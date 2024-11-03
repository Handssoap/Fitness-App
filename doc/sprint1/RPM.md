Release Planning Meeting Document (RPM.md)
Project Name: Fitness App
Release Version: v1.0 (Initial MVP Release)
1. Meeting Details
Date: October 23, 2023
Time: 10:00 AM - 11:30 AM
Location: Zoom Virtual Meeting
Facilitator: Max Chornenkyy

3. Participants

Name	Attended (Yes/No)

Max Chornenkyy Yes 
Vince Flores	Yes 
Manille Jao Villacorta	Yes 
Subhan Hanif	Yes 
Jiawei Yang	Yes 

Note: All participants attended the meeting and actively contributed to the discussions.

3. Release Goal
Objective: Deliver a Minimum Viable Product (MVP) for user testing, including core functionality for user authentication, exercise search, and basic workout setup.
Expected Outcome: Enable initial user engagement with basic app functionality, gather feedback on user experience, and validate database and API connections in a production-like environment.
Release Goal:

To complete an MVP version of the fitness app, enabling core user interactions such as onboarding, browsing exercises, and creating a workout plan. This release will set up the essential backend services and frontend framework for future iterations.
4. Project Scope (Epics/Key Features)
List the high-level features (epics) that will be covered in this release.

Scope of Work:
Epic 1: User Onboarding and Authentication

Key Features:
User Registration: Allows users to sign up with email and password using Clerk authentication (User Story 001).
User Login: Users can securely log in to their accounts (User Story 002).
Profile Setup: Enables basic profile creation and management (User Story 003).

Epic 2: Exercise Library and API Integration
Key Features:
Exercise Search: Connects to the API to retrieve a variety of exercises based on user-selected muscle groups (User Story 004).
API Integration: Utilizes external API to fetch exercise data and images, providing a dynamic and responsive exercise library (User Story 005).

Epic 3: Workout Creation and Management
Key Features:
Add Exercise to Workout: Users can select exercises and add them to a workout plan (User Story 006).
Remove Exercise from Workout: Users can remove unwanted exercises from their workout plan (User Story 007).
Save Workout: Users can save their workout for future access (User Story 008).
Epic 4: User Interface Enhancements

Key Features:
UI Improvements: Polished frontend components for a consistent and visually appealing interface (User Story 009).
Responsive Layouts: Adjusts layouts to ensure compatibility across device sizes (User Story 010).
Themed Views and Dark Mode: Integrates dark mode and themed components for a user-friendly experience (User Story 011).
5. User Stories for Completion
Specific user stories that are prioritized for completion in this release.

User Story 001: As a new user, I want to register with my email and password using Clerk so that I can create an account.
User Story 002: As a registered user, I want to log in securely with my credentials to access my workout data.
User Story 003: As a user, I want to set up and manage my profile details.
User Story 004: As a user, I want to browse exercises by muscle group to find suitable exercises.
User Story 005: As a user, I want to view exercise details including name, and muscle target.
User Story 006: As a user, I want to add selected exercises to my workout plan.
User Story 007: As a user, I want to remove exercises from my workout plan if I change my mind.
User Story 008: As a user, I want to save my workout plan for future access.
User Story 009: As a user, I want the app to have a visually appealing and easy-to-navigate interface.
User Story 010: As a user, I want the layout to adjust to my screen size.

6. Discussion Highlights
Prioritization: The team agreed to prioritize user onboarding and authentication, as well as the exercise library and workout creation features, to ensure essential functionality is available in the MVP.
Risks & Challenges:
Backend Challenges: There were some concerns about potential delays in backend development, especially around Clerk authentication and API data handling.
Data Load on API: Discussed handling API rate limits effectively to avoid delays in exercise loading.
Next Steps:
Assign tasks based on the prioritized user stories.
Conduct regular check-ins to ensure ongoing alignment on sprint goals.
Focus on testing the setup of the database, Clerk authentication, and API connections to guarantee a smooth user experience.
