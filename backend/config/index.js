const config = {
  JWT_SECRET: process.env.JWT_SECRET || 'vEry-str0ng-sEcrEt-p@$$w0rd',
  JWT_TTL: process.env.JWT_TTL || '7d'
}

module.exports = config