Welcome to Bubl, helping elementary age students connect with one another before entering middle school.

Students can create an account, and join an existing school account. Within each school are groups organized by interest, called bubls. Students can search for these groups, and join them. They can post within bubls, and comment on eachother's posts. They can update and delete their own posts, and delete their own comments.

This project was built using create react app and LESS. Enter the bubl directory and run `yarn install` . Then, within bubl run `yarn start` to start your development server. It is recommended to use the yarn commands, rather than the npm commands listed in the create react app readme.

To run the less watch compiler, once you have run yarn install within the bubl directory, go into the src directory and run `less-watch-compiler less css index.less`. This will compile your LESS.

Don't forget to use `yarn run build` as your build command for deployment.

The bubl directory contains a \_redirects file within the public directory to handle routing problems with netlify.

This app contains components for Login errors, to display in the login form, as well as a full page error page (MainError) and a block level error (BlockError). The main and block loaders take a text prop so that you can easily set the error message. It also includes a fullpage loader (FullPageLoader) and a block level loader (BlockLoader). The loaders use react-loader-spinner, which is easy to customize.

This app used private routes for authentication. A get request is made to log in, and the returned token is stored on the local storage. If the token is not present, the app will redirect to the login page.
