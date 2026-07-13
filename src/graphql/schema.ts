export const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
    role: String!
  }

  type CoffeeBatch {
    id: ID!
    farmer: User!
    variety: String!
    weight: Float!
    pricePerKg: Float!
    totalPrice: Float!
    status: String!
    createdAt: String!
  }

  type Product {
    id: ID!
    name: String!
    description: String!
    origin: String!
    price: Float!
    stock: Int!
    roastLevel: String!
  }

  type PriceTrend {
    id: ID!
    date: String!
    price: Float!
  }

  type DashboardMetrics {
    totalBatchesBought: Int!
    totalWeightBought: Float!
    totalPaidToFarmers: Float!
    totalProductsInInventory: Int!
    totalProductsStock: Int!
  }

  type Query {
    getCurrentPrice: Float!
    getPriceTrends: [PriceTrend!]!
    getFarmerBatches(farmerId: String!): [CoffeeBatch!]!
    getDashboardMetrics: DashboardMetrics!
    getAllProducts: [Product!]!
  }
`;
