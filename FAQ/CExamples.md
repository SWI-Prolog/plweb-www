# Where do I find examples mixing C and Prolog?

The best source of examples are the sources of the _packages_.  They
vary from very simple to highly complicated.  You can examine the
packages at [[GitHub][<gitweb:>]].  Good examples
packages are:

  - [nlp](<gitweb:packages-nlp.git>) <br>
    Rather basic usage of the foreign interface.

  - [clib](<gitweb:packages-clib.git>) <br>
  Both simple and more complicated code to access OS primitives.

  - [zlib](<gitweb:packages-zlib.git>) <br>
  Extensive example of using the stream interface to define IO filters.

You may also want to look at the Prolog source itself.  Many of the
foreign predicates use the public interface.  Some use more low-level
primitives.

@see Please also check out the [[C++ interface][</pldoc/man?section=cpp2>]]
