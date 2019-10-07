Place the personal init file in a common place on all operating systems.
This directory is located in one of the directories below and names
`swi-prolog`

 - Windows: CSIDL directory CSIDL_APPDATA (see win_folder/2)
 - Otherwise
   - $XDG_CONFIG_HOME
   - $HOME/.config

 In this directory we find:

 - init.pl (previously .swiplrc or swipl.ini (Windows) <br>
   Personal initialization file
 - lib (previously ~/lib/prolog) <br>
   Personal library
 - pack (previously ~/lib/swipl/pack) <br>
   Installed add-ons.
 - xpce (previously ~/.xpce) <br>
   Directory holding xpce application data

If you use multiple versions we suggest  to create the new hierarchy and
make symbolic links from the old locations.   Windows users will have to
live with copies.

@see https://swi-prolog.discourse.group/t/new-config-file-structure/1360/1
