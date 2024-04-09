const requestBodyparser = require("../utils/body-parser");
const writefile = require("../utils/writefile");
module.exports = async (req, res) => {
  let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
  let id = req.url.split("/")[3];
  const regexV4 = new RegExp(
    /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
  );
  if (!regexV4.test(id)) {
    res.writeHead(400, { "Content-Type": "application/json" })
    res.end(JSON.stringify({ title: "Validation Failed", message: "UUID is not valid" }))
  } else if (regexV4.test(id) && baseUrl === "/api/movies/") {
    try {
      let body = await requestBodyparser(req)
      const index = req.movies.findIndex((movie) => {
        return movie.id === id
      })
      if (index === -1) {
        res.statusCode = 404
        res.write(JSON.stringify({ title: "Not Found", message: "Movie not found" }))
        res.end()
      } else {
        // update movie
        req.movies[index] = { id, ...body }
        writefile(req.movies)
        res.writeHead(200, { "Content-Type": "application/json" })
        res.end(JSON.stringify(req.movies[index])) // to CL
      }
    } catch (err) {
      console.log(err)
      res.writeHead(400, { "Content-Type": "application/json" })
      res.end(JSON.stringify({ title: "Validation Failed", message: "Request body is not valid" }))
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" })
    res.end(JSON.stringify({ title: "Not Found", message: "Route not found" }))
  }
};