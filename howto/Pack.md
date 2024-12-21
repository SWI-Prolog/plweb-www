# Creating and submitting extension packages for SWI-Prolog

## What is a pack?

A pack is a community contributed extension.  Packs provide additional
Prolog libraries, often including _foreign_ (C,C++) libraries.  A pack
can be installed system-wide, user-wide or as part of a [specific
application](ApplicationPack.md).  SWI-Prolog searches for packs in
sub-directories of directories in the _file search path_ (see
file_search_path/2) `pack`.  Each pack is a directory that (minimally)
contains, two items:

  - A subdirectory ``prolog`` <br>
  If the pack is installed, this directory is added to the Prolog
  library.  This directory contains Prolog files using the extension
  =|.pl|=.

  - A file ``pack.pl`` <br>
  This file provides [meta-data](PackInfo.md) for the pack.

Packs that use _foreign_ code (C,C++) is [described
here](ForeignPack.md).

## How do I install a pack?

After finding a suitable pack, usually from SWI-Prolog web site
[listed here](http://localhost:3040/pack/list), it may be installed
from the command line using the `pack` _app_:

    swipl pack install <pack>

The `pack` _app_ provides many commands for managing packs.  Use
the command below for help

    swipl pack --help

A few common commands are:

    - ``swipl pack search <pattern>`` <br>
	  Find published packs by name.
    - ``swipl pack install <from>`` <br>
	  Install a pack from its name, URL, archive file or directory.
    - ``swipl pack remove <pack>`` <br>
	  Remove a pack.
    - ``swipl pack list --installed`` <br>
      List installed packages and their update status.
    - ``swipl pack info <pack>`` <br>
	  List details on a specific pack.

All these commands are also available as Prolog predicates from the
library(prolog_pack).  See for example pack_install/1,2

## Creating a pack

A pack is created by creating a directory with the name of the pack
and filling it with the content described above.  For local testing,
the pack can be installed from the directory using the command below.
On systems that support it, this creates a _symbolic link_.  On other
systems the directory is copied to one of the directories where packs
are searched.  After that, possible foreign extensions are built and
the pack is made available.

    swipl pack install .

## Publishing a pack

A pack can be published in two ways: as a link to a GIT repository or
by creating an _archive_ file.  We recommend using a __GIT
repository__ on e.g., [github](https://github.com) or
[gitlab](https://about.gitlab.com).  Using a git repository provides a
stable download location as well as easy tracking of changes and
releasing versions.  ``swipl pack install`` can be asked to install at
a specific _tag_ or _commit hash_, providing precise version control
to the user.

When using an __archive file__, this file is either a
_|gzipped tar|_ file or a _zip_ file that must be named
<pack>-<version>.tgz or <pack>-<version>.zip, where version is a list
of digits, separated by dots (.).  For example:

    % tar zcvf mypack-1.0.tgz mypack

or

    % zip -r mypack-1.0.zip mypack

For _downloading from their registered name_, the pack must be hosted
on a public web server.  To support package upgrading, the HTTP server
must have enabled fetching an index of the directory. I.e., if the
pack is located at
https://www.example.com/swi-prolog/pack/mypack-1.0.tgz, fetching
https://www.example.com/swi-prolog/pack/ must return an HTML document
with links to available package files.   Although not yet enforced,
we strongly advice to use __https__ for security.

### Registering the pack

Once the pack is available from a public location, it may registered with
the [package list](https://www.swi-prolog.org/pack/list) using

    swipl pack publish <url>

This will

  1. Download the pack to a temporary directory
  2. Build and test it (if needed)
  3. Establish the _meta data_
  4. Register the pack.

### Updating a pack

To update a pack

  1. Update the version in the ``pack.pl`` meta data
  2. For a __git repository__
     - Commit the final changes
     - Tag the repository using V<version> (see ``git tag``).  It is strongly recommended to _sign_ the version tag.
     - Push the result (including the tag)
     - Use ``swipl pack publish <url>``
  3. For a __file__
     - Create a new archive following the naming conventions above (<pack>-<version>.tgz or <pack>-<version>.zip)
     - Upload it to the same directory as the previous version
     - Use ``swipl pack publish <url>``

#### Moving a pack

Once registered, packs cannot be moved to a different location.  This
implies that if you have exclusive control of the git repository or
directory holding the archives, nobody can hijack your pack.  If there
is a need to move the pack anyway, contact the site administrator.


## Dos and Don'ts

To make packages work smoothly, package submitters need to take care
of some rules:

  - Use a meaningful name for your package that is not likely to
    conflict.  Check https://www.swi-prolog.org/pack/list to verify
    there is no name conflict.

  - All files in the `prolog` directory __must__ be Prolog __module__ files.
    Use names for the module files that are not likely to conflict with
    others.  For example, __do not use `util`__ as file or module name.

  - Use consistent version numbers (e.g. 0.1, 0.2 ..., 1.0).  Versions
    are compared by turning the version id into a list of integers that
    is compared using compare/3.  Make sure that the version in
    =|pack.pl|= matches the version encoded in the archive name.

  - If you messed up, fix it and *always increment the version number*.
    Uploading a new file with the same name/version is interpreted as a
    possible security breach by the pack system.

@see PackInfo.md for a description of =|pack.pl|=
@see ForeignPack.md for creating packs with C or C++ code
@see [[list of submitted packages][</pack/list>]]
@see library(prolog_pack) for predicates to query, install and remove packs
@see [[Status and TODO][PackTodo.md]]
@see http://rlaanemets.com/post/show/prolog-pack-development-experience for some experience and best practices
