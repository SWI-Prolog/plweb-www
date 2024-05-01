# Building SWI-Prolog for MS-Windows using MinGW

The [MinGW](http://www.mingw.org) compiler suite is a port of GCC that
targets the Windows platform. Unlike Cygwin which comes with an
extensive POSIX runtime emulation, MinGW targets the native Windows API
including MSVCRT (The MSVC runtime library that provides some POSIX
capabilities).

MinGW is distributed as a cross-compiler for many Linux distributions
and can be used under MSYS, _|"a collection of GNU utilities such as
bash, make, gawk and grep to allow building of applications and programs
which depend on traditionally UNIX tools to be present. It is intended
to supplement MinGW and the deficiencies of the cmd shell."|_.

Building SWI-Prolog for MS-Windows under Linux is supported using
[Docker](https://github.com/SWI-Prolog/docker-swipl-build-mingw)

@see [Daily builds](</download/daily/bin/>)

## Running SWI-Prolog on MSYS2

A port of swi-prolog is available on MSYS2 and can be installed using
pacman:

  - install [MSYS2](https://www.msys2.org)
  - ``pacman -Syu``
  - ``pacman -Syu``
  - ``pacman -S mingw-w64-x86_64-swi-prolog``
  - ``swipl``
  - ``?- check_installation.``
