# SWI-Prolog on Redhat (Fedora, RHEL, CentOS)

| Fedora release | 39, 40 |
| SWI-Prolog release | 9.2.x, 9.3.x |
| Package page | https://packages.fedoraproject.org/pkgs/pl/pl/ |
| Packager | Fedora Project |

The [Fedora project](https://fedoraproject.org/) is tracking the
SWI-Prolog stable versions as package `pl`.  This page describes
installing the dependencies for SWI-Prolog that are needed for
[building from source](<unix.md>).

As of May 2024, Fedora (currently version 40) is the main development
platform for SWI-Prolog.  This used to be Ubuntu.  Ubuntu is still well
maintained as it is used by the CI on Github as well as for running the
web services of SWI-Prolog.


## Dependencies

Use the following commands to obtain all dependencies for a full build
from source.

```
dnf install \
  gcc gcc-c++ \
  cmake \
  ninja-build \
  gperftools-devel \
  freetype-devel \
  gmp-devel \
  java-latest-openjdk-devel \
  javapackages-bootstrap \
  jpackage-utils \
  junit \
  libICE-devel \
  libjpeg-turbo-devel \
  libSM-devel \
  libX11-devel \
  libXaw-devel \
  libXext-devel \
  libXft-devel \
  libXrandr-devel \
  libXinerama-devel \
  libXmu-devel \
  libXpm-devel \
  libXrender-devel \
  libXt-devel \
  ncurses-devel \
  openssl-devel \
  pkgconfig \
  readline-devel \
  libedit-devel \
  libdb-devel \
  unixODBC-devel \
  zlib-devel \
  uuid-devel \
  libarchive-devel \
  libyaml-devel \
  python3-devel
```

### Adding the Qt console

The Qt GUI application `swipl-win` can  be   added  by installing the Qt
dependencies:

```
sudo dnf install qt6-devel qt6-qtbase-devel
```


For debugging Janus (the Python interface) using
``-DCMAKE_BUILD_TYPE=Debug`` it is advised to install the debug
version of the Python embedding library called
``libpython<version>d.so``.  On Fedora, the debug library is installed
using

```
sudo dnf install python3-debug
```

### Building the PDF documentation

To build the PDF documentation you need LaTeX and several helpers.  The
following set of dependencies was established on Fedora 40 for SWI-Prolog
9.3.6

```
sudo dnf install \
	texlive-latex \
	texlive-a4wide \
	texlive-tabulary \
	texlive-dvips \
	texlive-bibtex \
	texlive-makeindex \
	texlive-metafont \
	texlive-ec
```


## Building the RPM

You can build an RPM package  from   the  sources, for example to deploy
locally using the CMake CPack tool. See  `CMAKE.md` in the top directory
of the sources.
