const { gql } = require('apollo-server-express');
const User = require('./models/index').User;
const Cart = require('./models/index').Cart;
const Purchase = require('./models/index').Purchase;
const Shoes = require('./models/index').Shoes;
const Pants = require('./models/index').Pants;
const Sweatshirt = require('./models/index').Sweatshirt;

const typeDefs = gql`

  enum Categories {
    HAT
    TOP
    PANTS
    SHOES
  }

  enum PurchaseStatus {
    PENDING
    COMPLETED
    FAILED
  }

  interface Product {
    id: ID
    name: String!
    category: Categories!
    description: String!
    rating: Float!
  }
  
  input CartInput {
    id: ID!
    items: [ID]
  }

  input ProductInput {
    name: String!
    category: Categories!
    description: String!
    rating: Float!
    size: String!
    price: Int!
    currency: String!
  }

  type Sweatshirt implements Product {
    id: ID!
    name: String!
    category: Categories!
    description: String!
    rating: Float!
    size: String!
    price: Int!
    currency: String!
  }

  type Pants implements Product {
    id: ID!
    name: String!
    category: Categories!
    description: String!
    rating: Float!
    size: Int!
    price: Int!
    currency: String!
  }

  type Shoes implements Product {
    id: ID!
    name: String!
    category: Categories!
    description: String!
    rating: Float!
    size: Int!
    price: Int!
    currency: String!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    cart: Cart
    purchases: [Purchase]
  }

  type Cart {
    id: ID!
    owner: User!
    items: [Product]!
  }

  type Purchase {
    id: ID!
    status: PurchaseStatus!
    user: User!
    items: [Product]
  }

  type Query {
    getUsers: [User]
    getUser(id: ID!): User
      
    getAllShoes: [Shoes]
    getShoes(id: ID!): Shoes

    getAllPants: [Pants]
    getPants(id: ID!): Pants

    getSweatshirts: [Sweatshirt]
    getSweatshirt(id: ID!): Sweatshirt

    getCarts: [Cart]
    getCart(id: ID!): Cart

    getPurchases(name: String, from: Int, to: Int): [Purchase]
    getPurchase(id: ID!): Purchase
  }

  type Mutation {
    addUser(name: String!, email: String!): User
    updateUser(id: ID!, name: String!, email: String!): User
    deleteUser(id: ID!): User

    addShoes(data: ProductInput!): Shoes
    updateShoes(data: ProductInput!): Shoes
    deleteShoes(id: ID!): Shoes

    addPants(data: ProductInput!): Pants
    updatePants(data: ProductInput!): Pants
    deletePants(id: ID!): Pants

    addSweatshirt(data: ProductInput!): Sweatshirt
    updateSweatshirt(data: ProductInput!): Sweatshirt
    deleteSweatshirt(id: ID!): Sweatshirt

    createCart(userId: ID!): Cart
    updateCart(data: CartInput!): Cart

    makePurchase(data: CartInput!): Purchase
  }
`;

