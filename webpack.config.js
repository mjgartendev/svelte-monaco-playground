const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MonacoEditorPlugin = require('monaco-editor-webpack-plugin');
const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

module.exports = {
	mode: 'development',
	entry: {
		app: './src/main.js',
		monaco: './src/index.js'
	},
	resolve: {
		extensions: ['.mjs', '.js', '.svelte']
	},
	output: {
		globalObject: 'self',
		filename: '[name].bundle.js',
		chunkFilename: '[name].[id].js',
		path: __dirname + '/public',
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					prod ? MiniCssExtractPlugin.loader : 'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.svelte$/,
				exclude: /node_modules/,
				use: {
					loader: 'svelte-loader',
					options: {
						emitCss: true,
						hotReload: true
					}
				}
			},
		]
	},
	mode,
	plugins: [
		new MonacoEditorPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name].css'
		})
	],
	devtool: prod ? false: 'source-map'
};
