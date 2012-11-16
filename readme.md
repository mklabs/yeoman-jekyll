yeoman-jekyll
=============

Install
-------

Grab dev dependencies (yeoman generators & grunt tasks). In the Jekyll website root.

    npm install http://github.com/mklabs/yeoman-jekyll/tarball/master

Install Jekyll locally

    gem install jekyll rdiscount

Commands
--------

To enable below commands, project gruntfile should load the plugin tasks:

```js
grunt.loadNpmTasks('yeoman-jekyll');
```

**Run the build script**

    yeoman build

This will compile the Jekyll website in the intermediate directory `_temp/`, go
through yeoman build script, and finally copy the result over `_site/`


**preview server**

    yeoman server

This will run Jekyll with the default configuration setup in `_config.yml`.
Both `auto` and `server` options should be turned on. Jekyll will watch for
modifications and rebuilt automatically in `_site`.

Yeoman / Grunt are configured to watch any files with `_site` directory, and
will start a LiveReload compatible server on port `35729`.

Install the LiveReload extensions, visit `http://localhost:4000` (default
hostname / port, you change it in the `_config.yml`), click the
LR icon, connection should establish and you can then enjoy the live reloading
of your Jekyll website.

Generators
----------

`yeoman-jekyll` defines the following generators:

- gruntfile:jekyll
- jekyll

**yeoman init jekyll -h**

Generator based on [@necolas'
jekyll-boilerplate](https://github.com/necolas/jekyll-boilerplate), with some
ability to wire up some of the GitHub Page theme.

    Usage:
      yeoman init jekyll LOCATION [options]

    Options:
      -h, --help       # Print generator's options and usage
                       # Default: false
          --theme      # Choose a theme from the following GitHub page templates:
                         - orderedlist/modernist
                         - orderedlist/minimal
                         - mattgraham/Midnight
                         - jsncostello/slate
                         - mattgraham/Leap-Day
                         - jonrohan/time-machine-theme
                         - cameronmcefee/merlot
                         - broccolini/dinky
                         - tactile
                       # Default: tactile
          --gruntfile  # Gruntfile to be invoked
                       # Default:

    Description:
        Yeoman generator based on @necolas' Jekyll Boilerplate.

        This generator will simply fetch the latest state of jekyll-boilerplate's
        master branch (unless the content is already cached by yeoman at
        `~/.yeoman/cache/necolas/jekyll-boilerplate)` in the `location` argument
        provided.

    Arguments:

        - location: Defaults to current working directory. Base directory to copy
                    the content of the remote template.

    Tasks:

        This generator will also generate:

          - a basic Gruntfile if none were found
          - a tasks/ directory with:
            - server: Override the built-in server command to run Jekyll instead.

    Example:

        yeoman init jekyll

        This will create:
            .
            |-- .gitignore
            |-- README
            |-- _config.yml
            |-- _layouts
            |   |-- default.html
            |   |-- post.html
            |-- _includes
            |-- _posts
            |   |-- 1970-01-01-placeholder-post.md
            |-- index.html

**yeoman init gruntfile:jekyll -h**

Invoked by `jekyll` generator as hook, but can be triggered directly to
generate only the grunt configuration, or update an existing one.

    Usage:
      yeoman init gruntfile:jekyll  [options]

    Options:
      -h, --help  # Print generator's options and usage
                  # Default: false

    Description:
        This generator is here to help with the setup of grunt / yeoman
        configuration on Jekyll based websites.

        It'll scan the current working directory for key-directories and known file
        patterns. You'll then be asked for confirmation on each of these directory,
        with sensitive defaults, or suggestion based on the current file structure.

        ex. A lookup is performed on the current working directory for CSS (and
        scss/sass files). Each result is then reduced into a list of unique
        directory paths. If the scanned directories consists in a single result,
        then the system suggest to use that path as "styles" value.

        The result is then persisted as a local `.yeomanrc` JSON file, along the
        generation of a Yeoman Gruntfile.

    Example:
        yeoman init gruntfile:jekyll

        This will create:
            Gruntfile.js
            .yeomanrc


