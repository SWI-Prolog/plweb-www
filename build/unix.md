# SWI-Prolog -- Installation on Linux, *BSD (Unix)

## Installing from binaries

The official packages are often out of date. PPAs and snaps are
created automatically for every release.

  - [PPAs](<PPA.html>) are available for Ubuntu.
  - [Snaps](<snap.html>) are available for Linux distributions with
    `snapd` installed.

## Installing from source

Installing from source is often the best option for installing on Linux
and *BSD based systems. Building is not complex.

### Downloading SWI-Prolog

Download the SWI-Prolog source

  - As a _tar ball_ from [the download page](</Download.html>)
  - Using GIT from [GIThub](https://github.com/SWI-Prolog/)

We recommend using GIT as it makes updates much faster and you can
upgrade as well as downgrade easily at any time to any version.

### Preparing the source (when downloading using GIT)

The _tar ball_ is self contained. The GIT repository contains sub
modules. The git repository is downloaded (cloned) using the commands
below:

```
git clone https://github.com/SWI-Prolog/swipl-devel.git
cd swipl-devel
git submodule update --init
```

Similarly, the sequence to update the source using git and rebuild is

```
cd swipl-devel
git pull
git submodule update --init
```

### Getting the prerequisites

Building SWI-Prolog from source requires tools as well as libraries.  We maintain
pages that describes the required dependencies by platform.  The last entry of the
list below describes the dependencies in platform independent way.

  - [Debian based linux (Debian, Ubuntu, Mint, Raspberry Pi, ...)](<Debian.html>)
  - [Redhat based linux (Fedora, Redhat, CentOS, ...)](<Redhat.html>)
  - [SuSE](<SuSE.html>)
  - [Mageia](<Mageia.html>)
  - [Other systems (background info)](<prerequisites.html>)

### Building using cmake

Using cmake the system is typically build in a subdirectory of the
downloaded sources. The build system does not add or modify any file
in the source tree and (thus) multiple subdirectories can be created
holding different configurations. A built system can be removed by
removing the build directory. The example below installs the system in
your home directory and used [ninja](https://ninja-build.org/) to
build the system.  We recommend building using GCC for best
performance.


```
cd swipl-devel
mkdir build
cd build
cmake -DCMAKE_INSTALL_PREFIX=$HOME -DCMAKE_BUILD_TYPE=PGO -G Ninja ..
ninja
ctest -j $(nproc) --output-on-failure
ninja install
```

SWI-Prolog can be used without installing by running `src/swipl`
from below the `build` directory.  You may create a symbolic link from
your personal _bin_ directory to `src/swipl` in the build directory.

A full description for installing a particular configuration in a
particular location, dealing with development workflows, etc. can be
found in the file
[CMAKE.md](https://github.com/SWI-Prolog/swipl-devel/blob/master/CMAKE.md)


## Post installation (JPL)

If you want to call Java from Prolog using JPL, you need to add the
directory holding the JVM shared objects to the dynamic linker search
path. Using default installation on Ubuntu, this is achieved by adding
the following to your =|~/.profile|=.  Check your Java configuration to
find the exact path.

```
LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/lib/jvm/java-1.8.0-openjdk-amd64/jre/lib/amd64/server
```
