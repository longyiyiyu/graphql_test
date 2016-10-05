var fs = require('fs');
var path = require('path');

var mysql = require('mysql');

/* schema */
import {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString
} from 'graphql';

var schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            name: {
                type: GraphQLString,
                resolve() {
                    return 'world';
                }
            }
        }
    })
});

/* schema */

var query = '{ hello }';

graphql(schema, query).then(result => {
    console.log(result);
    // connection.end();
});

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'graphql_test'
});

var sql = `
    CREATE TABLE IF NOT EXISTS \`user\` (
        \`id\` int(255) NOT NULL AUTO_INCREMENT,
        \`name\` varchar(255) CHARACTER SET utf8 NOT NULL,
        \`age\` int(11) NOT NULL DEFAULT -1,
        PRIMARY KEY (\`id\`))`;

connection.connect();
connection.query(sql, function(err, rows, fields) {
    if (err) {
        console.dir(err);
        return;
    }

    console.log('create table succ!');
    connection.end();
});
