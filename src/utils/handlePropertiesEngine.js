const ENGINE_DB = process.env.ENGINE_DB

const getEngineProperties = () => {
  const data = {
    nosql: {
      id: '_id'
    },
    mysql: {
      id: 'id'
    }
  }

  return data[ENGINE_DB]
}

module.exports = { getEngineProperties }
