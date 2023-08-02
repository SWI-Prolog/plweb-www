# Prerequisites for Debian based systems (Ubuntu, Mint, ...)

## Using apt-get to get dependencies from the package maintainers

The universal way to get dependencies for a package is below.   The disadvantage is that the distribution list of dependencies can be outdated.

    apt-get build-dep swi-prolog

After building you may wish to run `?- check_installation.` in `swipl` to check that all components have been built properly.

## Installing the dependencies manually

Use the following commands to obtain all dependencies for a full build
from source. Note that there are no known version dependencies on any of
these packages. If your (debian-based) distribution is lacking any of
these package use ``apt search <name>`` to find an alternative, where
<name> is e.g., `jdk` (i.e., remove version and details). Some remarks:

  - ``ninja-build`` may be dropped, building using `make`.  Using `make`
    is fine for a one-time build, but `ninja` is advised for developers
    or people that regularly update using git.
  - It is possible to use `iodbc` instead of `unixodbc` for ODBC
    connectivity.
  - The SWI-Prolog Java interface (JPL) works with many Java development
    kits.  `Junit4` is needed as of version 8.1.29.  Older versions require
    `junit` (Junit 3).
  - The package =|libarchive-dev|= is needed for library(archive),
    which is needed by pack_install/1.
  - The package =|libossp-uuid-dev|= is needed for library(uuid).
  - The package =|libdb-dev|= is needed for
    library(bdb), the BerkeleyDB embedded database interface.
  - The package =|libreadline-dev|= and =|libedit-dev|= both provide
    command line editing for interactive usage.  None is strictly
    needed and one of them suffices. =|libedit-dev|= is the preferred
    command line editor.
  - ``libgoogle-perftools-dev`` provides
    [tcmalloc](https://github.com/google/tcmalloc), which can reduce
    memory usage a lot on some heavily multithreaded applications.
  - `libpcre2-dev` is required for library(pcre).  SWI-Prolog versions before
    8.5.9 require `libpcre3-dev` (which is older than `libpcre2-dev` ...)
  - `cmake` must be at least version 3.5 See
    [CMAKE.md](https://github.com/SWI-Prolog/swipl-devel/blob/master/CMAKE.md)

```shell
sudo apt-get install \
        build-essential cmake ninja-build pkg-config \
        ncurses-dev libreadline-dev libedit-dev \
	libgoogle-perftools-dev \
        libgmp-dev \
        libssl-dev \
        unixodbc-dev \
        zlib1g-dev libarchive-dev \
	libossp-uuid-dev \
        libxext-dev libice-dev libjpeg-dev libxinerama-dev libxft-dev \
        libxpm-dev libxt-dev \
	libdb-dev \
	libpcre2-dev \
        libyaml-dev \
		libpython3-dev \
        default-jdk junit4
```

[Raspbian](<Raspbian.txt>) is fully supported and can be used to build SWI-Prolog
including all packages without issues. If you want to reduce resources, the following packages are optional:

  $ default-jdk junit :
  Without you do not have Java connectivity (JPL)
  $ libxext-dev libice-dev libjpeg-dev libxinerama-dev libxft-dev libxpm-dev libxt-dev :
  Without these _xpce_ will not be built and the graphical IDE tools are
  not available.
  $ unixodbc-dev :
  Without, you have no ODBC database connectivity (e.g., MySQL)
  $ libssl-dev :
  Without, you have no SSL (and HTTPS) support.
  $ libgmp-dev :
  Without, you lack unbounded integer support, rational numbers, good
  random number generators, etc.
  $ libpcre2-dev :
  Without, you have no regular expression support (library(pcre)).
  $ libyaml-dev :
  Without you have no YAML support (library(yaml)).
  $ libpython3-dev :
  Without you have no library(janus), providing access to an embedded
  Python interpreter.

Note that including GMP support makes the memory footprint bigger, but
mostly if you have no other applications depending on GMP. All the other
optional components are only loaded when you use them.

### Prerequisites to build swipl-win

The `swipl-win` executable provides a Qt based console for SWI-Prolog by
Carlo Capelli. This console is used to provide the MacOS app, but can
also be used on Linux. To include it, install the Qt development
environment:

```shell
sudo apt install qt5-default
```

The ``qt5-default`` package is dropped from Ubuntu 21.04 and has never
existed on some other Debian based distributions.  In that case, use
the command below.

```shell
sudo apt-get install qtbase5-dev qtchooser qt5-qmake qtbase5-dev-tools
```

### Prerequisites to build the documentation

The HTML documentation is built as part of the default build procedure
and only depends on Prolog itself and some of its packages. The
dependencies below are needed to build the PDF documentation.
Configuring the build to include the PDF docs requires

    cmake -DBUILD_PDF_DOCUMENTATION=ON ...

```shell
sudo apt-get install \
	texlive-latex-extra \
        texlive-font-utils \
	texlive-fonts-extra \
	texlive-fonts-extra-doc \
	texlive-fonts-recommended \
	texlive-fonts-recommended-doc
```

Now that after you have installed dependencies, return to [Build
SWI-Prolog from source](<unix.html>) to complete installation.
