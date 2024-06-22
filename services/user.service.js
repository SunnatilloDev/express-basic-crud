const { getStorage, ref, uploadBytes } = require("firebase/storage");
const { v4 } = require("uuid");
const userDB = "./user.json";
const fs = require("fs");

class UserService {
    async getUsers() {
        let data = JSON.parse(fs.readFileSync(userDB).toString());
        return data;
    }

    async createUser({ email, name, password, image }) {
        let users = await this.getUsers();
        image = await this.imageUpload(image);
        let newUser = { id: v4(), email, name, password, image };
        users.push(newUser);
        fs.writeFileSync(userDB, JSON.stringify(users));
        return newUser;
    }

    async imageUpload(image) {
        try {
            const storage = getStorage();
            let imageName = v4() + ".jpg";
            const imageBuffer = image.buffer; 
            const imageRef = ref(storage, "images/" + imageName);

            await uploadBytes(imageRef, imageBuffer);

            return imageName;
        } catch (error) {
            return undefined;
        }
    }
    async findOneUser(id) {
        let users = await this.getUsers();
        let user = users.find((item) => item.id == id);
        return user;
    }
    async updateUser(id){

        let updatingUser = { name, email, password, image };
        updatingUser.image = await userService.imageUpload(image);
        let users = await userService.getUsers();
        let userIndex = users.findIndex((item) => item.id == id);
        users[userIndex] = {
            ...users[userIndex],
            ...updatingUser,
        };
        
    }
}

module.exports = new UserService();
