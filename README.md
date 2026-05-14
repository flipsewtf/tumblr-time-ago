# TimeAgo Tumblr plugin

I've loved using [@bychloethemes](https://bychloethemes.tumblr.com)'s
[timeAgo(); plugin](https://bychloethemes.tumblr.com/plugins/timeago) but wanted to utilize their
timestamp feature without the requirement of jQuery library. I have, respectfully, used Chloe's
options for easy usage.

> [!NOTE]
> Basic JS/HTML knowledge isn't necessarily required but it's helpful.

> [!IMPORTANT] 
> This only supports English language.

## How to use

Before `</body>` place the script in a `<script>` tag. Use Tumblr's theme assets to upload it.

```html
<script src="timeago.min.js"></script>
```

You could also paste the script with your other scripts if you have any, but it takes up quite a few lines of code. If you do, just make sure the initialization follows after.

### Initialization

Place the following inside a `<script>` tag to initialize the timeAgo functionality.

```javascript
timeAgo(document.querySelectorAll('[data-timestamp]'), {
    time: 'letter', // 'letter' | 'short' | 'word'
    spaces: false, // true adds spaces between numbers and units
    words: false, // true turns numbers into words
    prefix: '', // e.g. '~' or 'about' or 'posted'
    suffix: '', // e.g. a period, etc.
    ago: false, // true appends 'ago' automatically
    months: true, // false skips months and counts in weeks instead
});
```

### Time options

There are 3 different time options:

| Letter | Short | Word   |
| ------ | ----- | ------ |
| s      | sec   | second |
| m      | min   | minute |
| h      | hr    | hour   |
| d      | day   | day    |
| w      | wk    | week   |
| mo     | mo    | month  |
| y      | yr    | year   |

### `ago` option

Setting `ago: true` automatically appends `ago` — no need to set it manually as a suffix.

```
3d ago  /  three days ago
```

### `months` option

Months are included by default. Setting `months: false` skips the `mo` unit entirely and counts in
weeks up until a year.

### HTML

This plugin requires a UNIX timestamp. For Tumblr that is `{Timestamp}`. Use a `<time>` element with
a `data-timestamp` attribute — the `datetime` attribute holds a human-readable date for
accessibility and SEO.

```html
<time
    class="class-name-optional"
    datetime="{Year}-{MonthNumberWithZero}-{DayOfMonthWithZero}"
    data-timestamp="{Timestamp}"></time>
```

Make sure your selector targets elements with data-timestamp.

### Result

Your HTML document should look something like this:

```html
<html>
    <body>
        <time
            class="class-name-optional"
            datetime="{Year}-{MonthNumberWithZero}-{DayOfMonthWithZero}"
            data-timestamp="{Timestamp}"></time>

        <script src="timeago.min.js"></script>
        <script>
            timeAgo(document.querySelectorAll('[data-timestamp]'), {
                time: 'letter',
                spaces: false,
                words: false,
                prefix: '',
                suffix: '',
                ago: false,
                months: true,
            });
        </script>
    </body>
</html>
```

## Credits

The initialization structure is by [@bychloethemes](https://bychloethemes.tumblr.com).

## License

MIT
