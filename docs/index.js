
import authPaths from "./auth.swagger.js";
import hallPaths from "./hall.swagger.js";
import trackPaths from "./track.swagger.js";
import facultyPaths from "./faculty.swagger.js";
import sessionPaths from "./session.swagger.js";
import topicPaths from "./topic.swagger.js";
import publicPaths from "./public.swagger.js";

const paths = {
  ...authPaths,
  ...hallPaths,
  ...trackPaths,
  ...facultyPaths,
  ...sessionPaths,
  ...topicPaths,
  ...publicPaths,
};

export default paths;
