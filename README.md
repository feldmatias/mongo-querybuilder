# Mongo Query Builder

Mongo querybuilder for typescript, focused on extensibility, reusability, readability and most importantly business domain oriented.

This library generates json neccessary for mongo queries and aggregations. It does not connect to any mongo instance, so it can be used with any library.

## Example

You can find the following example and more in `/tests/examples`.

Imagine we have the following schema:

```typescript
type Item = {
    user: string;
    name: string;
    stock: number;
    valid: boolean;
    reserved: boolean | undefined;
};
```

By definition of the business, an item is available if it is valid, not reserved and its stock is greater than 0.

We want to get all available items for a user, sorted by stock and name.

Without the query builder the mongo aggregation we would do is something like:

```typescript
[
    {
        $match: {
            user: 'user1',
            stock: 0,
            valid: true,
            $or: [{reserved: false}, {reserved: {$exists: false}}],
        },
    },
    {
        $sort: {
            stock: -1,
            name: 1,
        },
    },
];
```

With the query builder we can do the following:

1. Create a custom matcher:

```typescript
export function ItemIsAvailable(): MongoMatcher {
    return IsTrue('valid')
        .and(IsFalseOrUndefined('reserved'))
        .and(Equals('stock', 0));
}
```

2. Create a custom aggregation pipeline builder:

```typescript
export class ItemAggregationPipeline extends MongoAggregationPipeline {
    forUser(userId: string): this {
        return this.match(Equals('user', userId));
    }

    available(): this {
        return this.match(ItemIsAvailable());
    }

    sortByStock(): this {
        return this.sort('stock', SortDirection.DESC);
    }

    sortByName(direction: SortDirection): this {
        return this.sort('name', direction);
    }
}
```

3. Build the query:

```typescript
new ItemAggregationPipeline()
    .forUser('user1')
    .available()
    .sortByStock()
    .sortByName(SortDirection.ASC)
    .toMongo();
```

You can check the returned json is the same, but this has multiple advantages:

-   Extensibility: You can easily add more queries, matchers and aggregations, making queries as complex as you need.

-   Readability: It is simpler to understand the query. You don't need to know the fields used or the exact implementation.

-   Reusability: You can reuse the queries eveywhere without needing to implement again the same logic. Even better, if the logic changes, you only need to change in one place.

-   Business oriented: The queries are expressed in business terms instead of in schema terms, which makes it easier to understand, debug and maintain.
