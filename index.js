import app from './src/app';

const inputFile = process.argv[2];

// eslint-disable-next-line no-console
app(inputFile).then(result => result.map(value => console.log(value.toFixed(2))));
