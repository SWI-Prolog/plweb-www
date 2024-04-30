# Creating a Windows console application from SWI-Prolog

If you want to use a SWI-Prolog program as a stand-alone ``.exe``, you can
do this using qsave_program/2 or using the commandline. The command
below creates ``myapp.exe`` from ``load.pl`` and makes the program start at
main/0

```
swipl.exe -o myapp.exe -c load.pl --goal=main
```

To run, ``myapp.exe`` requires ``.dll`` files from the installation's
``bin`` directory. The required ``.dll`` files are listed below. Note that
the details may depend on the version and installation. Notably
``libdwarf.dll`` may not be present and the others may have a different
version.

  - ``libgcc_s_seh-1.dll``
  - ``libgmp-10.dll``
  - ``libswipl.dll``
  - ``libwinpthread-1.dll``
  - ``zlib1.dll``

Your application may depend on additional ``.dll`` files loaded through
use_foreign_library/1. You can find these with current_foreign_library/2.

Recent versions provide win_process_modules/1 which returns a list of
all DLLs loaded into the process. This includes an up-to-date version
fror your installation of the list above, the DLLs used by the loaded
extensions and the standard Windows DLLs. You can now copy all DLL files
reported by win_process_modules/1 that are part of the SWI-Prolog
distribution. The Prolog flag `home` provides access to the root of the
distribution hierarchy.

The required ``.dll`` files must be installed in the same directory as
the executable or in a directory available through ``%PATH%``.

@see In many cases, it is way easier to start an application [from the
Prolog source](<PrologScript.html>).
