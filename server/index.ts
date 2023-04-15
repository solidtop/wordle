import initApp from './src/app';
const app = initApp();

const PORT: number = 5080;
app.listen(PORT, (): void => {
    console.log(`Listening on port ${PORT}`);
});

