What is it
----------

Plugin for [exemd](http://www.vittoriozaccaria.net/exemd/) to generate
Ditaa diagrams in markdown files.

Short help
----------

[Ditaa](http://ditaa.sourceforge.net/) is:

> ... a small command-line utility written in Java, that can convert
> diagrams drawn using ascii art ('drawings' that contain characters
> that resemble lines like | / - ). into proper bitmap graphics

You can use Ditaa in this way:

    ```{ditaa ! }
        +--------+   +-------+    +-------+
        |        | --+ ditaa +--> |       |
        |  Text  |   +-------+    |diagram|
        |Document|   |!magic!|    |       |
        |     {d}|   |       |    |       |
        +---+----+   +-------+    +-------+
            :                         ^
            |       Lots of work      |
            +-------------------------+
    ```

That is converted to this picture:

![](https://dl.dropboxusercontent.com/u/5867765/tools/exemd/exemd-ditaa.png)

Note
----

You can only use this plugin with exemd's `-g` option to produce a PNG.
No SVG or PDF is supported at the moment.
