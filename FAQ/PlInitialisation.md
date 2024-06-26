# Site and personal initialisation files

On startup, SWI-Prolog reads both site initialisation and personal
initialisation files. Both can be controlled explicitly using
commandline options (*|-F base|* for site, and *|-f base|* for personal
initialisation).

The site-initialisation file is located in the SWI-Prolog home
directory. Its name is deduced from the commandname by taking the
leading alphanumerical characters, followed by the extension =|.rc|=.
Using default installation this implies *|swipl.rc|* for the Unix version
and *|swipl-win.rc|* for the Windows GUI version.

The personal initialisation file depends on version and OS:

  - 8.1 and later <br>
    The file is called `init.pl` and resides in a directory
    `swi-prolog` below the the [XDG](https://wiki.archlinux.org/index.php/XDG_Base_Directory)
	config home.  On Unix the default XDG config home is ``~/.config``.  On Windows it
    is the directory provided by win_folder/2 on `appdata`.

    These files are available using the file_search_path/2 alias
    `user_app_config` as well as the deprecated aliases
    `user_profile` and `app_preferences`

  - Up to 8.0 <br>
    The file is named ``.swiplrc`` on Unix (``.plrc`` for really old
    versions) and ``swipl.ini`` on Windows (``pl.ini`` for really old
    versions).  The file resides in the user's home (Unix) or in the
    ``appdata`` directory (Windows).

    These files are available using the file_search_path/2 alias
    `user_profile`.

In __plwin.exe__, the personal initialisation file is accessible through
the __Settings menu__. On first use, it copies a default file with some
commented commonly used customization options. The same behaviour is
also available from the PceEmacs menu __Edit/Prolog preferences__.

@see [Using a personal library](PersonalLibrary.md)
