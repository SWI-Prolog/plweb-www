# Controlling colored output on the terminal

By default, SWI-Prolog will use colored output on the commandline
based on library(ansi_term) if the `current_output` stream is
connected to a terminal.  This is detected by the `tty` property of
streams (see stream_property/2).  Coloring can be controlled in two
ways

 - It can be disabled using this in your personal initialization file (see
   below).

       :- set_prolog_flag(color_term, false).

 - Colors can be changed by message type (see print_message/2) using the
   hook message_property/2.

## Dark mode

Color themes are defined in the `theme` subdirectory of the library.
These control both color handling in the console and the xpce based
IDE tools such as PceEmacs.  The system ships with two themes:

  - dark <br>
    Self explanatory
  - auto <br>
    Try to fetch the colors from the attached console and select
	`dark` if this seems more applicable.   Note that not all
	console applications are capable of exposing their color
	scheme.  See ansi_get_color/2.

New themes can be added, for example to your [personal
library](PersonalLibrary.md).  The easiest way to define a new theme
is by cloning the `dark` theme.

@see PlInitialisation.md for editing your personal init file.
