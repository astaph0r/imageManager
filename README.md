# Image Manager
A Node/Express based Image CRUD Manager which saves the images to MongoDB as Buffer Data Type.

## Setting up local development
- Setup a MongoDB server, either on your localhost or at [MongoDB](https://www.mongodb.com/)
- Backend
  - run ```npm i```
  - create a `.env` file
  - Add the ID and Secret you got from OAuth in the `.env` file
  - ```
    PORT=5000
    DATABASE=<Mongo URL>
    ```
  - run ```node index.js```