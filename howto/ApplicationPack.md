# Using packs for a specific application

[Packs](Pack.md) are normally installed using the `pack` _app_.  By
default they are installed for the current user.  Alternatively they
can be installed system-wide using the ``--global`` option:

    swipl pack install --global <from>

Using packs that are installed independently from the application your
are working on has several drawbacks:

  - It makes it harder to install your application elsewhere.
  - If you have multiple applications, they may depend on different
    versions of a pack.

While using global and per user add-ons has been popular with many
languages, modern environments often (also) provides more fine grained
control over add-ons.  For example, Python provides _virtual
environments_ and Node installs dependencies defined in `package.json`
in a local directory `node_modules`.

SWI-Prolog allows installing packs in a designated directory using

    swipl pack install --dir=<my-pack-dir> <spec>

Given a directory holding the packs for your application, your
application may use the packs from there using attach_packs/2.  For
example, after installing all packs in a local directory `packs`,
your application may use its dependencies from `packs` using the
directive below.  The option replace(true) makes it look __only__ for
packs in `packs`.  See attach_packs/2 for its option to control the
search and deal with possible conflicts.

```
:- attach_packs(packs, [replace(true)]).
```

Summarising, you can use local packs (say pack __a__ and packs __b__
and their dependencies by adding the above directive to your source
code and initializing `packs` as

```
mkdir packs
swipl pack install --dir=packs a b
```

## Using git

An even better controlled environment can be created if the packs on
which you rely are available in git repositories and you use git for
your application version management.   In that case, we can add the
required packs as _git submodules_.  For example

```
git submodule add https://github.com/<owner>/<pack>.git packs/<pack>
...
```

Now we can use git to manage the exact version we use and download
our dependencies using

    git submodule update --init

If the pack contains foreign components for which no binaries are
included it must be built.  As of SWI-Prolog 9.3.18/9.2.10, this
can be achieved using the command below.

    swipl pack rebuild --dir=packs

Older versions can only achieve this from Prolog by calling
attach_packs/2 as above and pack_rebuild/0,1.  This can be done from
the command line

    swipl -g "attach_packs(packs,[replace(true)])" -g pack_rebuild -t halt
