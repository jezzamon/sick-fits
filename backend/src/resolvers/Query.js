const { forwardTo } = require("prisma-binding");

// forwardTo is a prisma-binding helper to just map the call, a timesaver if you dont need to change anything (ie, add authentication checks)
//  items: forwardTo("db") will do ctx.db.query.items()
const Query = {
  items: forwardTo("db"),
  //  async items(parent, args, ctx, info) {
  //   const items = await ctx.db.query.items();
  //   return items;
  item: forwardTo("db")
  // }
};

module.exports = Query;
