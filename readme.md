yeoman-jekyll
=============

Install
-------

Grab dev dependencies (yeoman generators & grunt tasks). In the Jekyll website root.

    npm install http://github.com/mklabs/yeoman-jekyll/tarball/master

Install Jekyll locally

```rb
# in your Gemfile

gem "jekyll"
gem "rdiscount"
```

Grab dev dependencies (yeoman generators & grunt tasks). In the Jekyll website root.

    # add it to your project dependency
    npm install https://github.com/mklabs/yeoman-jekyll/archive/master.tar.gz --save

Tasks
-----

The generator should create a basic `Gruntfile.js` with a `_tasks` directory
including few `jekyll-*` tasks to serve or compile the website.

    jekyll          Compile jekyll with default config (in _config.yml)
    jekyll-compile  Runs jekyll in no-server mode, compiling to _site
    jekyll-help     Outputs Jekyll help output

**todo**

    jekyll-reload   Watch _site for file changes and send a LiveReload notification
    jekyll-build    Compiles assets and update layouts

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


