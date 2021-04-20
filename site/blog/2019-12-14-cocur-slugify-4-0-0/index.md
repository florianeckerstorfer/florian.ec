---
permalink: blog/cocur-slugify-4-0-0/
title: cocur/slugify v4.0.0 released
date: 2019-12-14
tags: [cocur, php]
category: Development
description: Announcing a new major version of my library `cocur/slugify`.
---

Today we finally released [Version 4.0.0](https://github.com/cocur/slugify/releases/tag/v4.0.0) of [cocur/slugify](https://github.com/cocur/slugify) it does not introduce new major features, but adds support for Symfony 4 and 5, Twig 3 and, most importantly, PHP 7.3 and 7.4. Support for PHP 5, Twig 1 and Silex is dropped.

Thanks to everyone who contributed to this release: [bartko-s](https://github.com/bartko-s), [mhujer](https://github.com/mhujer), [kubawerlos](https://github.com/kubawerlos), [FabienPapet](https://github.com/FabienPapet), [snapshotpl](https://github.com/snapshotpl) and [franmomu](https://github.com/franmomu).

As usual, you can install cocur/slugify using Composer:

```bash
composer require cocur/slugify
```

Here are the full release notes:

- [#230](https://github.com/cocur/slugify/pull/230) Add Slovak rules (by [bartko-s](https://github.com/bartko-s))
- [#236](https://github.com/cocur/slugify/pull/236) Make Twig Bridge compatible with Twig 3.0 (by [mhujer](https://github.com/mhujer))
- [#237](https://github.com/cocur/slugify/pull/237) Fix Travis CI configuration (by [kubawerlos](https://github.com/kubawerlos))
- [#238](https://github.com/cocur/slugify/pull/238) Drop Twig 1 support (by [FabienPapet](https://github.com/FabienPapet))
- [#239](https://github.com/cocur/slugify/pull/239) Fix AppVeyor (by [kubawerlos](https://github.com/kubawerlos))
- [#241](https://github.com/cocur/slugify/pull/241) Update .gitattributes (by [kubawerlos](https://github.com/kubawerlos))
- [#242](https://github.com/cocur/slugify/pull/242) Add PHP CS Fixer (by [kubawerlos](https://github.com/kubawerlos))
- [#243](https://github.com/cocur/slugify/pull/243) Normalize composer.json (by [kubawerlos](https://github.com/kubawerlos))
- [#246](https://github.com/cocur/slugify/pull/246) Add support for PHP 7.3 and 7.4 (by [snapshotpl](https://github.com/snapshotpl))
- [#247](https://github.com/cocur/slugify/pull/247) AppVeyor improvements (by [kubawerlos](https://github.com/kubawerlos))
- [#249](https://github.com/cocur/slugify/pull/249) PHPUnit annotations should be a FQCNs including a root namespace (by [kubawerlos](https://github.com/kubawerlos))
- [#250](https://github.com/cocur/slugify/pull/250) Add support for Symfony 4 and 5 (by [franmomu](https://github.com/franmomu))
- [#251](https://github.com/cocur/slugify/pull/251) Dropping support for PHP 5 (by [franmomu](https://github.com/franmomu))
- [#253](https://github.com/cocur/slugify/pull/253) Add conflict for unmaintained Symfony versions (by [franmomu](https://github.com/franmomu))
