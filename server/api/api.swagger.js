/* eslint-disable max-len */

const swagger = {
  getCollections: {
    tags: ['Core API'],
    summary: 'Lista coleções disponíveis',
    description: "Lista todas as coleções cadastradas no banco que não são privadas (precedidas de '_')",
    operationId: 'getCollections',
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
          },
        },
      },
      500: {
        description: 'Erro da api ao conectar com o banco',
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
  listElementsFromCollection: {
    tags: ['Core API'],
    summary: 'Lista elementos de uma coleção',
    description: `
      Lista elementos de uma coleção
      O tamanho de pagina padrão sao de 100 registros
      Para alterar o tamanho da pagina use o queryParâmetro *pageSize=N*, onde os valores de N podem ser de 1 a 1000
      Para escolher a pagina use o queryParâmetro *page=N* onde N e o numero da pagina
      Para projetar use o queryParâmetro *keys={"<parâmetro>":1}* para projetar apenas ou *keys={"<parâmetro>":0}* para excluir apenas
      Para filtrar use o queryParâmetro *filter={"<parâmetro>":"valor
      Para ordenar use o queryParâmetro *sort={"<parâmetro>":1}* para ordenar crescente por parâmetro
    `,
    operationId: 'listElementsFromCollection',
    parameters: [
      {
        in: 'path',
        name: 'collection',
        schema: {
          type: 'string',
        },
        required: 'true',
      },
      {
        in: 'query',
        name: 'page',
        schema: {
          type: 'number',
        },
      },
      {
        in: 'query',
        name: 'pageSize',
        schema: {
          type: 'number',
        },
      },
      {
        in: 'query',
        name: 'keys',
        schema: {
          type: 'string',
        },
      },
      {
        in: 'query',
        name: 'filter',
        schema: {
          type: 'string',
        },
      },
      {
        in: 'query',
        name: 'sort',
        schema: {
          type: 'string',
        },
      },
    ],
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                type: 'object',
              },
            },
          },
        },
      },
      400: {
        description: 'Erro na requisição, algum parâmetro foi informado incorretamente, veja qual na mensagem de erro',
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
        description: 'Erro no servidor, pode ser gerado por algum problema de conexão, tente novamente mais tarde',
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
  getDocument: {
    tags: ['Core API'],
    summary: 'Recupera um documento por id',
    description: 'Recupera documento por id',
    operationId: 'getDocument',
    parameters: [
      {
        in: 'path',
        name: 'collection',
        schema: {
          type: 'string',
        },
        required: 'true',
      },
      {
        in: 'path',
        name: 'documentId',
        schema: {
          type: 'string',
        },
        required: 'true',
      },
    ],
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
      },
      400: {
        description: 'Erro na requisição, algum parâmetro foi informado incorretamente, veja qual na mensagem de erro',
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
        description: 'Erro no servidor, pode ser gerado por algum problema de conexão, tente novamente mais tarde',
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
  insertDocuments: {
    tags: ['Core API'],
    summary: 'Insere documentos em uma coleção',
    description: 'Dependendo do valor recebido array|objeto cadastra vários|um documento na coleção',
    operationId: 'insertDocuments',
    parameters: [
      {
        in: 'path',
        name: 'collection',
        schema: {
          type: 'string',
        },
        required: 'true',
      },
    ],
    requestBody: {
      required: 'true',
      content: {
        'application/json': {
          schema: {
            oneOf: [
              'string',
              'integer',
            ],
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Documento(s) inserido com sucesso',
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
      },
      400: {
        description: 'Erro na requisição, algum parâmetro foi informado incorretamente, veja qual na mensagem de erro',
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
        description: 'Erro no servidor, pode ser gerado por algum problema de conexão, tente novamente mais tarde',
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
  replaceDocument: {
    tags: ['Core API'],
    summary: 'Salva um documento com um id especificado ou sobrescreve caso ja exista',
    description: 'Salva um documento com um id especificado, caso id ja exista sobrescreve o documento anterior',
    operationId: 'replaceDocument',
    parameters: [
      {
        in: 'path',
        name: 'collection',
        schema: {
          type: 'string',
        },
        required: 'true',
      },
      {
        in: 'path',
        name: 'documentId',
        schema: {
          type: 'string',
        },
        required: 'true',
      },
    ],
    requestBody: {
      required: 'true',
      content: {
        'application/json': {
          schema: {
            type: 'object',
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Documento criado/sobrescrito com sucesso',
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
      },
      400: {
        description: 'Erro na requisição, algum parâmetro foi informado incorretamente, veja qual na mensagem de erro',
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
        description: 'Erro no servidor, pode ser gerado por algum problema de conexão, tente novamente mais tarde',
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
  createCollection: {
    tags: ['Core API'],
    summary: 'Cria uma collection na base de dados',
    description: 'Cria uma collection na base de dados, verificar padrão de nomenclatura utilizado para seguir, sugerido undeline_separated',
    operationId: 'createCollection',
    parameters: [
      {
        in: 'path',
        name: 'collection',
        schema: {
          type: 'string',
        },
        required: 'true',
      },
    ],
    responses: {
      200: {
        description: 'Criado com sucesso',
        content: {
          'application/json': {
            schema: {
              type: 'string',
            },
          },
        },
      },
      400: {
        description: 'Erro na requisição, algum parâmetro foi informado incorretamente, veja qual na mensagem de erro',
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
        description: 'Erro no servidor, pode ser gerado por algum problema de conexão, tente novamente mais tarde',
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
  modifyMultiple: {
    tags: ['Core API'],
    summary: 'Altera múltiplos documentos simultaneamente',
    description: 'Altera múltiplos documentos simultaneamente, e obrigatório passar um parâmetro de filtro',
    operationId: 'modifyMultiple',
    parameters: [
      {
        in: 'path',
        name: 'collection',
        schema: {
          type: 'string',
        },
        required: 'true',
      },
      {
        in: 'query',
        name: 'filter',
        schema: {
          type: 'object',
        },
        required: 'true',
      },
    ],
    requestBody: {
      required: 'true',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              idConsulta: {
                type: 'string',
              },
              idRespondente: {
                type: 'string',
              },
              url: {
                type: 'string',
              },
              refreshCode: {
                type: 'boolean',
              },
            },
            required: ['idConsulta', 'idRespondente'],
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                ok: {
                  type: 'boolean',
                },
                emailEnviado: {
                  type: 'boolean',
                },
              },
            },
          },
        },
      },
      400: {
        description: 'Erro na requisição',
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
  modifySingle: {
    tags: ['Core API'],
    summary: 'Modifica um documento a partir do id',
    description: 'Modifica um documento a partir do id',
    operationId: 'modifySingle',
    parameters: [
      {
        in: 'path',
        name: 'collection',
        schema: {
          type: 'string',
        },
        required: 'true',
      },
      {
        in: 'path',
        name: 'documentId',
        schema: {
          type: 'string',
        },
        required: 'true',
      },
    ],
    requestBody: {
      required: 'true',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              idConsulta: {
                type: 'string',
              },
              idRespondente: {
                type: 'string',
              },
              url: {
                type: 'string',
              },
              refreshCode: {
                type: 'boolean',
              },
            },
            required: ['idConsulta', 'idRespondente'],
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                ok: {
                  type: 'boolean',
                },
                emailEnviado: {
                  type: 'boolean',
                },
              },
            },
          },
        },
      },
      400: {
        description: 'Erro na requisição',
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
  deleteDocuments: {
    tags: ['Core API'],
    summary: 'Deleta vários elementos de uma coleção',
    description: 'Deleta vários elementos de uma coleção, passar um parâmetro de filtro e obrigatório',
    operationId: 'deleteDocuments',
    parameters: [
      {
        in: 'path',
        name: 'collection',
        schema: {
          type: 'string',
        },
        required: 'true',
      },
      {
        in: 'query',
        name: 'filter',
        schema: {
          type: 'string',
        },
        required: 'true',
      },
    ],
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
      },
      400: {
        description: 'Erro na requisição, algum parâmetro foi informado incorretamente, veja qual na mensagem de erro',
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
        description: 'Erro no servidor, pode ser gerado por algum problema de conexão, tente novamente mais tarde',
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
  deleteDocument: {
    tags: ['Core API'],
    summary: 'Deleta um documento por id',
    description: 'Deleta um documento por id',
    operationId: 'deleteDocument',
    parameters: [
      {
        in: 'path',
        name: 'collection',
        schema: {
          type: 'string',
        },
        required: 'true',
      },
      {
        in: 'path',
        name: 'documentId',
        schema: {
          type: 'string',
        },
        required: 'true',
      },
    ],
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
      },
      400: {
        description: 'Erro na requisição, algum parâmetro foi informado incorretamente, veja qual na mensagem de erro',
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
        description: 'Erro no servidor, pode ser gerado por algum problema de conexão, tente novamente mais tarde',
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
