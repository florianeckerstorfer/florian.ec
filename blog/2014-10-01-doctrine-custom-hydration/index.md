---
title: Improving Doctrine Performance with Custom Hydration
date: 2014-10-01T00:00:00.000Z
category: Development
tags: [ php, doctrine, performance ]
path: /doctrine-custom-hydration/
published: true
---

If you are using Doctrine for a project that is bigger than very small you probably have encountered performance problems with hydration. Hydration is the layer of the ORM that transforms the data that is returned by the database into a form that is comfortable for the developer to work with.

Object hydration is the default one and it returns the data as objects. This provides the greatest convinience for the developer, but requires a complex and memory intensive hydration process. In most projects for 95 to 100% of the quries this is a reasonable trade-off, but then there is this single import or export script that deals with 100,000 of objects and object hydration takes too much time or consumes too much memory. For these cases Doctrine supports array hydration which creates arrays instead of objects.

And then there exist ultra-rare cases where you don't import a few hundred thousand rows, but something like 50 million and even array hydration is too slow. In these cases I have fallen back to native SQL queries in the past.

Native SQL queries are considerable faster because no hydration is involved, but since I want to use Doctrine and hydration for the other 99% of my application I have to duplicate code and deal with different ways to invoke quries and so on. Therefore I looked into a feature of Doctrine I haven't really considered before: [Custom Hydrators](http://docs.doctrine-project.org/projects/doctrine-orm/en/latest/reference/dql-doctrine-query-language.html#custom-hydration-modes).

## Custom Hydration

Custom Hydrators are pretty straight forward, you sub-class the `AbstractHydrator` class provided by Doctrine and implement the `hydrateAllData()` method, obtain a reference to a `PDOStatement` object and returns the result. You can hydrate to whatever you want, array, object or scalar values. Before implemting my first hydrator I looked at the source code of the `ObjectHydrator` and `ArrayHydrator` and was a little bit overwhelmed. There was so much code and more loops than I expected. If you know that thousands or even millions of elements will go through this code you get suspicious whenever you see a loop. In retrospect the amount of code makes sense: the hydrator needs to map the column names to the field names used in the code, convert the values into their PHP type, resolve references and so on. Still, too many loops.

## Simple Array Hydration

My first idea to speed up the hydration process was to return the row I retrieved from PDO and return it; no mapping or conversion. I loose a lot of convenience compared to object or even array hydration, but when the alternative is to use PDO it makes sense. The result is in the same format as it would be when using PDO directly, but I can continue to use most other features of Doctrine, such as the entity manager, DQL or repositories.

```php
use Doctrine\ORM\Internal\Hydration\AbstractHydrator;

class SimpleArrayHydrator extends AbstractHydrator
{
    protected function hydrateAllData()
    {
        $result = [];
        foreach($this->_stmt->fetchAll(\PDO::FETCH_ASSOC) as $row) {
            $result[] = $row;
        }

        return $result;
    }
}
```

## Benchmarks

I tested my `SimpleArrayHydrator` with a simple dataset (one table with three columns: a primary key, a string and an integer and about 6,500 rows) and compared the performance to object and array hydration as well as using PDO directly. The results below indicate average values over 1,000 iterations and are measured using [Athletic](https://github.com/polyfractal/athletic).

<table>
    <thead>
        <tr>
            <th>Hydration</th>
            <th>Iterations</th>
            <th>Average Time</th>
            <th>Ops/second</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Object hydration</td>
            <td>1,000</td>
            <td>0.4062044150829</td>
            <td>2.46181</td>
        </tr>
        <tr>
            <td>Array hydration</td>
            <td>1,000</td>
            <td>0.3309864323139</td>
            <td>3.02127</td>
        </tr>
        <tr>
            <td>PDO-style hydration</td>
            <td>1,000</td>
            <td>0.0245044710636</td>
            <td>40.80888</td>
        </tr>
        <tr>
            <td>No hydration (PDO)</td>
            <td>1,000</td>
            <td>0.0248321378231</td>
            <td>40.27040</td>
        </tr>
    </tbody>
</table>

We can see in these results that my custom PDO-style hydration is practically as fast as directly using PDO. Object and array hydration can process equally many rows per second for this data set. Side note: the difference between object and array hydration will be bigger for more complex data sets (for examples, references).

## Custom Custom Hydrators

While my `SimpleArrayHydrator` is very fast it does not provide a lot of conveniences for developers. There is definitely room in the middle for a hydrator that is faster than default object and array hydration and provides certain conviniences for the developer. Remember that Doctrine is an extremely popular project and that the default hydrators need to work in a lot of different scenarios. If you develop a custom hydrator for your project you can make certain assumptions to improve the performance while maintaining a certain level of convenience. For example, if your project has a convention that the name of a column in the database and the name of the corresponding property in the object must be equal, you can skip the key mapping during hydration.

Of course, you can also create a hydrator specifically for an entity or even a specific query that causes you performance problems. Please don't create a specific hydrator for every table in your project, that defeats the purpose of using an ORM, but if for a specific entity or query the alternative is switching to PDO code it certainly makes sense to consider it.

Think of it that way, if you use PDO directly you iterate through the result set and save the rows in some data structure you are basically hydrating the result set. In fact, if you use PDO directly you are most likely writing a custom hydrator for every query you execute. Thus it makes sense to consider a custom hydrator.
