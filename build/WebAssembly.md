# Building SWI-Prolog using Emscripten for WebAssembly (WASM)

As  of  version  8.1.2,  building  an executable  for  WASM  is  fully
supported by the standard build process.  The initial port is the work
of  Raivo  Laanemets.   Currently  Jesse  Wright  is  most  active  in
maintaining  the  port.  Jesse  maintains  the  npm build  process  on
[github](https://github.com/SWI-Prolog/npm-swipl-wasm).

(Infrequent) status updates and various hints on using the WASM version
are on [this Discourse wiki page](https://swi-prolog.discourse.group/t/swi-prolog-in-the-browser-using-wasm/5650/1)

The  remainder of  this  page  guides you  through  building the  WASM
version yourself.


## Preparation

You need to  download the Emscripten compiler.  Follow the instruction
on                                                                 its
[homepage](http://kripken.github.io/emscripten-site/docs/getting_started/downloads.html).

After the successful installation load the Emscripten environment into
the current terminal session (adjust path):

    source ./emsdk_env.sh

We  currently (May  3, 2023)  use version  3.1.37 of  Emscripten.  The
build  process also  requires [Node.js](https://nodejs.org/).   Recent
versions  of Emscripten  require recent  version of  Node.js.  We  use
v18.16.   We build  using the  [ninja](https://ninja-build.org/) build
tool.  This is not necessary, but speeds up the build considerably.

The build process assumes

  - A directory `~/wasm` for the Emscripten tools and dependencies
  - Emscripten installed in `~/wasm/emsdk`.  We installed from the
    git at https://github.com/emscripten-core/emsdk.git.  That
	allows to switch versions easily.
  - SWI-Prolog sources, typically [from git](https://github.com/SWI-Prolog/swipl-devel)


## Dependencies

We need several  dependencies.  [zlib](https://zlib.net/) is required,
the others  are optional.  We  install the dependencies  with _prefix_
`~/wasm` We assume running the commands from `~/wasm`.  We also assume
you  setup the  environment  from Emscripten  as  described above,  so
`emcc` is in our `$PATH`.

### Installing zlib

This is __mandatory__

    wget https://zlib.net/zlib-1.2.13.tar.gz
    tar -xf "zlib-1.2.13.tar.gz"
    cd zlib-1.2.13
    emconfigure ./configure --static --prefix=$HOME/wasm
    emmake make
	emmake make install

### Installing pcre

The  [pcre](https://www.pcre.org/)   library  adds   _Perl  Compatible
Regular Expressions_ to the WASM version.  This is __optional__.

    git clone https://github.com/PCRE2Project/pcre2
	cd pcre2
	git checkout pcre2-10.42
	emcmake cmake -DCMAKE_INSTALL_PREFIX=$HOME/wasm -DPCRE2GREP_SUPPORT_JIT=OFF -G Ninja ..
	ninja
	ninja install

### Installing GMPlib

The  [GMP](https://gmplib.org/)  library  brings  unbounded  integers,
rational numbers and good random  numbers to SWI-Prolog.  The price is
its size and for  some users the LGPL license.  As  all code is linked
statically this effectively makes  the resulting system LGPL.  Without
GMP,     the      build     falls     back     to      the     bundled
[LibBF](https://bellard.org/libbf/) by Fabrice Bellard.  This provides
all the same functionality thanks to a compatibility wrapper developed
by Jan Wielemaker  and Rick Workman.  Notably  performance on rational
number arithmetic is considerably worse though.  But, the LibBF verion
is smaller and causes all code  to be covered by _permissive_ licenses
(MIT, BSD, Apache).   This is __optional__

    wget https://gmplib.org/download/gmp/gmp-6.1.2.tar.lz
	tar xf gmp-6.1.2.tar.lz
	cd gmp-6.1.2
	emconfigure ./configure --disable-assembly --prefix=${HOME}/wasm
	make -j
	make install


### Sources

The  Emscripten/WASM  build  is   fully  supported  from  the  default
SWI-Prolog sources.  You find the  WASM specific code in the directory
`src/wasm` of the source tree.   This contains the JavaScript wrapper,
several examples and a Prolog web server for the examples.


## Building

Go to  where you downloaded  the `swipl-devel` source tree.   Create a
build directory:

    mkdir build.wasm
	cd build.wasm

Now, create a script `configure` with this content (adjust as required):

```
WASM_HOME=$HOME/wasm
source $WASM_HOME/emsdk/emsdk_env.sh
TOOLCHAIN=$EMSDK/upstream/emscripten/cmake/Modules/Platform/Emscripten.cmake
[ -f $TOOLCHAIN ] || echo "Could not find emscripten toolchain"

cmake -DCMAKE_TOOLCHAIN_FILE=$TOOLCHAIN \
      -DCMAKE_BUILD_TYPE=Release \
	  -DCMAKE_FIND_ROOT_PATH=$HOME/wasm \
	  -DINSTALL_DOCUMENTATION=OFF \
	  -G Ninja ..
```

Now configure and build the system using these commands

    bash configure
	ninja

Optionally you may test the system  by running the command below.  The
`-j 8` are the number of tests run in paralel.  Choosing the number of
cores of your system is a good start.

	ctest -j 8


## Run the system

You  can  run the  commandline  SWI-Prolog  with  full access  to  the
filesystem using the command below (from the `build.wasm` directory).

    node src/swipl.js

The build products for deployment are  in `src`.  You can run the demo
with a native SWI-Prolog using

    swipl ../src/wasm/server.pl [--port=8080]

Now open the URL that is printed  in your browser.  You should get the
same as https://dev.swi-prolog.org/wasm/

---
@see https://github.com/SWI-Prolog/npm-swipl-wasm
@see https://swi-prolog.discourse.group/t/swi-prolog-in-the-browser-using-wasm/5650/1
