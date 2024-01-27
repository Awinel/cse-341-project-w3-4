const  router  = require("express").Router();

router.use("/", (req, res) => {
    res.send("Hello Papa");
});

module.exports = router;