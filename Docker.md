# SWI-Prolog Docker images

[[docker.png;style="width:100px;float:right"][https://hub.docker.com]]
_|"[Docker](https://hub.docker.com) is an open platform for developers
and sysadmins to build, ship, and run distributed applications, whether
on laptops, data center VMs, or the cloud."|_ More technically, Docker
allows for creating a _Docker image_ that depends on the CPU (typically
AMD64) and the Linux kernel ABI. This image is self-contained and can
run unmodified on a wide variety of platforms, either natively (Linux),
using emulation (Windows Subsystem for Linux) or using a virtual machine
(Windows, MacOS). The Docker image is built from a recipe called the
*Dockerfile*. As this recipe is executed in the controlled Docker
environment its execution doesn't suffer from issues caused by an
incompatible OS, OS version or conflicting other applications.

So far the good news. There are of course a few catches. One is that
Docker images are relatively large as they include, beside the
application, all the OS pieces necessary to support the applications
such as its libraries, supporting executables, etc. The image runs
inside a _container_, which is good for security but complicates running
it as a normal executable on the desktop.

For short, *Docker is particularly suitable for deploying services*.
That is good for us as SWI-Prolog provides strong support for deployment
as a (network) service.  Docker images come in three flavours:

  $ Official Docker library images :
  Thanks to Dave Curylo, SWI-Prolog has been accepted as provider for
  official Docker library images.  The images are based on [Debian
  Bookworm](https://wiki.debian.org/DebianBookworm) and releases for
  both stable and development releases of SWI-Prolog.  See
  [the official repository](https://hub.docker.com/_/swipl/)
  for details.

  $ Automated build images :
  These are hosted on [Docker hub](https://hub.docker.com), but
  otherwise not checked in any way by Docker.  You can inspect
  the Dockerfile from which they are created though.  These
  recipes are generally short enough to understand.  We have
  an [organization](https://hub.docker.com/u/swipl/) were we
  currently host

    - [SWISH](https://hub.docker.com/r/swipl/swish/)
    - Its related [Rserve (R) backend](https://hub.docker.com/r/swipl/rserve/)

  $ Self-build images :
  Just copy a Dockerfile or start one from scratch (it is
  really easy) and build it, typically using

	docker build -t name .
