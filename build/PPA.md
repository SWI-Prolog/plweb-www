# Installing from PPA (Ubuntu Personal Package Archive)

There are PPAs for [SWI-Prolog
stable](https://launchpad.net/~swi-prolog/+archive/stable) and
[SWI-Prolog
development](https://launchpad.net/~swi-prolog/+archive/devel) based on
the official Debian packaging structure and corresponding SWI-Prolog
release. This PPA version can be installed using the commands below in
Ubuntu linux.  The ``.deb`` package may run on some closely related
Linux distributions.  Otherwise either use the (often outdated) package
from our distribution, [compile from source](</build/>) or using the [SNAP](<snap.html>)
version.

These PPAs are updated with every new release. Thanks to Yves Raimond
for setting up the PPA snd Eugeniy Meshcheryakov for creating the Debian
configuration. The PPA is registered using `apt-add-repository`, which
is by default available on desktops, but not on servers or Linux
containers. It is installed using:

    % sudo apt-get install software-properties-common

## Stable versions

    % sudo apt-add-repository ppa:swi-prolog/stable
    % sudo apt-get update
    % sudo apt-get install swi-prolog

## Development versions

    % sudo apt-add-repository ppa:swi-prolog/devel
    % sudo apt-get update
    % sudo apt-get install swi-prolog

## Installing debug symbols

If Prolog crashes and notably for debugging crashes when you embed
SWI-Prolog or add foreign extensions, it is useful to have the _debug
symbols_. Please install the debug symbols if you encounter a
reproducible crash and include the stack trace in the bug report.


As of versions 8.4.3/8.5.13 these are available. To install these, edit
``/etc/apt/sources.list.d/swi-prolog-ubuntu-<version>.list``, duplicate
the `deb` line and add ``/debug``. The file now may look like this (for
the _stable_ version on Ubuntu 22.04 (jammy)).

```
deb https://ppa.launchpadcontent.net/swi-prolog/stable/ubuntu/ jammy main
deb https://ppa.launchpadcontent.net/swi-prolog/stable/ubuntu/ jammy main/debug
```

Next, run these commands to get the debug symbols of the core Prolog
system. The ``-dbgsym` packages are also available for the various
additional packages.

    % sudo apt update
    % sudo apt install swi-prolog-nox-dbgsym
