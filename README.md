https://spurslicer.github.io/Chinese-Language-Notes-Website/
# What is this?
This is a statically generated website used for recording Chinese notes in an efficient and informative manner! You will only have to use json if you want to add in more characters or categories, so it *should* be a bit speedier than coding the HTML yourself for everything! Most importantly, stroke order gifs and radical composition links will be generated for every character you enter! The gifs will be viewable upon hovering over the hyperlinked characters and clicking on the hyperlinks takes you to the radical composition website!
# Directory Structure
```
.
├── conf/
│   └── nav_conf.json
├── jsons/
│   └── ...
├── README.md
├── index.html
├── script.js
└── style.css
```

# ./conf/nav_conf.json
This json generates the nav bar structures! Here is an overview of how it works:
```json
[ /* Array of rows in the navbar*/
    [ /* Row 1 of navbar */
        { /* Cell 1 of row 1 */
            "cell_name": "name of cell 1 in row",
            "cell_dropdown_names": ["Dropdown option 1", "Dropdown option 2", "..."]
        },
        { /* Cell 2 of row 1 */
            "cell_name": "name of cell 2 in row",
            "cell_dropdown_names": ["Dropdown option 1", "Dropdown option 2", "..."]
        }
    ],
    [ /* Row 2 of navbar */
        { /* Cell 1 of row 2 */
            "cell_name": "name of cell 1 in row",
            "cell_dropdown_names": ["Dropdown option 1", "Dropdown option 2", "..."]
        },
        { /* Cell 2 of row 2 */
            "cell_name": "name of cell 2 in row",
            "cell_dropdown_names": ["Dropdown option 1", "Dropdown option 2", "..."]
        }
    ] /* NOTE: You can have as many rows as you want! */
]
```
You can have as many rows with as many cells (they will wrap eventually) and as many drop down options as you'd like!

**IMPORTANT:** json names in `./jsons/` are *automatically generated* via the dropdown menu option names. These names substitute spaces with underscores and make the entire string lowercase like so:
- *Example Dropdown Name* becomes *example_dropdown_name*
- *TeSt   Nam3* becomes *test___nam3*
# ./jsons/**
There is one json for every dropdown menu option. NOTE: you MUST have the json name match the drop down name in the format listed above! It is rather simple to do so and I will provide another example on what this must look like after this explanation. Here is what an example json looks like (definitions of each item are below):
```json
[ /* Array of definitions */
    {
        "head": "Pets",
        "character": "猫",
        "pinyin": "māo",
        "english": "cat",
        "grammar": "noun",
        "example_zh": "我爱我的猫。",
        "example_en": "I love my cat."
    },
    {
        "character": "狗",
        "pinyin": "gǒu",
        "english": "dog",
        "grammar": "noun",
        "example_zh": "我爱我的狗。",
        "example_en": "I love my dog."
    },
    { /* NOTE: synonymic characters should be separated with a slash */
        "character": "他们的/她们的",
        "pinyin": "tāmen de",
        "english": "Their/Theirs",
        "grammar": "Pronoun",
        "example_zh": "他们/她们有三个三明治。",
        "example_en": "They have three sandwiches."
    }
    
]
```
- **head [OPTIONAL]**: Displays a header that separates tables for organization.
- **character**: The Chinese character(s).
- **pinyin**: The pinyin of the character(s).
- **english**: The English meaning of the character/phrase.
- **grammar**: The grammar use case.
- **example_zh**: An example in Chinese.
- **example_en**: The same example in english.
- **radical_composition [GENERATED]**: Click on the hyperlinked Chinese characters to view the radical composition (NOTE: the website generates this for you).
- **stroke_order [GENERATED]**: Hover over the hyperlinked Chinese characters to view a popup gif of the stroke order (NOTE: the website also generates this for you).

__SUMMARY__: Please use a / to separate synonyms (failing to do so will mess up the radical and stroke order generation) and make sure you have the correct filename mapping. Speaking of that...

# Adding New Categories (Navbar)
To do this, all you have to do is make modifications to `./conf/nav_conf.json` as show above and the website will automatically update the navbar for you!
# Adding New Characters
All you have to do is add in more json entries like the ones above (remember to separate the curly braces with brackets like you would in an array)!
# ./jsons/** Filenames (Again...)
To make your jsons recognizable to the website, make sure they they have the same name as the `cell_dropdown_names` entry BUT with spaces replaced with underscores and no capital letters. Here is an overview of the mapping again:
- *Example Dropdown Name* becomes *example_dropdown_name*
- *TeSt   Nam3* becomes *test___nam3*
# ✨Customization✨
This website's color scheme is easily customizable! In `style.css`, there are color variables that can be set to whatever you'd like:
```css
:root {
    --background: /* Background color */;
    --foreground: /* Foreground color */;
    --foreground-hover: /* Foreground color for hovering over navbar options */;
    --hyperlink: /* Radical/Stroke-order hyperlink color*/;
    --hyperlink-hover: /* Radical/stroke-Order hyperlink hover color*/;
    --table-even: /* Even-numbered table cell background colors */;
    --table-odd: /* Odd-numbered table cell background colors */;
}
```
^ This is an explanation of what all of the colors are used for! Feel free to change them to whatever you'd like :3

If you aren't a fan of the rainbow, you can change the gradient colors listed here:
```css
:root {
    --rainbow: /* linear-gradient(...) of the <hr> under the title */;
    --rainbow-alt: /*linear-gradient(...) of the outline of stroke order boxes */;
}
```
^ This is what each gradient is used for.

If you want to change the browser title of the website, then you can by changing the text in *line 8* of `index.html`. 

If you want to change the displayed title of the website, the you can also change this by changing the text in *line 12* of `index.html`.

Happy customizing!
# Final Thoughts
The GitHub Pages version of this website will be updated periodically by me. Feel free to download and host a local copy for your own use! I will attempt to push updates when I'm able to. Please let me know if any earth-shattering bugs appear in this!
# Generators Used
- Radicals: https://www.dong-chinese.com/wiki/
- Stroke Order: https://www.strokeorder.com/
