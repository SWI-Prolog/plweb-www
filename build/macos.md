# Building SWI-Prolog on MacOSX

There are several ways to build SWI-Prolog for MacOS.  First of
all, you need basic development tools such as a C-compiler, CMake,
etc.  SWI-Prolog both compiles using MacOS Xcode clang and gcc.
Notably on Intel Macs, gcc produces significantly faster (up to
40%) code.


## Using Macports

Building SWI-Prolog for MacOS requires
[[Macports][https://www.macports.org/]]. The `Portfile` specifications
are updated with any new stable and development release.  If you are a
Macport user, SWI-Prolog can be installed simply using one of the
commands below.  The first installs the _stable_ version and the
second the _development_ version.  Note that most of the time
developers are better of using the development version.  This is
currently in particular true as the development version support native
MacOS Quartz graphics while the stable version (9.2.x) requires the
XQuartz X11 application.

```
port install swi-prolog
port install swi-prolog-devel
```

If you like to keep nice and lean system (i.e., if you do not want
Macports copies of X11, ODBC, etc), you still need to install several
prerequisites.  First:

  1. Xcode (can be installed as a free app from the appstore)
  2. Macports (download from https://www.macports.org/)
  3. For versions up to 9.3.25, XQuartz (download from https://xquartz.macosforge.org/landing/)

Next, you must install the following Macport libraries for a complete build.
For versions up to 9.3.35

```
port install cmake ninja gmp jpeg libarchive libiconv libmcrypt ncurses \
	openssl ossp-uuid pkgconfig readline zlib pcre db62 libedit \
    fontconfig libyaml unixODBC openjdk17 junit hamcrest-core
```

For version 9.3.26 or later

```
port install cmake ninja gmp libarchive libmcrypt ncurses \
	openssl ossp-uuid pkgconfig zlib pcre db62 libedit \
    libyaml unixODBC openjdk17 junit hamcrest-core \
	SDL3 SDL3_image cairo pango
```


Notes

  - If you want JPL (the Java interface) you can also install the Oracle JDK.  As
    Oracle gets increasingly annoying about agreeing with their license and as of
    version 10 creating an account with Oracle, we switched to OpenJDK.  Versions
    before 9 have a bug that causes the Mac to think you have no JRE when accessing
    Java through JNI.

Next, you can download SWI-Prolog as a [[source
archive][</Download.html>]] or using [[GIT][</git.html>]]. After
installing all dependencies SWI-Prolog can be build according to the
generic instructions using [cmake](https://cmake.org/) that can be
found
[here](https://github.com/SWI-Prolog/swipl-devel/blob/master/CMAKE.md)

## Using Homebrew

[Homebrew](https://mxcl.github.io/homebrew/) provides an alternative to Macports.
The command below installs the latest _stable_ version of SWI-Prolog:

```
brew install swi-prolog
```

The latest git version of SWI-Prolog can be installed with this command:

```
brew install swi-prolog --HEAD
```

(contributed by Rinke Hoekstra)

### Building from source using Homebrew for dependencies {#homebrew-deps}

Below are the  dependencies for a complete  installation of SWI-Prolog
using Homebrew  dependencies.  This  is updated for  SWI-Prolog 9.3.20
and later, i.e., the versions that use SDL3 for graphics.

```
brew install \
     cmake \
     ninja \
     gmp \
     openssl \
     libarchive \
     ossp-uuid \
     libyaml \
     unixodbc \
     berkeley-db \
     pcre \
     SDL3 \
     SDL3_image \
     cairo \
     pango \
     jpeg
```

For SWI-Prolog 9.3.26 or later, you need the following additional
dependencies to build the GUI tools

```
brew install sdl3 sdl3_image cairo pango libedit pkgconf
```

Brew does not provide `junit.jar` which is   needed to run the JPL (Java
interface) tests. If you want to test  this get `junit.jar` as described
in  https://github.com/junit-team/junit4/wiki/download-and-install   and
install in =|/usr/local/share/java/junit.jar|=.

After installing all dependencies SWI-Prolog can   be build according to
the generic instructions using [cmake](https://cmake.org/)   that can be
found
[here](https://github.com/SWI-Prolog/swipl-devel/blob/master/CMAKE.md)


@see The [Portfile](https://github.com/macports/macports-ports/blob/master/lang/swi-prolog-devel/Portfile)
