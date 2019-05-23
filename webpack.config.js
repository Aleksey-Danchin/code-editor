const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
const path = require('path')

module.exports = {
	entry: {
		app: './src/index.js'
	},
	output: {
		filename: '[name].js',
		path: path.join(__dirname, '/dist/'),
		publicPath: '/dist/'
	},
	module: {
		rules: [
			{
				test: /.js$/,
				loader: 'babel-loader',
				options: {
					plugins: ["@babel/plugin-syntax-dynamic-import"]
				}
			},
			{
				test: /\.css$/,
				use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
			}
		]
	},
	devServer: {
		overlay: true
	},
	plugins: [
		new MonacoWebpackPlugin()
	]
}
