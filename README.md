# Nota
Este proyecto es la prueba técnica para la startup española Newe, no escribiré cuáles fueron los objetivos de la prueba para evitar dar una posible solución. Para instalar las dependencias del proyecto, por favor ejecutar npm install --force, ya que estoy usando la última versión de React que tiene problemas de compatibilidad con otras dependencias como mui

## Características
- Buscador de pokemones, la primera vez que busques un pokemon, tratará de traerlos a todos, por lo que demorara un poco, despues, podrás buscar pokemones instanteanamente

- Tienda pokemon, compra pokebolas para poder capturar pokemones

- Pokemon, podrás visualizar el nombre del pokemon, todas las habilidades que este puede aprender, sus estadísticas, como Vida, Fuerza, Velocidad, etc. También los lugares dónde este aparece, articulos que posee, y sus habilidades especiales

- Pokemones favoritos, podrás agregar tus pokemones a favoritos

- Pokemones capturados, podrás capturar pokemones y cambiarles el nombre, al capturar un pokemon ya no podrás volver a capturarlo

- Juego de atrapar al pokemon, atrapa a un pokemon con las 3 pokebolas disponibles: Pokeball, Ultraball, Superball. Cada pokebola tiene una probabilidad de atrapar a un pokemon, cada vez que el pokemon tenga mayor nivel de dificultad de capturar, más será dificil de capturarlo

- Paginación, podrás cambiar de página facilmente, agregando la siguiente query string: /?page=2 , actualmente hay 28 páginas disponibles, del total de 1126 pokemones de la pokeAPI, podrás cambiar facilmente de valor de la query string page y navegar a la página que deseas, por cada página se muestran 40 pokemones, empezarás viendo 10, después de darle al botón invocar más pokemones, cargará 10 más

- Mobile responsive, el proyecto se ha adaptado en lo posible a hacerlo friendy mobile

- Uso de LocalStorage, se ha usado la api de local storage del navegador para almacenar los datos que vayamos cargando y actualizando

### Mensaje del desarrollador
Espero que les guste el proyecto <3, me esforzado un montón para ello, espero que valoren el esfuerzo que hecho para la realización de inicio a fin de este proyecto, muchas gracias - Imanol Enrique

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
