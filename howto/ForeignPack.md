# Creating a pack that uses C or C++ code

This page describes the basics for creating packages that contain C or
C++ code, also known as _foreign_ code.


## Runtime installation

Foreign code must be compiled into a SWI-Prolog extension, a loadable
library. These things are supported by virtually any modern operating
system under different names, e.g., DLL in Windows and _|shared object|_
in Unix.  A package may include such an extension.  The package system
can see this extension iff

  - It is placed in a subdirectory lib/<arch> in the package, where
    <arch> is the Prolog architecture as available through the Prolog
    flag =arch=.  For example:

      ```
      ?- current_prolog_flag(arch, Arch).
      Arch = 'x86_64-linux'.
      ```

  - The file uses the extension for such objects for the target
    platform.  This extension is also available as a Prolog flag:

      ```
      ?- current_prolog_flag(shared_object_extension, Ext).
      Ext = so.
      ```

Provided that the above  installation   guidelines  are followed, Prolog
code can include the extension using the directive use_foreign_library/1
as below. Note that =sqlite4pl= is the   example  name of the extension.
The  search  path  =foreign=  searches  the  lib/<arch>  directories  of
installed packages. The extension must be omitted because it is platform
dependent.

  ```
  :- use_foreign_library(foreign(sqlite4pl)).
  ```


## Binary extensions

Binary packages may include the lib/<arch>   subdirectory in the package
and suitable precompiled extensions for   the target architectures. Note
that how well this works depends  on   the  binary  compatibility of the
platform as well as the  mechanism  used   by  the  platform  to resolve
dependencies between Prolog and the extension.  In particular:

  $ Windows :
  Distributing DLLs should typically provide a fair deal of portability
  in terms of different Prolog and Windows versions.

  $ MacOS :
  MacOS has both `.dylib` and `.so` shared objects.  The latter are
  called _modules_ by CMake.  We use `.so` files for foreign extensions.

  $ Linux :
  Linux ELF objects (*|.so|* files) resolve symbols against already
  loaded symbols, which makes the extension independent from the
  location of SWI-Prolog and the version.  The downside is that
  Linux shared object that depend on many system features are often
  not binary compatible due to different versions of dependencies.


## Source extensions

Alternatively, or in  addition,  the  extensions   may  be  provided  as
sources. The advantage thereof  is  that   the  above  mentioned version
dependencies do not apply. The disadvantage  is   that  the user needs a
suitable setup for  running  the  C   development  tools  and  installed
development libraries for dependencies.   Here are some examples:

  $ Windows :
  Requires [[MinGW][http://www.mingw.org]] installed in a =mingw= folder
  on the same drive as where SWI-Prolog is installed.

  $ MacOS :
  Requires Xcode to be installed.

  $ Linux :
  Requires the development tools installed.  The package names for this
  vary from distribution to distribution, but typically this is smooth
  process and we assume that programmers using a Linux system have these
  tools installed.

## The build process

The build process is defined by the following steps:

  1. clean
  2. dependencies
  3. configure
  4. build
  5. test
  6. install

The __clean__ step is optional and used by pack_rebuild/1 in the mode
`distclean`. For each of the steps the system asks its build plugins to
identify known configuration files and perform the step. The planning
for a next step may depend on the output of the previous step.  Below
is a list that describes the current strategy.  New strategies may be
added by providing additional plugins for library(build/tools).

  - dependencies
    - conan
      If a file `conanfile.txt` or `conanfile.py` is found in the
      toplevel directory, create a directory `build` and run

	  conan install -b missing ..

      If, as a result, a file `environment.sh.env` is created in the
      `build` directory, load the environment variables.  This exploits
      conan's `virtualenv`.
  - configure
    - cmake
      If a file `CMakeLists.txt` is present create a subdirectory `build`
      and run

          cmake -DSWILP=.. -DCMAKE_INSTALL_PREFIX=... ..

    - make
      Performs GNU style configuration.  Knows about `Makefile.am`,
      `congigure.in`, `congigure.ac` and `configure`.
  - build
    - cmake
      If cmake was detected, run `cmake --build .` in the `build`
      directory.
    - make
      If a ``Makefile`` or `makefile` is found, run `make`
  - test
    - cmake
      If a file ``CTestTestfile.cmake`` is found in build, run
      `ctest`.
    - make
      If a ``Makefile`` or `makefile` is found, run `make check`
  - install
    - cmake
      If cmake was detected, run `cmake --install .` in the `build`
      directory.
    - make
      If a ``Makefile`` or `makefile` is found, run `make install`

During all these steps the tools have access to details about Prolog
through the environment variables described in the next section.


### Build environment

The configuration and installation steps  are executed by pack_install/1
and provide the following environment variables:

  $ PATH :
  Available system path.  The SWI-Prolog binary directory is prepended.
  $ SWIPL :
  Absolute path to the running SWI-Prolog instance.
  $ SWIPLVERSION :
  SWI-Prolog version as the integer 10000*<major> + 100*<minor> + <patch>
  $ SWIARCH :
  SWI-Prolog architecture identifier (see above).
  $ PACKSODIR :
  (Relative) path to the directory where the extension must be
  installed.  Note that the directory may not exist.
  $ SWISOLIB :
  Extensions must link to this library.  Normally this is =|-lswipl|=
  on (X)COFF systems (Windows, MacOS) and empty on ELF systems (Linux).
  $ CC :
  C-compiler to use.  Taken from the CC environment or the =c_cc= Prolog
  flag.
  $ LD :
  Linker to use.  Taken from the LD environment or the =c_cc= Prolog
  flag.
  $ CFLAGS :
  Flags to pass to the compiler. Default is the flag =c_cflags=,
  followed by -I<dir>, where <dir> is the directory holding
  =|SWI-Prolog.h|=, followed by =|-D__SWI_PROLOG__|= and the
  value of the =CFLAGS= environment variable.
  $ LDSOFLAGS :
  Flags to pass to the linker to link an extension.  Default is
  the flag =c_ldflags=, following by =|-shared|= and the
  value of the =LDFLAGS= environment variable.
  $ SOEXT :
  File name extension to use for extensions.  Does _not_ include the
  "=|.|=".
  $ TMP, TEMP, HOME, USER :
  The variables are passed from the environment if they exist

The environment can be changed by   providing  clauses for the multifile
predicate  prolog_pack:environment/2.  Answers  of  this  predicate  may
provided  additional  environment  variables.  Answers   for  the  above
mentioned variables replace the above described value.


### Windows MinGW builds

The infrastructure assumes using [[MinGW][http://www.mingw.org]] and
MSYS for building foreign packages on Windows. If pack_install/1 detects
a foreign pack on Windows, it performs the following steps to prepare
MinGW:

  1. If gcc.exe and make.exe are in %PATH%, use them.
  2. Else, try to find <drive>:/MinGW, where <drive> is first the
     drive on which Prolog is installed, followed by *C* and *D*.
  3. If (2) succeeded, add /msys/<version>/bin to %PATH% to make
     make.exe available.
