use("rimatch");

const deleteUserMatches = (userEmail) => {
  const user = db.users.findOne({ email: userEmail });
  const userId = user?._id;
  if (!userId) {
    return console.warn(`User with email '${userEmail}' does not exist`);
  }
  const stringUserId = userId.toHexString();
  const removeFromSeen = db.users.updateMany(
    {},
    {
      $pull: { seenUserIds: stringUserId },
    }
  );
  const resetSeenAndBlocked = db.users.updateOne(
    { _id: userId },
    {
      $unset: { seenUserIds: "", blockedUsersIds: "" },
    }
  );
  const matchesDelete = db.matches.deleteMany({
    $or: [{ secondUserId: stringUserId }, { firstUserId: stringUserId }],
  });
  const messagesDelete = db.messages.deleteMany({
    $or: [{ senderId: stringUserId }, { receiverId: stringUserId }],
  });

  console.log(
    "Remove from seen result:",
    removeFromSeen,
    "Reset seen and blocked result:",
    resetSeenAndBlocked,
    "Matches delete result:",
    matchesDelete,
    "Messages delete result:",
    messagesDelete
  );
};

deleteUserMatches("user@mail.com");
