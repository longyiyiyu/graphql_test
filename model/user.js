var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'graphql_test'
});

connection.connect();

class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    findById(id) {
        var sql = `select * from user where id=`;

        if (!id) {
            return;
        }

        sql += id;
        connection.query(sql, function(err, rows, fields) {
            if (err) {
                console.dir(err);
                return;
            }

            return new User(rows[0].name, rows[0].age);
        });
    }

    getName() {
        return this.name;
    }

    getAge() {
        return this.age;
    }

    getRaw() {
        return {
            name: this.name,
            age: this.age
        };
    }

    destroy() {
        connection.end();
    }
}

export default User;
