# Is there a true C++ binding?

The core API for SWI-Prolog is C.  SWI-Prolog ships with a C++
header-only interface.  The interface is documented in [A C++
interface to SWI-Prolog (Version 2)](</pldoc/man?section=cpp2>)

The C++ interface is a little easier to handle than the plain C
interface as it automatically deals with type conversion and
exceptions in both directions.
