const router = require('express').Router()
const Controller = require('../controllers/Controller')
const Auth = require('../middlewares/auth')

router.get("/token", Controller.token)
router.post("/users", Auth.authentication, Controller.create)
router.get("/users", Auth.authentication, Controller.read)
router.get("/users/:id", Auth.authentication, Auth.authorization, Controller.getOne)
router.put("/users/:id", Auth.authentication, Auth.authorization, Controller.update)
router.delete("/users/:id",Auth.authentication, Auth.authorization, Controller.delete)
router.get("/", (req, res) => {
    res.send({
        "status": "server Ok"
    })
})
module.exports = router