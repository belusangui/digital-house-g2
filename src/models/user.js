const path = require('path');
const fs = require('fs');

const user = {

    filename: path.join(__dirname, '../databaseJson/users.json'),

    getData: function () {
        return JSON.parse(fs.readFileSync(this.filename, 'utf-8'));
    },

    findAll: function () {
        return this.getData();
    },

    generateId: function () {
        let allUsers = this.findAll();
        let idNuevo=0;
            for (let user of allUsers) {
                if(idNuevo < user.id) {
                    idNuevo = user.id;
                }
            }
           idNuevo++;
           return idNuevo;
    },

    create: function (userToCreate){

            let allUsers = this.findAll();

            allUsers.push(userToCreate);
                
            fs.writeFileSync(this.filename, JSON.stringify(allUsers, null, ' '));

            return true;
    },

    findByPk: function (id) {
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser.id === id)
        return userFound;
    },

    findByField: function (field, string) {
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser[field] === string)
        return userFound;
    },

   

}
module.exports = user;