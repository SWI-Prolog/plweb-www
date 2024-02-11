# Issues with library(janus)

The library(janus)  allows embedding Python into  Prolog.  The package
source is in `packages/swipy`.  This directory can also be compiled as
a Python package to embed SWI-Prolog into Python, providing the Python
package `janus_swi`.

## Consequences

The library is not used by any of the other system components and is thus
only necessary if your application requires it.

## Solutions

When building from  source, the library requires  the Python embedding
libraries.  On Debian Linux systems these are provided by

    sudo  apt-get install python3 libpython3-dev

On MacOS  and Windows the libraries  and header files are  provided as
part of the Python installer.

@see https://github.com/SWI-Prolog/packages-swipy