const resolvers = {
  Product: {
    __resolveType: (product: any, context: any, info: any) => {
        if(product.shoes){
          return 'Shoes';
        }
        else if(product.pants){
          return 'Pants';
        }
        else if(product.sweatshirt){
          return 'Sweatshirt';
        }
        return null; // GraphQLError is thrown
      }
    },
    Query: {
      getUsers: (parent: any, args: any) => {
        return User.find({});
      },
      getUser: (parent: any, args: any) => {
        return User.findById(args.id);
      },
      getAllShoes: (parent: any, args: any) => {
        return Shoes.find({});
      },
      getShoes: (parent: any, args: any) => {
        return Shoes.findById(args.id);
      },
      getAllPants: (parent: any, args: any) => {
        return Pants.find({});
      },
      getPants: (parent: any, args: any) => {
        return Pants.findById(args.id);
      },
      getSweatshirts: (parent: any, args: any) => {
        return Sweatshirt.find({});
      },
      getSweatshirt: (parent: any, args: any) => {
        return Sweatshirt.findById(args.id);
      },
      getCarts: (parent: any, args: any) => {
        return Cart.find({});
      },
      getCart: (parent: any, args: any) => {
        return Cart.findById(args.id);
      },
      getPurchases: (parent: any, args: any) => {
        console.log(args)
       if (args === {}) return Purchase.find({})
        return Purchase.find({
          items: {
            name: args.name,
          },
          createdAt: {$gt: args.from, $lte: args.to}
        })
      },
      getPurchase: (parent: any, args: any) => {
        return Purchase.findById(args.id);
      }
    },
    Mutation: {
      addUser: (parent: any, args: any) => {
        let newUser = new User({
          name: args.name,
          email: args.email,
        });
        return newUser.save();
      },
      updateUser: (parent: any, args: any) => {
        if (!args.id) return;
          return User.findOneAndUpdate(
           {
             _id: args.id
           },
           {
             $set: {
               name: args.name,
               email: args.email,
             }
           }, {new: true}, (err: any, User: any) => {
             if (err) {
               console.log('Something went wrong when updating the user');
             } else {
             }
           }
        );
      },
      deleteUser: (parent: any, args: any) => {
        if (!args.id) return;
        return User.findOneAndDelete(args.id);
      },

      addShoes: (parent: any, args: any) => {
        let newShoes = new Shoes({
          name: args.name,
          category: args.category,
          description: args.description,
          rating: args.rating,
          size: args.size,
        });
        return newShoes.save();
      },
      updateShoes: (parent: any, args: any) => {
        if (!args.id) return;
          return Shoes.findOneAndUpdate(
           {
             _id: args.id
           },
           {
             $set: {
              name: args.name,
              category: args.category,
              description: args.description,
              rating: args.rating,
              size: args.size,
             }
           }, {new: true}, (err: any, Shoes: any) => {
             if (err) {
               console.log('Something went wrong when updating the shoes');
             } else {
             }
           }
        );
      },
      deleteShoes: (parent: any, args: any) => {
        if (!args.id) return;
        return Shoes.findOneAndDelete(args.id);
      },

      addPants: (parent: any, args: any) => {
        let newPants = new Pants({
          name: args.name,
          category: args.category,
          description: args.description,
          rating: args.rating,
          size: args.size,
        });
        return newPants.save();
      },
      updatePants: (parent: any, args: any) => {
        if (!args.id) return;
          return Pants.findOneAndUpdate(
           {
             _id: args.id
           },
           {
             $set: {
              name: args.name,
              category: args.category,
              description: args.description,
              rating: args.rating,
              size: args.size,
             }
           }, {new: true}, (err: any, Pants: any) => {
             if (err) {
               console.log('Something went wrong when updating the pants');
             } else {
             }
           }
        );
      },
      deletePants: (parent: any, args: any) => {
        if (!args.id) return;
        return Pants.findOneAndDelete(args.id);
      },

      addSweatshirt: (parent: any, args: any) => {
        let newSweatshirt = new Sweatshirt({
          name: args.name,
          category: args.category,
          description: args.description,
          rating: args.rating,
          size: args.size,
        });
        return newSweatshirt.save();
      },
      updateSweatshirt: (parent: any, args: any) => {
        if (!args.id) return;
          return Sweatshirt.findOneAndUpdate(
           {
             _id: args.id
           },
           {
             $set: {
              name: args.name,
              category: args.category,
              description: args.description,
              rating: args.rating,
              size: args.size,
             }
           }, {new: true}, (err: any, Sweatshirt: any) => {
             if (err) {
               console.log('Something went wrong when updating the sweatshirt');
             } else {
             }
           }
        );
      },
      deleteSweatshirt: (parent: any, args: any) => {
        if (!args.id) return;
        return Sweatshirt.findOneAndDelete(args.id);
      },

      createCart: (parent: any, args: any) => {
        let newCart = new Cart({
          owner: args.id,
          items: args.items,
        });
        return newCart.save();
      },
      updateCart: (parent: any, args: any) => {
        if (!args.data.id) return;
          return Cart.findOneAndUpdate(
           {
             _id: args.data.id
           },
           {
             $set: {
              items: args.data.items,
             }
           }, {new: true}, (err: any, Cart: any) => {
             if (err) {
               console.log('Something went wrong when updating the cart');
             } else {
             }
           }
        );
      },
      makePurchase: (parent: any, args: any) => {
        // Implement a payment logic
        
        if (true) {
          // Faked completed transaction
          
          let newPurchase = new Purchase({
            owner: args.id,
            items: args.items,
          });
          return newPurchase.save();
        }
      },    
    },
}

module.exports = { typeDefs, resolvers }