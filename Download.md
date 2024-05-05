# SWI-Prolog downloads

    * [[Development release][</download/devel>]] [[star.gif]]
    * [[Stable release][</download/stable>]]
    * [Daily builds for Windows](</download/daily/bin>)
    * Browse GIT [repository](https://github.com/SWI-Prolog)

## Available download channels

The __development__ version is released roughly every two to four
weeks.  It is typically robust, provides the latest features and
possible issues are resolved quickly.  This is the recommended version
for most users.

The __stable__ release is infrequently updated.  After an update, the
stable version receives only critical patches that are extremely
unlikely to break source or binary compatibility.  The stable versions
are intended for deploying systems or other use cases that require a
fully predictable installation.

The __daily__ releases for Windows allow users of the Windows version
to get access to the latest features or bug fixes.   Users of
other platforms that want or need to stay this close to the daily
development are requested to use the __GIT__ sources.

The __GIT__ repository
[swipl-devel.git](https://github.com/SWI-Prolog/swipl-devel.git)
provides up-to-date access to the sources.  Using the GIT repository
is recommended if you want to stay up to date and expecially if you
plan to develop C/C++ resources for SWI-Prolog.
See the [build instructions](</build/>).

## Announcements and get the "latest" version

New releases are announced on
[Discourse](https://swi-prolog.discourse.group/c/releases).

Scripts that wish information on the latest version can run an HTTP
GET on
https://github.com/SWI-Prolog/download/devel/swipl-latest.tar.gz
(development channel) or
https://github.com/SWI-Prolog/download/stable/swipl-latest.tar.gz
(stable channel).   These URLs reply with an HTTP _redirect_ to the
latest release tar archives.


## Read more about

    * Available SWI-Prolog [versions](<versions.md>)
    * Information on [Linux packages and building on Linux](<build/unix.html>)
