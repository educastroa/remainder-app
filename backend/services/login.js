const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-2",
});
const util = require("../utils/util");

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const remainderTable = "reminderapp";

async function getReminder() {
  const params = {
    TableName: remainderTable,
    Key: {
      username: 'eduardo',
      SK: 'users'
    },
  };

  const results = await dynamoDb
    .get(params)
    .promise()
    .then(
      (response) => {
        return response.Item;
      },
      (error) => {
        console.error("There is an error getting user: ", error);
      }
    );
    return util.buildResponse(200, JSON.stringify(results));
}


module.exports.getReminder = getReminder;
