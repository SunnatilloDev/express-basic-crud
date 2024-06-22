const { default: axios } = require("axios");
const userService = require("../services/user.service");

class UserController {
    async getUsers(req, res) {
        let users = await userService.getUsers();
        res.status(200).send(users);
    }
    async postUsers(req, res) {
        let { email, name, password } = req.body;

        let user = await userService.createUser({
            email,
            name,
            password,
            image: req.file,
        });
        res.status(201).send({ message: "Created", user });
    }
    async getOneUser(req, res) {
        let { id } = req.params;
        let user = await userService.findOneUser(id);
        if (!user) {
            return res.status(404).send({
                message: "Not found",
            });
        }
        res.status(200).send(user);
    }
    async getUserImage(req, res) {
        let { link } = req.params;
        try {
            let imageLink =
                "https://firebasestorage.googleapis.com/v0/b/crudexpress-1019a.appspot.com/o/images%2F" +
                link;
            const tokenResponse = await axios.get(imageLink);
            const downloadToken = tokenResponse.data.downloadTokens;

            imageLink += "?alt=media&token=" + downloadToken;
            const imageResponse = await axios({
                url: imageLink,
                responseType: "stream",
            });

            imageResponse.data.pipe(res);
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Error fetching the image");
        }
    }
    async updateUser(req, res) {
        let { id } = req.params;
        
        res.status(200).send(users[userIndex]);
    }
}

module.exports = new UserController();
