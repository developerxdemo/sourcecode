    .-----------.
----|music_chart|-------------------------------------
    `-----------'

Node.js web server using express module, offers REST resources
to clients. Just to play with node and MongoDB, it needs many
improvements.

By Pello Xabier Altadill Izura - http://pello.info
Feel free to insult me at @pelloxabier

Requirements: 
- Node.js: with express, http, mongoose, jade, colors
- MongoDB

    .-------------------.
----|Starting the server|----------------------------
    `-------------------'
linux# node music_chart.js


    .-----------------------.
----|Setting up the database|-------------------------
    `-----------------------'

linux# mongoimport -d musicdb -c songs  songs.js

That will create a database 'musicdb' with a table named 'songs'
and will load all values from songs.js

    .-------.
----|Testing|----------------------------------------
    `-------'
With (almost) any browser visit: http://localhost:3000/rest.html

