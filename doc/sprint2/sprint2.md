Project Name: Latte Fitness

Sprint: Sprint 2
1. Meeting Details

    Date: November 13, 2024
    Time: 9:00 - 11:00 PM
    Location: Discord Channel and Direct Messages
    Facilitator: Vince Flores

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

Objective: The primary goal of Sprint 2 is to separate the frontend and backend parts of the app, enhance the backend infrastructure, integrate Clerk user authentication with app profiles, create pages for managing workouts and meals, and integrate a meals API. We aim to allow users to create workout templates, record meals, and ensure that profiles function as expected. 

Expected Outcome: By the end of this sprint, the app will have separated backend and frontend components, functional user profiles with editable information, a working exercise and meal tracking system, and integrated APIs for fetching exercise and meal data. 

Sprint Goal: We aim to allow users to create workout templates, record meals, and ensure that profiles function as expected. By the end of this sprint, everything should work seamlessly, with the frontend and backend components properly integrated.

4. User Stories for Sprint 2

The following user stories have been prioritized for completion in this sprint:

User Story 2: As a casual fitness enthusiast, I want to log simple workouts so that I can maintain a regular fitness routine without needing complex details.
User Story 7: As a beginner at the gym, I can follow a workout plan made by others in the app.
User Story 12: As a user on a diet, when logging my meal I want to search for my meal and avoid manually typing the nutrition facts.
User Story 19: As a gym enthusiast, I want to be able to create and customize my own workout routines and diets so that I can focus on specific areas of my training.

5. Decisions on User Stories and Spikes

User Authentication: Continue integration of Clerk with user profiles for seamless authentication.

Meals API Integration: Connect the meals API for users to log meals with nutrition details.

Frontend-Backend Separation: Focus on separating the frontend and backend logic for scalability and maintainability.

Workouts and Meal Tracking: Implement new pages for workouts, meal tracking, and performing activities, ensuring the user profile system is functional.

6. Task Breakdown

Each user story has been broken down into specific tasks assigned to team members, with estimated times and responsibilities:

User Story 19: Attach API to Pull List of Foods for Meal

    Task 1: Create a new API route endpoint to fetch a list of exercises from the external API (Subhan Hanif)
    Task 2: Develop a module with a service and controller to interact with the meal API (Max Chornenkyy, Manille Jao Villacorta)
    Task 3: Create Swagger documentation for the new API routes (Vince Flores)

User Story 7: GET Endpoint for Profile Details

    Task 1: Implement a GET endpoint to return profile details, including health records (Subhan Hanif, Max Chornenkyy)
    Task 2: Fetch account details from the database and display them on the profile page (Manille Jao Villacorta, Vince Flores)

User Story 7: Update Account Details to DB with Edit Profile Button

    Task 1: Allow users to update account details with an "Edit Profile" button (Subhan Hanif)

User Story 19, 2, 20: API Route to Update a Workout

    Task 1: Develop API route to update a workout, including exercises associated with the workout (Jiawei Yang, Max Chornenkyy, Subhan Hanif)
    Task 2: Create API routes for meals (Max Chornenkyy, Jiawei Yang)
    Task 3: Create API routes to get all workouts for the user (Subhan Hanif, Max Chornenkyy)

User Story 19: Implement Page for Viewing Template Workouts

    Task 1: Implement a page for viewing workout templates (Max Chornenkyy, Vince Flores)

User Story 12: Implement Page for Meal Tracking

    Task 1: Develop a page for tracking meals and viewing nutritional info (Max Chornenkyy, Jiawei Yang)

User Story 2 & 19: Implement Page for Performing Activity

    Task 1: Implement a page for performing activities, which includes sets, reps, weight, and other exercise details (Jiawei Yang, Subhan Hanif)

User Story 2 & 19: Update Explore Page to Record Default Values for Each Exercise

    Task 1: Update the explore page to record default values for each exercise (Max Chornenkyy, Jiawei Yang)

User Story 2 & 19 & 20: Backend Add Exercises to Workouts

    Task 1: Implement backend logic to add exercises to workouts, including default values for sets, reps, weight, etc. (Max Chornenkyy, Vince Flores)

User Story 2 & 19 & 20: API Routes to Create Workout Template, Create Workout from Template, Get a Workout by ID

    Task 1: Implement API routes for creating workout templates, creating workouts from templates, and fetching workouts by ID (Everyone except Vince Flores)

User Story 7: Tie Login Info to an Account

    Task 1: Implement linking of user login info to the user account (Vince Flores)

User Story 7: Create Initial Account Details to Save to DB During Registration

    Task 1: Create initial account details to save to the database during user registration (Vince Flores)

Backend Work:

    Task 1: Update prisma.schema to track meals, store workout templates, update schema for activity, and recording meals (Everyone)
    Task 2: Update prisma.schema to include default values for sets, reps, weight, etc., for exercises (Everyone)


7. Spikes for Sprint 2

Spike 1: Research Clerk integration for updating user information
Spike 2: Investigate best practices for API rate limiting and caching for meal and exercise data 

8. Summary of Sprint Planning Decisions

The team decided to prioritize backend API work, frontend pages for workouts, and meal tracking for Sprint 2 to provide essential functionality for logging workouts and meals, as well as user profile management. This will allow users to track their fitness progress effectively. We also identified necessary tasks for updating the Prisma schema to store workout templates, meals, and activity data. Two spikes were identified for secure authentication and API performance improvements.

9. Next Steps

Team members will begin working on assigned tasks and participate in daily stand-ups to track progress, address blockers, and ensure alignment.

Tasks will be prioritized based on dependencies, starting with user authentication, then moving to workout template creation, meal tracking, and integrating the necessary APIs.

