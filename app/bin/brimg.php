<?php

if ($_SERVER['argc'] < 3 || $_SERVER['argc'] > 4) {
    exit("Usage: brimg.php INPUT_DIR OUTPUT_DIR [CONFIG_FILE]\n");
}

$input = $_SERVER['argv'][1];
$output = $_SERVER['argv'][2];

$configFile = isset($_SERVER['argv'][3]) ? $_SERVER['argv'][3] : 'brimg.json';

if (!file_exists($configFile)) {
    exit("Config file \"".$configFile."\" does not exist.\n");
}

if (!file_exists($output)) {
    mkdir($output);
}

$config = json_decode(file_get_contents($configFile), true);
$generateAll = isset($config['generate-all']) ? $config['generate-all'] : true;

foreach (new DirectoryIterator($input) as $fileInfo) {
    if(in_array($fileInfo->getExtension(), [ 'jpg', 'jpeg', 'png', 'gif' ])) {
        $imageName = getImageName($fileInfo);
        foreach ($config['sizes'] as $size) {
            $outputFile = sprintf(
                '%s/%s%s-%s%s.%s',
                $output,
                isset($size['prefix']) ? $size['prefix'] : '',
                $imageName,
                $size['name'],
                isset($size['suffix']) ? $size['suffix'] : '',
                $fileInfo->getExtension()
            );
            if ($generateAll || !file_exists($outputFile)) {
                exec(sprintf(
                    'gm convert -resize %s %s %s',
                    $size['width'],
                    $fileInfo->getPathname(),
                    $outputFile
                ));
            }
        }
    }
}

/**
 * @param SplFileInfo $fileInfo
 *
 * @return string Name of file without path and extension.
 */
function getImageName(\SplFileInfo $fileInfo)
{
    return str_replace('.'.$fileInfo->getExtension(), '', $fileInfo->getBasename());
}
