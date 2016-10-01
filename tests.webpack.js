const context = require.context('./src/', true, /.spec\.jsx?$/)
context.keys().map(context)
