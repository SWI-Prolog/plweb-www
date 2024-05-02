# ERROR: Encoding cannot represent character

SWI-Prolog is a Unicode application. This means all characters are
internally encoded as integers (0..0x10ffff) in a uniform space. This encoding
can represent any character in any language. Streams however are
sequences of bytes, i.e., sequences of integers in the range 0..255.
This implies some encoding is needed to represent Unicode characters.
Various encodings exist, some of which cannot represent all Unicode
characters. SWI-Prolog uses the default encoding of the platform on
which it runs. If it must write a character that does not fit in this
encoding it gives this error message.

There is no easy answer on what to do. Understanding international
character encoding issues is hard.  Luckily, more and more platforms
now use UTF-8 as default encoding.  If you need to deal with
characters of other scripts than the default language we advice to
check whether your OS can support UTF-8.

Regardless of the default _locale_, SWI-Prolog can be forced to use
UTF-8 using

    :- set_prolog_flag(encoding, utf8).

In addition, the encoding/1 _directive_ may be used to declare the
encoding of a source file regardless of the system encoding.  This
directive is supported by multiple Prolog systems.  Some require it to
be placed right at the beginning of the file (even comments are not
allowed to precede the directive).  In SWI-Prolog is may appear
anywhere in the file and a single file may change the encoding
multiple times.

@see [[Wide character support][</pldoc/man?section=widechars>]]
