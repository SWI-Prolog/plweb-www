# Where are SWI-Prolog.h and the library files?

``SWI-Prolog.h`` is in the include directory of the distribution. The
distribution is normally installed in ``C:\Program Files\swipl`` on
Windows and ``/usr[/local]/lib/swipl-<version>`` on Unix.  Also the
libraries are installed as part of the installation tree by default.
Some (Linux) distributions package SWI-Prolog with the include files
and libraries in shared locations, e.g., ``/usr/include`` and
``/usr/lib``.

There are three options for dealing with the complexity of finding
the include files and linking to the proper libraries

  1. Using ``swipl-ld``.  This is a compiler and linker front-end
     for the C and C++ compilers that adds the necessary flags to
	 find the include files and get the linking done.  In addition,
	 ``swipl-ld`` deals with combining Prolog code with the C and
	 C++ code to create a stand-alone executable.

  2. Using ``pkg-config``.   SWI-Prolog installs ``swipl.pc`` that
     allows getting the flags right.   For example

	 ```
	 pkg-config --libs swipl
     -L/usr/lib/swi-prolog/lib/x86_64-linux -lswipl
	 ```

  3. Using [cmake](https://cmake.org/).  SWI-Prolog provides
     ``swipl.cmake`` in in is distribution.   The location can
	 be found using the following shell command.

		 $(swipl --home)/cmake/swipl.cmake

     This file defines the cmake import target ``swipl::libswipl``
	 that may be added to your target to get the compiler and
	 linker flags correct.  If you compile an plugin that can
	 be loaded into SWI-Prolog you may call the following to
	 properly configure your target

		 target_link_swipl(target)

The preferred route depends on your overall project.  (2) and (3)
are mostly applicable when SWI-Prolog is embedded in a much larger
project.   (1) is more suitable for simple cases where you want to
use a simple C/C++ file as a plugin or embedded SWI-Prolog.

## Some notes in swipl-ld

To compile C/C++ objects you need to add the include subfolder to the
include directories of your compiler or you can use the ``swipl-ld``
utility.  The command below creates ``file.obj`` (Windows) or ``file.o``
(Unix), passing the proper include directory to the C-compiler. This
requires the SWI-Prolog programs to be available from the ``PATH``
environment variable.

```
swipl-ld -c file.c
```

To link C/C++ objects to a shared-object (DLL) you need to links against
swipl.lib on Windows. On ELF based Unix platforms (most today), you do
not need an import library. Often, it is much easier to let ``swipl-ld`` do the
job as in the command below, which creates file.dll or file.so depending
on the platform.

```
swipl-ld -shared -o file file.o
```

To embed SWI-Prolog in a C/C++ main program you need to link against
the swipl library on all platforms. Again, =|swipl-ld|= simplifies the
process.  The first command embeds the Prolog kernel in a C main
program and the second attaches a Prolog state to the result, creating
a stand-alone executable.

```
swipl-ld -o myexe -nostate file.o ...
swipl-ld -o myexe file.o ... file.pl ...
```

## Learning from swipl-ld.

If you don't want to use ``swipl-ld``, you can learn from it by adding the -v
option to the commandline, which causes the program to print the
commands it runs to do its job.


## Getting information on the SWI-Prolog configuration

You can get information on SWI-Prolog's configuration by running the
command below.  This emits several variables in POSIX `sh` format that
describe the system.

    swipl --dump-runtime-variables
