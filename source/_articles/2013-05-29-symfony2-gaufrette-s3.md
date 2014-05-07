---
title: Upload files to Amazon S3 with Symfony2 and Gaufrette
tags: [ aws s3, symfony2, gaufrette, php ]
---

Often it can be a little bit tricky to upload files to a web server and things become even more complicated when you want to store the uploaded files on Amazon S3. In this article I am going to explain how you can use Gaufrette to upload photos to S3 from a Symfony2 application.

I will use three different libraries in this article: [Gaufrette](https://github.com/knplabs/Gaufrette), [KnpGaufretteBundle](https://github.com/KnpLabs/KnpGaufretteBundle) and [AWS SDK for PHP](https://github.com/aws/aws-sdk-php). Gaufrette is an abstraction layer for filesystems. That is, it offers a transparent interface to various types of filesystems, like a local filesystem, FTP, Dropbox, S3 and many others. The library is integrated into Symfony2 by KnpGaufretteBundle which makes it easy to setup and configure Gaufrette. Gaufrette requires the AWS SDK for communication with the S3 service.

### Installation

Installation is easy if you use [Composer](http://getcomposer.org), we have to add `knplabs/gaufrette`, `knplabs/knp-gaufrette-bundle` and `amazonwebservices/aws-sdk-for-php` to `composer.json`.

<pre><code class="json">{
    "require": {
        "knplabs/gaufrette":                    "dev-master",
        "knplabs/knp-gaufrette-bundle":         "dev-master",
        "amazonwebservices/aws-sdk-for-php":    "dev-master",
    }
}</code></pre>

Using Composer's command line utitility we download the dependencies:

<pre><code class="bash">$ composer update</code></pre>

As a last step we need to add KnpGaufretteBundle to our applications `app/AppKernel.php`:

<pre><code class="php">new Knp\Bundle\GaufretteBundle\KnpGaufretteBundle()</code></pre>

### Setup Amazon S3

Before we can upload files to S3 we first have to setup S3 accordingly. This is possible in the [AWS Management Console](https://console.aws.amazon.com). We want to store all files uploaded from our application in a bucket we first have to create a new bucket for our application. After creating a new bucket we select the `Properties` tab in the top right. Since our files should be accessible for everyone we add a *Bucket Policy*. We select *Permissions* in the right view and click *Add bucket policy*. The following policy allows everyone to view the files in the bucket. You need to change the name of your bucket (I called mine `braincrafted.com`).

<pre class="json"><code>{
    "Version": "2008-10-17",
    "Statement": [
        {
            "Sid": "AddPerm",
            "Effect": "Allow",
            "Principal": {
                "AWS": "*"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::braincrafted.com/*"
        }
    ]
}</code></pre>

We also need to activate *Static Website Hosting*. To activate this we select *Enable website hosting* and enter the name of an index and an error document. The documents don't have to exist, but the fields are required.

You can test if your bucket works by using the AWS Console to upload an file to your bucket. The public URL of your bucket can also be found in the *Static Website Hosting* section of the *Properties* tab. It should look like this:

<pre><code>http://BUCKET_NAME.s3-website-us-east-1.amazonaws.com</code></pre>

If you have created your bucket in a different region the URL will be slightly different.

When you click your name in the very top you will find a link to *Security Credentials*. On this page you find your *Access Keys* and you will need those in a second.

### Configure Gaufrette

We can now start by configuring Gaufrette. First we need to setup an adapter to communicate with S3 and then we need to setup a filesystem that uses the adapter performs actions on the filesystem.

Because Gaufrette has two levels we could use, for example, different adapters for different environments. If you have functional tests you probably don't want to upload files to S3 in those but rather use the local filesystem.

<pre><code class="yml"># app/config/config.yml

knp_gaufrette:
    adapters:
        photo_storage:
            amazon_s3:
                amazon_s3_id: acme_storage.amazon_s3
                bucket_name:  %amazon_s3_bucket_name%
                create:       false
                options:
                    create: true
    filesystems:
        photo_storage:
            adapter:    photo_storage
            alias:      photo_storage_filesystem</code></pre>

The previous code creates one adapter `photo_storage` of the type `amazon_s3` and a filesystem `photo_storage` that uses the `photo_storage` adapter. Before we continue lets look at the `amazon_s3_id` option. This option has to refer to a service of class `AmazonS3`.

We also need to define the bucket name and I like to define such options in my applications `parameters.yml`.

### Configure AWS

I created a bundle for the code concerned with uploading and storing file and called it `AcmeStorageBundle`. Inside this bundle we need to create a new service for the `AmazonS3` class.

<pre><code class="xml"># src/Acme/StorageBundle/Resources/config/services.xml

&lt;parameters&gt;
    &lt;parameter key=&quot;acme_storage.amazon_s3.class&quot;&gt;AmazonS3&lt;/parameter&gt;
&lt;/parameters&gt;

&lt;services&gt;
    &lt;service id=&quot;acme_storage.amazon_s3&quot; class=&quot;%acme_storage.amazon_s3.class%&quot;&gt;
        &lt;argument type=&quot;collection&quot;&gt;
            &lt;argument key=&quot;key&quot;>%acme_storage.amazon_s3.aws_key%&lt;/argument&gt;
            &lt;argument key=&quot;secret&quot;>%acme_storage.amazon_s3.aws_secret_key%&lt;/argument&gt;
        &lt;/argument&gt;
    &lt;/service&gt;
&lt;/services&gt;</code></pre>

There are two parameters defined, one for the key and one for the secret key, so we quickly have to define a configuration for AcmeStorageBundle. We also add an option to configure the base URL of the bucket.

<pre><code class="php"># src/Acme/StorageBundle/DependencyInjection/Configuration.php

// ...
public function getConfigTreeBuilder()
{
    // ...
    $rootNode
        ->children()
            ->arrayNode('amazon_s3')
                ->children()
                    ->scalarNode('aws_key')->end()
                    ->scalarNode('aws_secret_key')->end()
                    ->scalarNode('base_url')->end()
                ->end()
            ->end()
        ->end();

    return $treeBuilder;
}

// ...</code></pre>

<pre><code class="php"># src/Acme/StorageBundle/DependencyInjection/AcmeStorageExtension.php

// ...

public function load(array $configs, ContainerBuilder $container)
{
    // ...

    if (!isset($config['amazon_s3']['aws_key'])) {
        throw new \InvalidArgumentException(
            'The option "acme_storage.amazon_s3.aws_key" must be set.'
        );
    }
    $container->setParameter(
        'acme_storage.amazon_s3.aws_key',
        $config['amazon_s3']['aws_key']
    );

    if (!isset($config['amazon_s3']['aws_secret_key'])) {
        throw new \InvalidArgumentException(
            'The option "acme_storage.amazon_s3.aws_secret_key" must be set.'
        );
    }
    $container->setParameter(
        'acme_storage.amazon_s3.aws_secret_key',
        $config['amazon_s3']['aws_secret_key']
    );

    if (!isset($config['amazon_s3']['base_url'])) {
        throw new \InvalidArgumentException(
            'The option "acme_storage.amazon_s3.base_url" must be set.'
        );
    }
    $container->setParameter(
        'acme_storage.amazon_s3.base_url',
        $config['amazon_s3']['base_url']
    );
}

// ...</code></pre>

We can now configure these options in our applications configuration.

<pre><code class="yaml"># app/config/config.yml

acme_storage:
    amazon_s3:
        aws_key:        %amazon_aws_key%
        aws_secret_key: %amazon_aws_secret_key%
        base_url:       %amazon_s3_base_url%</code></pre>

We should keep our AWS credentials secret and therefore define them in `parameters.yml` (which should not be committed to a VCS server).

<pre><code class="yml"># app/config/parameters.yml

parameters:
    amazon_aws_key:         ~
    amazon_aws_secret_key:  ~
    amazon_s3_base_url:     ~
    amazon_s3_bucket_name:  ~</code></pre>

In the `parameters.yml` file I also defined `amazon_s3_bucket_name`, which is used in the Gaufrette configuration to set the bucket name.

### Implementing an uploader

Now we have everything configured and we can start writing code. Let's create a class `PhotoUploader` in `AcmeStorageBundle` to keep our controllers free of the details on how to upload files.

<pre><code class="php"># src/Acme/StorageBundle/Upload/PhotoUploader.php

namespace Acme\Bundle\StorageBundle\Upload;

use Symfony\Component\HttpFoundation\File\UploadedFile;

use Gaufrette\Filesystem;

class PhotoUploader
{
    private static $allowedMimeTypes = array(
        'image/jpeg',
        'image/png',
        'image/gif'
    );

    private $filesystem;

    public function __construct(Filesystem $filesystem)
    {
        $this->filesystem = $filesystem;
    }

    public function upload(UploadedFile $file)
    {
        // Check if the file's mime type is in the list of allowed mime types.
        if (!in_array($file->getClientMimeType(), self::$allowedMimeTypes)) {
            throw new \InvalidArgumentException(sprintf('Files of type %s are not allowed.', $file->getClientMimeType()));
        }

        // Generate a unique filename based on the date and add file extension of the uploaded file
        $filename = sprintf('%s/%s/%s/%s.%s', date('Y'), date('m'), date('d'), uniqid(), $file->getClientOriginalExtension());

        $adapter = $this->filesystem->getAdapter();
        $adapter->setMetadata($filename, array('contentType' => $file->getClientMimeType()));
        $adapter->write($filename, file_get_contents($file->getPathname()));

        return $filename;
    }
}
</code></pre>

The only thing that is a little bit tricky and took me a while to figure out is setting the content type. When we don't set the correct content type manually S3 will assume `application/octet-stream` and therefore will offer the file as download to the user. If we want to host files that a user can view in a browser (like images) we need to set the correct mime type. Sadly this is not possible on the `Filesystem` object. However, if you only upload files that should be downloaded you can directly work on the `Filesystem` object:

<pre><code class="php">$this->filesystem->write($filename, file_get_contents($file->getPathname()));</code></pre>

We create a service for `PhotoUploader` to access the class in our controllers.

<pre><code class="xml">&lt;parameters&gt;
    &lt;parameter key=&quot;acme_storage.photo_uploader.class&quot;&gt;Acme\StorageBundle\Upload\PhotoUploader&lt;/parameter&gt;
&lt;/parameters&gt;

&lt;services&gt;
    &lt;service id=&quot;acme_storage.photo_uploader&quot; class=&quot;%acme_storage.photo_uploader.class%&quot;&gt;
        &lt;argument type=&quot;service&quot; id=&quot;photo_storage_filesystem&quot; /&gt;
    &lt;/service&gt;
&lt;/services&gt;</code></pre>

### Setting up the controller and the form

We create an upload form and connect the form with our `PhotoUploader` class in the controller. In this example we will only create one form field for the uploaded file but it is easily possible to add other fiels (for example, a description).

<pre><code class="php"># src/Acme/PhotoBundle/Form/Type/PhotoType.php

namespace Acme\PhotoBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;

class PhotoType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('photo', 'file', array(
            'label' => 'Photo',
        ));
    }

    public function getName()
    {
        return 'photo';
    }
}</code></pre>

The only thing special in the controller code is the code to call `PhotoUploader::upload()`. It expects an `UploadedFile` object which is automically returned by the form.

<pre><code class="php"># src/Acme/PhotoBundle/Controller/PhotoController.php

namespace Acme\PhotoBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

use Acme\PhotoBundle\Form\Type\PhotoType;

class PhotoController extends Controller
{
    public function addAction(Request $request)
    {
        $form = $this->createForm(new PhotoType(), array());

        if ($request->isMethod('POST')) {
            $form->bind($request);
            if ($form->isValid()) {
                $data = $form->getData();
                $url = $this->getPhotoUploader()->upload($data['photo']);

                return; // display a response or redirect
            }
        }

        return $this->render(
            'AcmePhotoBundle:Photo:add.html.twig',
            array('form'  => $form->createView())
        );
    }

    /**
     * @return Acme\StorageBundle\Uploader\PhotoUploader
     */
    protected function getPhotoUploader()
    {
        return $this->get('acme_storage.photo_uploader');
    }
}</code></pre>

If we now want to get the full URL to the uploaded file we can use the parameter we defined earlier in the configuration of `AcmeStorageBundle`:

<pre><code class="php">$url = sprintf(
    '%s/%s',
    $this->container->getParameter('acme_storage.amazon_s3.base_url'),
    $this->getPhotoUploader()->upload($data['photo'])
);</code></pre>

The only thing left to do is create a route for the action and probably add some logic to store the URL returned by the `upload()` method in a database. However, that is not really the topic of this article and is explained elsewhere.

Feedback to this article is welcome. Please [email](mailto:florian@eckerstorfer.co) me or contact @Florian_ on [Twitter](http://twitter.com/Florian_).
