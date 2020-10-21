export const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://open-trello-api.herokuapp.com"
    : "http://localhost:3001";
