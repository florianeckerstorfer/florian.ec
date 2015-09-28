<?php

use Cocur\Slugify\Slugify;

require_once __DIR__.'/../../vendor/autoload.php';

if (empty($_SERVER['argv'][1])) {
    die("Usage: php new-article.php TITLE\n");
}

$slugify = new Slugify();
$title = $_SERVER['argv'][1];
$filename = sprintf('%s/../../source/_articles/%s-%s.md', __DIR__, date('Y-m-d'), $slugify->slugify($title), '.md');

$template = <<<EOF
---
title: "%s"
tags: []
---
{%% block summary %%}
{%% endblock %%}

{%% block content %%}
{%% endblock %%}
EOF;

file_put_contents($filename, sprintf($template, $title));

echo $filename;
