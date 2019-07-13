const { forwardTo } = require("prisma-binding");

// forwardTo is a prisma-binding helper to just map the call, a timesaver if you dont need to change anything (ie, add authentication checks)
//  items: forwardTo("db") will do ctx.db.query.items()
const Query = {
  items: forwardTo("db"),
  //  async items(parent, args, ctx, info) {
  //   const items = await ctx.db.query.items();
  //   return items;
  item: forwardTo("db"),
  itemsConnection: forwardTo("db"),

  me(parent, args, ctx, info) {
  // check if there is a current user ID
    if(!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user({
      where: { id: ctx.request.userId },
    }, info)
  }
  // }
};

module.exports = Query;
