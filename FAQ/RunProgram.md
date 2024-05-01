# How do I run a program?

The simplest way to run a program is by the initialization/2 directive
in combination with library(main).  The library(main) provides a default
entry point main/0 to run a program non-interactively.  It also provides
for parsing commandline options using argv_options/3.

See library(main) for details.   After defining the Prolog source file
according to the library(main), the program may be executed as

    swipl [prolog option ...] myprog.pl [application option ...]

If you want to load the program rather than executing it you can use

    swipl -l myprog.pl -- [application option ...]

After this, the program may be edited using edit/0 or edit/1, reloaded
using make/0 and executed interactively by calling

    ?- main.

To trace the execution using the source level debugger, use

    ?- gtrace, main.

On POSIX systems, the script can be turned into an executable by starting
the file with the "hash-bang" line below and making it executable using `chmod +x myprog`

    #!/usr/bin/env swipl

Note that a script that starts with ``#!`` does not need to have the
``.pl`` extension to be recognized as a Prolog source file.

@see App.md for adding apps to SWI-Prolog
