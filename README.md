# API Endpoints Documentation

RESTful API for a Dynamic Knowledge Base System

### Notes:
- All endpoints require an `Authorization` header with a valid API key. Valid API keys can be found in `data/users.json` file.
- Run `npx jest` to perfom unit tests.
- The sample `KB.postman_collection.json` postman collection is provided for performing manual tests. API keys are configured.

---

## **GET /api/topics**
- **Description**: Retrieves all topics.
- **Authorization**: 
  - Admin: ✅
  - Viewer: ✅
- **Responses**:
  - `200`: Returns a list of topics.
  - `401`: Missing authorization header.

---

## **GET /topics/:topic-id/:version**
- **Description**: Retrieves a specific version of a topic by ID. _It also searches subtopics recursively_.
- **Authorization**: 
  - Viewer: ✅
- **Responses**:
  - `200`: Returns the topic with the specified version.
  - `404`: Topic or version not found.

---

## **GET /topics/:topic-id**
- **Description**: Retrieves the latest version of a topic by ID.  _It also searches subtopics recursively_.
- **Authorization**: 
  - Viewer: ✅
- **Responses**:
  - `200`: Returns the topic.
  - `404`: Topic not found.

---

## **POST /topics**
- **Description**: Creates a new topic.
- **Authorization**: 
  - Admin: ✅
  - Viewer: ❌
- **Request Body**:
  ```json
  {
    "id": "string",
    "url": "string",
    "description": "string",
    "type": "string",
    "parentTopicId": "string (optional)"
  }
  ```
- **Responses**:
  - `200`: Topic created successfully.
  - `400`: 
    - Invalid topic ID.
    - Parent topic not found.
    - Malformed URL.
    - Invalid topic type.
  - `403`: Viewer is not authorized to create topics.

---

## **GET /distance/:topic1/:topic2**
- **Description**: Calculates the distance between two topics.
- **Authorization**: 
  - Viewer: ✅
- **Responses**:
  - `200`: Returns the distance between the topics.
  - Distance > 0 indicates topics are in the same **optimal** path.


