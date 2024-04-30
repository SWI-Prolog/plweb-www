# SWI-Prolog copyright

As of version 7.3.33,  SWI-Prolog  is   covered  by  the  Simplified BSD
license:

--

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions
are met:

  1. Redistributions of source code must retain the above copyright
     notice, this list of conditions and the following disclaimer.

  2. Redistributions in binary form must reproduce the above copyright
     notice, this list of conditions and the following disclaimer in
     the documentation and/or other materials provided with the
     distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
POSSIBILITY OF SUCH DAMAGE.

--

## Possible additional license requirements

Note that SWI-Prolog may be linked with libraries covered by more
restrictive license and therefore the above conditions may not suffice
for a particular version of SWI-Prolog or a program loaded into
SWI-Prolog. Run the following predicate to find which components with
additional requirements are loaded into a particular version.

  ```
  ?- license.
  ```

### GMP

The only non-BSD component in the __core   system__  is the __LGPL__ GNU
library [GMP](https://gmplib.org/) which provides   unbounded  integers,
rational numbers and good  random  numbers   to  SWI-Prolog.  GMP can be
disabled using

    cmake -DUSE_GMP=OFF [more options]

Note that LGPL components do not  affect   the  license of SWI-Prolog or
applications running on  top  of  them.   However,  end  users  of  your
application must be able to replace  the   LGPL  component. See the LGPL
license for details.

### Libreadline

From the standard packages, only   `library(readline)` is realised using
the                           __GPL__                            library
[libreadline](https://tiswww.case.edu/php/chet/readline/rltop.html).
This library provides command line  editing   on  POSIX  systems (MacOS,
Linux, etc.). Since the migration to  BSD,   the  default line editor is
based on the BSD [editline (libedit)](https://www.thrysoee.dk/editline/)
library. End user applications generally do   not  require a commandline
editor and are thus normally not affected. Unlike the GMP library above,
the commandline editors are loaded explictly   at  runtime and therefore
the system does not need to be recompiled to remove these components.
