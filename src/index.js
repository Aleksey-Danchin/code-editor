import * as monaco from 'monaco-editor';

const editor = monaco.editor.create(document.getElementById('container'), {
  value:
`class User {
	constructor (name, family) {
		this.name = name
		this.family = family
	}

	sayHello () {
		console.log(\`Greeting! My name is \${this.name} \${this.family}\`)
	}
}

const user = new User('Aleksey', 'Danchin')
user.sayHello()

for (let i = 0; i < 10; i++) {
	let str = ''

	for (let j = 0; j < 10; j++) {
		str += i * j + ' '
	}

	console.log(str, ' < row')
}`,
  language: 'javascript',
  theme: 'vs'
});

document.querySelector('button').addEventListener('click', event => {
	const value = editor.getValue()
	const emptyContext = Object.create(null)
	const consoleElement = document.querySelector('#console')
	consoleElement.innerHTML = ''

	const consoleLogOriginal = console.log
	console.log = function log (...args) {
		consoleLogOriginal.call(console, ...args)
		for (const arg of args) {
			consoleElement.innerHTML += arg			
		}
		consoleElement.innerHTML += '<br>'
	}

	;(function () {
		try {
			eval(value)			
		} catch (err) {
			console.log(err)
		}
	}).call(emptyContext);

	console.log = consoleLogOriginal.bind(console)
})