// path: ./config/plugins.js

module.exports = {
  //
  graphql: {
    config: {
      endpoint: '/graphql',
      shadowCRUD: true,
      playgroundAlways: false,
      depthLimit: 4,
      amountLimit: 200,
      apolloServer: {
        tracing: false,
      },
    },
  },
};
