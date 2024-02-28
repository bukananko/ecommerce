export type ResponseApi<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type User = {
  id: string;
  username: string;
  picture: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  sold: number;
  stock: number;
  image: string;
  category: Category;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  owner: User;
  comments: Comment[];
};

export type Comment = {
  id: String;
  text: String;
  createdAt: Date;
  productId: String;
  ref: Product;
  userId: String;
  owner: User;
  reply: Reply;
};

export type Reply = {
  id: String;
  text: String;
  createdAt: Date;
  ref: Product;
  userId: String;
  owner: User;
  commentId: string;
};

export type Category = {
  electronics: "Electronics";
  books: "Books";
  clothing: "Clothing";
  shoes: "Shoes";
  accessories: "Accessories";
  furnitures: "Furnitures";
  decoration: "Decoration";
  toys: "Toys";
  foods: "Foods";
  healthcare: "Healthcare";
  jewelry: "Jewelry";
  cosmetics: "Cosmetics";
  random: "Random";
};
