const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "Clinical API",
        description: "Clinical API to be used to organize data and keep track of all the patiente information"
    },
    host:"localhost:3000",
    schemes: ["http", "https"]
};

const outputfile = "./swagger.json";
const endpointfiles = ["./routes/index.js"];

swaggerAutogen(outputfile, endpointfiles, doc);