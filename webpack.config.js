const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

module.exports = {
	mode: 'development',
	entry: {
		bundle: ['./src/main.js'],
		"editor.worker": 'monaco-editor/esm/vs/editor/editor.worker.js',
		"json.worker": 'monaco-editor/esm/vs/language/json/json.worker',
		"css.worker": 'monaco-editor/esm/vs/language/css/css.worker',
		"html.worker": 'monaco-editor/esm/vs/language/html/html.worker',
		"ts.worker": 'monaco-editor/esm/vs/language/typescript/ts.worker',
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
		new MiniCssExtractPlugin({
			filename: '[name].css'
		})
	],
	devtool: prod ? false: 'source-map'
};
