import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
       type: String,
       required: false
    },
    email: {
       type: String,
       required: false
    },
    cart: {
       type: Schema.Types.Mixed,
       required: false
   },
   purchases: {
      type: [Schema.Types.Mixed],
      required: false
   }
}, {
    timestamps: true
});

const shoesSchema = new Schema({
   name: {
      type: String,
      required: true
   },
   category: {
      type: String,
      required: true
   },
   description: {
      type: String,
      required: true
   },
   rating: {
      type: Number,
      required: false
   },
  size: {
      type: Number,
      required: true
   },
   price: {
      type: Number,
      required: true
   },
   currency: {
      type: String,
      required: true
   },
}, {
   timestamps: true
});

const pantsSchema = new Schema({
   name: {
      type: String,
      required: true
   },
   category: {
      type: String,
      required: true
   },
   description: {
      type: String,
      required: true
   },
   rating: {
      type: Number,
      required: true
  },
  size: {
      type: String,
      required: true
   },
   price: {
      type: Number,
      required: true
   },
   currency: {
      type: String,
      required: true
   },
}, {
   timestamps: true
});

const sweatshirtSchema = new Schema({
   name: {
      type: String,
      required: true
   },
   category: {
      type: String,
      required: true
   },
   description: {
      type: String,
      required: true
   },
   rating: {
      type: Number,
      required: true
  },
  size: {
      type: Number,
      required: true
   },
   price: {
      type: Number,
      required: true
   },
   currency: {
      type: String,
      required: true
   },
}, {
   timestamps: true
});

const cartSchema = new Schema({
   owner: {
      type: Schema.Types.Mixed,
      required: true
   },
   items: {
      type: [Schema.Types.Mixed],
      required: true
  }
}, {
   timestamps: true
});

const purchaseSchema = new Schema({
   status: {
      type: String,
      required: true
   },
   user: {
      type: Schema.Types.Mixed,
      required: true
  },
   items: {
      type: [Schema.Types.Mixed],
      required: true
   },
}, {
   timestamps: true
});

const User = mongoose.model('User', userSchema);
const Shoes = mongoose.model('Shoes', shoesSchema);
const Pants = mongoose.model('Pant', pantsSchema);
const Sweatshirt = mongoose.model('Sweatshirt', sweatshirtSchema);
const Cart = mongoose.model('Cart', cartSchema);
const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = { 
   User, userSchema,
   Shoes, shoesSchema,
   Pants, pantsSchema,
   Sweatshirt, sweatshirtSchema,
   Cart, cartSchema,
   Purchase, purchaseSchema,
};