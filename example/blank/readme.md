
Create the Site file structure

    npm install
    npm start

This will generate a directory like this:

      .
      ├── Gemfile
      ├── Gruntfile.js
      ├── _config.yml
      ├── _includes
      ├── _layouts
      │   ├── default.html
      │   └── post.html
      ├── _posts
      │   └── 1970-01-01-placeholder-post.md
      ├── index.html
      ├── readme.md
      ├── stylesheets
      │   ├── print.css
      │   ├── pygment_trac.css
      │   └── stylesheet.css
      └── _tasks
          └── jekyll.js

The generator creates a basic `Gruntfile.js` with a `_tasks` directory
including few `jekyll-*` tasks to serve or compile the website.


    jekyll          Compile jekyll with default config (in _config.yml)
    jekyll-compile  Runs jekyll in no-server mode, compiling to _site
    jekyll-help     Outputs Jekyll help output






