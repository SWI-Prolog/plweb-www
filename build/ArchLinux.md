# SWI-Prolog on Arch Linux

| Arch Linux release | rolling, March 14, 2026 |
| SWI-Prolog release | 10.0.x, 10.1.x |
| Package page | https://archlinux.org/packages/extra/x86_64/swi-prolog/ |
| Packager | Alexander Rødseth |

## Dependencies

These   dependencies  have   been  tested   using  the   Docker  image
[archlinux:base-devel](https://hub.docker.com/_/archlinux/)  with  the
following packages added to the base installation:

```
pacman -Syu \
	git cmake ninja \
	gperftools libarchive libxcrypt libyaml util-linux-libs \
	dk-openjdk java-hamcrest junit \
	python \
	db5.3 \
	unixodbc \
	sdl3 sdl3_image cairo pango
```

Arch Linux seems to have dropped `ossp-uuid`, which implies that UUID
support falls back to the slower partial pure Prolog implementation.
