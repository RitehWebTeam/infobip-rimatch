/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use("rimatch");

const getUnfinishedMatches = (userId) => {
  const stringUserId = userId.toHexString();
  return db.matches
    .find({
      $or: [{ secondUserId: stringUserId }, { firstUserId: stringUserId }],
      finished: false,
    })
    .toArray();
};

const acceptUserMatches = (userEmail) => {
  const user = db.users.findOne({ email: userEmail });
  const userId = user?._id;
  if (!userId) {
    return console.warn(`User with email '${userEmail}' does not exist`);
  }
  const stringUserId = userId.toHexString();

  const matches = getUnfinishedMatches(userId);
  if (!matches?.length) {
    return console.warn(`'${userEmail}' does not have any unfinished matches`);
  }
  const matchedUserIds = [];
  for (const match of matches) {
    const otherUserId =
      match.firstUserId === stringUserId ? match.secondUserId : match.firstUserIde;
    matchedUserIds.push(new ObjectId(otherUserId));
  }

  const userResult = db.users.updateMany(
    { _id: { $in: matchedUserIds } },
    {
      $push: { seenUserIds: stringUserId },
    }
  );

  const matchesResult = db.matches.updateMany(
    { _id: { $in: matches.map((m) => m._id) } },
    {
      $set: {
        finished: true,
        accepted: true,
      },
    }
  );

  console.log("User update result:", userResult, "Matches update result:", matchesResult);
};

acceptUserMatches("user@mail.com");
