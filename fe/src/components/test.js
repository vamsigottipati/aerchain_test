const treeViewGen = require("./treeViewGen")

var x = [{
    "parents" : [],
    "children" : [ 
        "Phones", 
        "Laptops", 
        "AC", 
        "Power Machines", 
        "s"
    ],
    "name" : "Electronics",
    "__v" : 0
},

/* 2 */
{
    "parents" : [],
    "children" : [],
    "name" : "Household",
    "__v" : 0
},

/* 3 */
{
    "parents" : [ 
        "Electronics"
    ],
    "children" : [],
    "name" : "Phones",
    "__v" : 0
},

/* 4 */
{
    "parents" : [ 
        "Electronics"
    ],
    "children" : [],
    "name" : "Laptops",
    "__v" : 0
},

/* 5 */
{
    "parents" : [ 
        "Electronics"
    ],
    "children" : [],
    "name" : "AC",
    "__v" : 0
},

/* 6 */
{
    "parents" : [ 
        "Electronics"
    ],
    "children" : [ 
        "Drills", 
        "Drills"
    ],
    "name" : "Power Machines",
    "__v" : 0
},

/* 7 */
{
    "parents" : [ 
        "Electronics", 
        "Power Machines"
    ],
    "children" : [],
    "name" : "Drills",
    "__v" : 0
},

/* 8 */
{
    "parents" : [],
    "children" : [ 
        "Shirts", 
        "Pants", 
        "Jeans"
    ],
    "name" : "Clothes",
    "__v" : 0
},

/* 9 */
{
    "parents" : [ 
        "Clothes"
    ],
    "children" : [ 
        "T-Shirt", 
        "Formal", 
        "Casual"
    ],
    "name" : "Shirts",
    "__v" : 0
},

/* 10 */
{
    "parents" : [ 
        "Clothes"
    ],
    "children" : [],
    "name" : "Pants",
    "__v" : 0
},

/* 11 */
{
    "parents" : [ 
        "Clothes"
    ],
    "children" : [],
    "name" : "Jeans",
    "__v" : 0
},

/* 12 */
{
    "parents" : [ 
        "Clothes", 
        "Shirts"
    ],
    "children" : [],
    "name" : "T-Shirt",
    "__v" : 0
},

/* 13 */
{
    "parents" : [ 
        "Clothes", 
        "Shirts"
    ],
    "children" : [],
    "name" : "Formal",
    "__v" : 0
},

/* 14 */
{
    "parents" : [ 
        "Clothes", 
        "Shirts"
    ],
    "children" : [],
    "name" : "Casual",
    "__v" : 0
},

/* 15 */
{
    "parents" : [ 
        "Electronics"
    ],
    "children" : [],
    "name" : "s",
    "__v" : 0
},

/* 16 */
{
    "parents" : [],
    "children" : [],
    "name" : "some category",
    "__v" : 0
}]

var a = treeViewGen(x)

console.log(JSON.stringify(a))