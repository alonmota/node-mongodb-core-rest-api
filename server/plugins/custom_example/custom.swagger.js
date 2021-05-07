/* eslint-disable max-len */

const swagger = {
  getGreeting: {
    tags: ['custom'],
    summary: 'Say hello to someone',
    description: `
      Return a string greeting a person by name
    `,
    operationId: 'getGreeting',
    parameters: [
      {
        in: 'query',
        name: 'name',
        schema: {
          type: 'string',
        },
      },
    ],
    responses: {
      200: {
        description: 'Sucess',
        content: {
          'application/json': {
            schema: {
              type: 'string',
            },
          },
        },
      },
      400: {
        description: 'Request error',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
      500: {
        description: 'Server error',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  },
};

module.exports = swagger;
