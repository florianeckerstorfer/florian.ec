---
title: "MySQL, Doctrine and UTF-8"
tags: [ mysql, doctrine, utf8, symfony, unicode ]
slug: mysql-doctrine-utf8
---

{% block summary %}
When dealing with character encodings in MySQL you soon realise that `utf8` is not really [UTF-8](http://en.wikipedia.org/wiki/UTF-8). UTF-8 is a variable-length encoding, that means ASCII characters require only one byte while it also supports more characters by requiring more bytes.

The MySQL character encoding `utf8` has a maximum of 3 bytes, which contains most characters widely used in the western world. However, Chinese, Japanese or Korean alphabets require 4 bytes and therefore cannot be stored in a MySQL column that is encoded with `utf8`. MySQL provides an additional character encoding `utf8mb4` to support those characters. By the way, Emojis also require 4 bytes and `utf8mb4`.

In this article I am explaining how to create `utf8mb4` databases, tables and columns with plain SQL and with [Doctrine ORM](http://www.doctrine-project.org).
{% endblock %}

{% block content %}
### MySQL

MySQL lets you set the character encoding and collation on multiple different level. You can set the default encoding for a database, for a table and you can specify the encoding of an indiviual column.

```sql
/* Create database */
create database utf8mb4test
    character set utf8mb4
    collate utf8mb4_unicode_ci;

/* Create table */
create table unicode_names
    (
        name varchar(255)
    )
    default character set utf8mb4
    collate utf8mb4_unicode_ci;

/* Create table with mixed encodings */
create table mixed_encoding
    (
        name varchar(255)
            character set utf8mb4
            collate utf8mb4_unicode_ci,
        email varchar(255)
    )
    default character set utf8
    collate utf8_unicode_ci;
```

*When you design your database and decide on encodings for specific columns, please remember that there are TLDs in many languages that require 4 bytes now. IANA has a [list with all top-level domains](http://www.iana.org/domains/root/db).*

If you use pure SQL and create a table without a specific character encoding and collation the table will be created using the default character encoding of the database. The same applies for columns, adding a column without a specific character encoding and collation will use the tables.

Matthias Bynens has a [pretty nice overview](https://mathiasbynens.be/notes/mysql-utf8mb4) how to migrate `utf8` tables to `utf8mb4` and how to set things up correctly on the MySQL side of things.

### Doctrine

Most likely you are not creating your schema by hand, but generate it using an ORM. I use Doctrine and the documentation and available resources on this topic are outdated in many places. First of all, the behaviour of Doctrine must have changed recently, because if you Google something like *doctrine utf8mb4* you will find resources saying that you have to configure this at a database level.

In fact, the reference included with the source code (as of v2.4.6) says the following

> You can't set these values inside the annotations, yml or xml mapping files. To make a database work with the default charset and collation you should configure MySQL to use it as default charset, or create the database with charset and collation details. This way they get inherited to all newly created database tables and columns.

However, it seems that Doctrine now specifically defines the encoding and collation when creating a new table. You can see this if you dump the schema SQL:

```shell
$ php app/console doctrine:schema:update --dump-sql
```

The result is something like this:

```sql
CREATE TABLE user
    (
        id INT AUTO_INCREMENT NOT NULL,
        username VARCHAR(255) NOT NULL,
        /* ... */
    )
    DEFAULT CHARACTER SET utf8
    COLLATE utf8_unicode_ci
    ENGINE = InnoDB;
```

Therefore the settings on the database-level are overwritten by the table-specific configurations set by Doctrine. Unfortunately we need to set the charset and collation for every table since there is no global option and Doctrine doesn't respect the setting defined in MySQL.

The related options are called `charset` and `collate` and can be set using all configuration formats, for example, when using annotations:

```php
/**
 * @ORM\Entity()
 * @ORM\Table(name="users", options={"collate"="utf8mb4_unicode_ci", "charset"="utf8mb4"})
 */
```

Or when using XML:

```xml
<entity name="Acme\DemoBundle\Entity\User" table="users">
    <options>
        <option name="charset">utf8mb4</option>
        <option name="collate">utf8mb4_unicode_ci</option>
    </options>
</entity>
```

If you now dump the SQL to create the schema you should get something like this:

```sql
CREATE TABLE user
    (
        id INT AUTO_INCREMENT NOT NULL,
        username VARCHAR(255) NOT NULL,
        /* ... */
    )
    DEFAULT CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci
    ENGINE = InnoDB;
```

Doctrine currently doesn't seem to support setting the charset and collation on the column-level. If you want to change the encoding on a per-column basis you need to do this using SQL.

### Indexes

When converting your tables from `utf8` to `utf8mb4` there is one more thing you need to consider. An index in InnoDB always has a maximum size of 767, bytes regardless of the number of bytes used for a single character. Consider a column with a maximum of 255 characters, this would result in 765 bytes when using `utf8` but in 1020 bytes when using `utf8mb4`. If you need an index on a `utf8mb4` column the maximum number of characters is 191 instead of 255.

### Encoding of the Connection

One last thing you need to take care of is the encoding of the connection. If you are using Doctrine in combination with Symfony you can set this in your `config.yml`

```yaml
# app/config/config.yml
doctrine:
    dbal:
        charset:  utf8mb4
```

Or if you don't use Symfony:

```php
$config = new \Doctrine\DBAL\Configuration();
// ...
$connectionParams = array(
    'driver'   => 'pdo_mysql',
    'host'     => 'localhost',
    'user'     => 'user',
    'password' => 'secret',
    'dbname'   => 'mydb',
    'charset'  => 'utf8mb4'
);
$conn = \Doctrine\DBAL\DriverManager::getConnection($connectionParams, $config);
```

In SQL you would use

```sql
SET NAMES='utf8mb4';
```

### Handling Multi-byte Strings in PHP

This has nothing really to do with databases, but just don't forget that when you deal with multi-byte strings (such as Emoji or CJK characters) you need to use the `mb_*` methods, such as `mb_substr()` or `mb_strlen()`.

### Conclusion

Considering that full UTF8 support is pretty important these days it's probably worth converting tables to `utf8mb4` or at least use `utf8mb4` in new projects. I heard some evidence that `utf8mb4` is slower than `utf8`, but I couldn't find some definitive performance measurements. Michael Simmons found that joining string columns with different encodings [is extremely slower](http://info.michael-simons.eu/2013/01/21/java-mysql-and-multi-byte-utf-8-support/) than joining columns with the same encoding (which makes sense). In my opinion this should not keep you from using `utf8mb4` now.

And don't forget to treat yourself with a &#x1f37a; after dealing with all this encoding stuff.
{% endblock %}
