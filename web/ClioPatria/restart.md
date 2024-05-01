---+ Restarting from scratch: where is the data kept?

Data is kept in the files described below. Each of these can be removed,
but removing does not take effect until the server is restarted.  Except
for =|settings.db|=, the names of these resources may have been changed
in the settings.

    $ settings.db :
    This keeps settings that do not have their default value. You can
    freely edit this file if the server is not running. Note that the
    settings can change the locations of the items below.

    $ users.db :
    This keeps the registered users and their permissions. You can
    freely edit this file if the server is not running. Passwords are
    stored as MD5-hashes.

    $ RDF-store :
    This directory holds backup of the RDF data. Each named-graph is
    represented by two (optional) files. The base of this file is an
    encoded version of the graph-name. The extensions are =trp= for
    quick-load snapshots and =jrn= for _journal_ files. See the
    SWI-Prolog [[Semantic Web
    package][http://www.swi-prolog.org/packages/semweb.html]] for
    details. You can freely remove a graph by removing both files if the
    server is not running. Similar, you can remove the journal to
    restore a graph to its initial state after loading it from the
    source-data.

    $ httpd.log :
    Keeps a log of HTTP interactions. It is enabled by linking or
    copying cliopatria('examples/conf.d/logging.pl') into =|conf.d|=.
    Note that on heavily loaded servers this can be a significant
    slow-down and the file can become huge.

    On Unix systems, this file can be moved or removed at any time. The
    server will start a new log-file. On Windows this will give a
    sharing violation.

