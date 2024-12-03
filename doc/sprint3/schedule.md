# Schedule.md

## Sprint 3 Schedule for Latte Fitness

---

### List of Tasks with Dependencies

| **User Story** | **Task Description**                                           | **Dependencies**                         |
|----------------|-----------------------------------------------------------------|------------------------------------------|
| **(15)**       | Develop backend AI API                                          | Spike 1: Research AI API integration     |
| **(15)**       | Integrate AI API with frontend                                  | Develop backend AI API                   |
| **(18)**       | Design and implement frontend calorie generator page           | Spike 2: Investigate UI design principles|
| **(18)**       | Connect calorie generator page to backend services              | Design and implement frontend calorie generator page |
| **(22)**       | Create fetch endpoint in Prisma database for workout class      | None                                     |
| **Additional** | Update documentation                                           | Completion of all user stories and tasks |
| **Additional** | Conduct testing and debugging                                  | Completion of respective tasks           |
| **Spikes**     | Research best practices for integrating AI APIs into web apps   | None                                     |
| **Spikes**     | Investigate UI design principles for calorie generator page     | None                                     |

---

### Network Diagram

```mermaid
graph TD
    S1[Spike 1: Research AI API integration] --> T1[Develop backend AI API]
    T1 --> T2[Integrate AI API with frontend]
    
    S2[Spike 2: Investigate UI design principles] --> T3[Design and implement frontend calorie generator page]
    T3 --> T4[Connect calorie generator page to backend]
    
    T5[Create fetch endpoint in Prisma database] --> T6[Conduct testing and debugging]
    
    T2 --> T6
    T4 --> T6
    T5 --> T6
    
    T1 --> D1[Update documentation]
    T2 --> D1
    T3 --> D1
    T4 --> D1
    T5 --> D1
    T6 --> D1
