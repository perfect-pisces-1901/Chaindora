const createHistory = require("history").createBrowserHistory;
const createMemoryHistory = require("history").createMemoryHistory;

const history =
  process.env.NODE_ENV === "test" ? createMemoryHistory() : createHistory();

export default history;
