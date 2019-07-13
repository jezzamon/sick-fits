const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Mutations = {
  async createItem(parent, args, ctx, info) {
    // TODO: checked if they are logged in

    const item = await ctx.db.mutation.createItem(
      {
        data: {
          ...args
        }
      },
      info
    );

    return item;
  },
  updateItem(parent, args, ctx, info) {
    // first take a copy of the updates
    const updates = { ...args };
    // remove the ID from the updates
    delete updates.id;
    // run the update method
    return ctx.db.mutation.updateItem(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info // info is what is returned after update
    );
  },
  async deleteItem(parent, args, ctx, info) {
    const where = { id: args.id };
    // find item
    const item = await ctx.db.query.item({ where }, `{ id title}`); // usally pass in "info" (query from frontEnd), this time manually passing query for returned info
    // check if they own item
    // delete it
    return ctx.db.mutation.deleteItem({ where }, info);
  },
  async signup(parent, args, ctx, info) {
    // lowercase
    args.email = args.email.toLowerCase();
    // hash pwd
    const password = await bcrypt.hash(args.password, 10);
    // create user in db
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          // name: args.name,
          // email: args.email,
          // password: args.password
          ...args,
          password, // passing the bcrypt hashed password
          permissions: { set: ["USER"] } // since it's enum , use set prop for initial prop
        }
      },
      info
    );
    // create the JWT token for them
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // we set the jwt as a cooke on the response
    ctx.response.cookie("token", token, {
      httpOnly: true, // ensure you cannot access token via javascript
      maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
    });
    // Finalllly we return user to the browser
    return user;
  }
};

module.exports = Mutations;
