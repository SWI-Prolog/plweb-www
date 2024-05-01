# Building SWI-Prolog on MacOSX

_Last updated: Oct 31, 2018, homebrew_

## Using Macports

Building SWI-Prolog for MacOS requires
[[Macports][http://www.macports.org/]]. In general, the Portfiles are
kept nicely up-to-date thanks to Paulo Moura.  If you are a Macport
user, SWI-Prolog can be installed simply using one of the commands
below.  The first installs the `stable' version and the second the
`development' version.  Note that most of the time developers are
better of using the development version.

  ==
  port install swi-prolog
  port install swi-prolog-devel
  ==

If you like to keep nice and lean system (i.e., if you do not want
Macports copies of X11, ODBC, etc), you still need to install several
prerequisites.  First:

  1. Xcode (can be installed as a free app from the appstore)
  2. Macports (download from http://www.macports.org/)
  3. X11 (download from http://xquartz.macosforge.org/landing/)

Next, you must install the following Macport libraries for a complete build.

  ==
  port install cmake ninja gmp jpeg libarchive libiconv libmcrypt ncurses \
               openssl ossp-uuid pkgconfig readline zlib pcre db62 libedit \
               fontconfig libyaml unixODBC openjdk17 junit hamcrest-core
  ==

Notes

  - If you want JPL (the Java interface) you can also install the Oracle JDK.  As
    Oracle gets increasingly annoying about agreeing with their license and as of
    version 10 creating an account with Oracle, we switched to OpenJDK.  Versions
    before 9 have a bug that causes the Mac to think you have no JRE when accessing
    Java through JNI.

Next, you can download SWI-Prolog as a [[source
archive][</Download.html>]] or using [[GIT][</git.html>]]. After installing all dependencies SWI-Prolog can   be build according to
the generic instructions using [cmake](https://cmake.org/)   that can be
found
[here](https://github.com/SWI-Prolog/swipl-devel/blob/master/CMAKE.md)

## Using Homebrew

[Homebrew](http://mxcl.github.io/homebrew/) provides an alternative to Macports.
The command below installs the latest _stable_ version of SWI-Prolog:

  ==
  brew install swi-prolog
  ==

The latest git version of SWI-Prolog can be installed with this command:

  ==
  brew install swi-prolog --HEAD
  ==

(contributed by Rinke Hoekstra)

### Building from source using Homebrew for dependencies {#homebrew-deps}

As of version 7.7.21 the  SWI-Prolog   sources  are fully compatible for
building with dependencies provided by Homebrew. The dependencies can be
installed using

```
brew install \
     cmake \
     ninja \
     gmp \
     openssl \
     libarchive \
     readline \
     ossp-uuid \
     libyaml \
     unixodbc \
     berkeley-db \
     pcre \
     jpeg
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


