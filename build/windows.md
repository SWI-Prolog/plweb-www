# Building SWI-Prolog on MS-Windows

There  are three  ways to  build SWI-Prolog  from source  for Windows.
Here are some notes regarding the different approaches:

  - __Compiler__.  MinGW (GCC) produces 20-30% faster binaries than
    MSVC.  The resulting library can be used with MinGW as well as
    MSVC.  Debugging can be tricky because the GNU `gdb` debugger does
    not understand the MSVC debugging information and Microsoft
    debugger does not understand the GCC debugging information.

  - __Cross compiling__  Windows is notoriously slow in starting programs
    and the compilation starts _many_ programs.   CMake does not support
	symbolic links on Windows, which implies that we need to do a lot of
	copying to establish the target file structure.  Cross compiling
	using Linux is __much faster__.

  - __Dependencies__  Getting the dependencies is fairly well handled in
    all three scenarios.  They are built into the Docker image when using
	docker based cross compilation.   For MSYS2, the dependencies are
	produced by the MSYS packages and for Microsoft Visual C++ we use
	vcpkg.

While building  for Windows has improved  a lot with the  migration to
CMake  for SWI-Prolog  and much  improved dependency  handling, it  is
still a tedious  process that provides little benefits  over using the
binary     installers     that      can     be     downloaded     from
https://www.swi-prolog.org/Download.html


## Cross-compiling

We provide a [Docker file](https://github.com/SWI-Prolog/docker-swipl-build-mingw)
that is based on Fedora Linux and builds SWI-Prolog using the MinGW cross
compilers and Wine emulation to run the Prolog steps.  This should
work on any machine capable of running Docker.

The Docker image uses a host filesystem directory to access the source
tree and create the result.

See the `Makefile` of the repo for using it.

This is used to build the binary releases for Windows as well as
the [daily builds](https://www.swi-prolog.org/download/daily/bin/).


## Using MSYS

There are also swi-prolog packages for [MSYS2](https://www.msys2.org/)
and you  can use  MSYS2 to  compile SWI-Prolog  from source  using the
dependencies from MSYS2.


## Using Microsoft Visual C++ (MSVC)

This  is  a recent  addition.   The  process  is  based MSVC  and  the
[vcpkg](https://vcpkg.io/) package manager.

### Preparation

*|Install Microsoft Visual C++|*.  You need the command line tools and
optionally  Visual Studio.   The  the supplied  shortcuts  to start  a
`cmd.exe` or PowerShell prompt setup for running the MSVC command line
tools.

__Install `vcpkg`__ if you do not have it.  The vcpkg site suggests to
install the  package manager into a  folder close to the  device root,
suggesting ``c:\src\vcpkg`` or ``c:\dev\vcpkg``.  We use the latter in
our examples.

```
c:
cd \
mkdir dev
git clone https://github.com/Microsoft/vcpkg.git
cd vcpkg
.\bootstrap-vcpkg.bat
```

__Install the dependencies__  we need.  Run these  commands inside the
``c:\dev\vcpkg``  directory.    The  ``--triplet   x64-windows``  flag
demands for the  64 bit versions of the dependencies.   The `zlib` and
`pthreads` dependencies are obligatory.  The others are to support the
packages.

```
.\vcpkg install --triplet x64-windows zlib pthreads
.\vcpkg install --triplet x64-windows pcre2 libjpeg-turbo libyaml libarchive
```

__Configure the system__

Go to the  checked out SWI-Prolog sources and run  the commands below.
Adjust the tool chain script  if you installed `vcpkg` elsewhere.


```
mkdir build
cd build
cmake -DCMAKE_TOOLCHAIN_FILE=/dev/vcpkg/scripts/buildsystems/vcpkg.cmake ..
```

__Build the system__

To build  using the  command line  tools, run  the following  from the
`build` directory.   Alternatively you  may open  the `SWI-Prolog.sln`
file that opens Visual Studio.

```
cmake --build . --config Release
```

__Status__

The Microsoft Visual  C++ port is experimental.  The  above builds the
core  system and  all packages  except for  ``JPL`` and  ``bdb``.  The
tests  pass  except  for  a spurious  failure  in  `swipl:basics`.

Packaging has not been tested.
