# Sprint Retrospective Meeting - Sprint 2  

## Date: November 17, 2024  
## Location: Zoom Virtual Meeting  
## Participants:  
| Name                    | Attended |
|-------------------------|----------|  
| Max Chornenkyy          | Yes      |  
| Vince Flores            | Yes      |  
| Manille Jao Villacorta  | Yes      |  
| Subhan Hanif            | Yes      |  
| Jiawei Yang             | Yes      |  

---

### Unfinished Tasks  

#### User Stories and Related Tasks  

**User Story 7**: _As a beginner at the gym, I can follow a workout plan made by others in the app._  
   - Tasks:  
     - GET endpoint returning profile details including health record for a user.  
     - Update account details to the database with an edit profile button.  

**User Story 2**: _As a casual fitness enthusiast, I want to log simple workouts so that I can maintain a regular fitness routine without needing complex details._  
**User Story 19**:_As a gym enthusiast, I want to be able to create and customize my own workout routines and diets so that I can focus on specific areas of my training._  
   - Tasks:  
     - API route to update a workout (including the exercises associated with it).  
     - Implement page for performing activity (includes sets, reps, weight, etc., for each exercise in the workout).  

**User Story 19**: _As a gym enthusiast, I want to be able to create and customize my own workout routines and diets so that I can focus on specific areas of my training._  
   - Tasks:  
     - API routes to create meals.  
     - API routes to get all workouts for a user.  

---

### Completed Tasks  

#### Unexpected Progress on **User Story 18**  

While working on overlapping user stories, we unexpectedly completed **User Story 18**: _As a bodybuilder, I want to track my daily protein intake so that I meet my muscle-building nutrition goals._  

- **Criteria of Satisfaction Completed**:  
  - Users can input how much protein they consume daily.  

This progress was achieved while implementing functionality for meal tracking (Story 12) and food APIs (Story 19). The overlap made it efficient to extend the functionality and address this user story without additional effort.  

---

### Practices to Continue in Next Sprint  

- **Team Collaboration at Key Moments**: Despite challenges, working together toward the end of the sprint allowed us to complete critical tasks.  
- **Incremental Implementation**: Gradual work on user stories helped to manage dependencies effectively.  
- **Prisma Schema and Database Configuration**: Our early focus on database design streamlined later tasks.  

---

### New Practices to Consider for Next Sprint  

- **Start Earlier with Priority Tasks**: Begin work on complex backend tasks earlier in the sprint to avoid time crunches.  
- **Refine Sprint Planning**: Focus on assigning realistic task loads that align with the team's capacity.  
- **Introduce Dependency Resolution Early**: Identify and resolve task dependencies during sprint planning.  

---

### Practices to Stop Using in Next Sprint  

- **Procrastinating Complex Tasks**: Avoid deferring difficult tasks until the sprint's final days.  
- **Skipping Intermediate Milestones**: Use more frequent milestones to track progress effectively and reduce the risk of task rollover.  

---

### Best/Worst Experiences  

- **Best Experience**: Successfully implementing API routes and completing the Prisma database schema. These provided a robust foundation for app functionality.  
- **Worst Experience**: Overestimating capacity during sprint planning, leading to several unfinished tasks and high pressure near the sprint's end.  

---

### Next Steps  

The following unfinished tasks will be carried over to Sprint 3 with a stronger focus on earlier task prioritization and dependency management:  

- Completing GET endpoint for profile details.  
- Implementing workout update features and the activity page.  
- Completing API routes for meals and workouts.  

---

> **Note:** The updated PB.md has been saved in `doc/sprint3` to prepare for the upcoming sprint.  
