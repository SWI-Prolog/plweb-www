# Creating a Windows console application from SWI-Prolog

If you want to use a SWI-Prolog program as a stand-alone ``.exe``, you can
do this using qsave_program/2 or using the commandline. The command
below creates ``myapp.exe`` from ``load.pl``.   The preferred way to
start the program is by using the initialization/2 _directive_ as
also described in RunProgram.md.

```
swipl.exe -o myapp.exe -c load.pl
```

To run, ``myapp.exe`` requires ``.dll`` files from the SWI-Prolog's
``bin`` directory.  To find these, the Windows version provides
win_process_modules/1.  This predicate returns a list of all DLLs
loaded into the process. This includes the DLLs needed to run
SWI-Prolog, the DLLs used by the loaded extensions and the standard
Windows DLLs. You can now copy all DLL files reported by
win_process_modules/1 that are part of the SWI-Prolog
distribution. The Prolog flag `home` provides access to the root of
the distribution hierarchy.

The required ``.dll`` files must be installed in the same directory as
the executable.

@see In many cases, it is way easier to start an application [from the
Prolog source](<RunProgram.html>).
