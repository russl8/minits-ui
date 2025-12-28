export type Example = {name:string,snippet:string}

export const examples = [
  {
    name: "initialExample",
    snippet: `class A { a : int = 4; }\n \nclass B extends A {\n\ta = a + 1; // equals 5\n \n\td: bool = a - a == 0; // true\n \n\te : int = a + 1; // equals 5 + 1 = 6\n \n\tfunction getCurrentValueOfA() : int { \n \t\treturn a;\n\t} \n \tf : int = getCurrentValueOfA(); // equals 5 \n\n\ta=a+1;\n\tg:int=getCurrentValueOfA(); //equals 6\n}`,
  },
  {
    name: "inheritance",
    snippet: `class inheritance {
    x : int = 1;
}

class Child extends inheritance {
    y : int = x + 1; // inherits x
}`,
  },
  {
    name: "while_loop",
    snippet: `class whileLoop {
    i : int = 0;

    function run(limit : int) : int {
        while (i < limit) {
            i = i + 1;
        }
        return i;
    }

    result : int = run(3); // result = 3
}`,
  },
  {
    name: "for_loop",
    snippet: `class forLoop {
    sum : int = 0;

    function addUpTo(n : int) : int {
        for (i : int = 1; i <= n; i = i + 1) {
            sum = sum + i;
        }
        return sum;
    }

    total : int = addUpTo(3); // 1 + 2 + 3 = 6
}`,
  },
  {
    name: "lists",
    snippet: `class lists {
    letters : list[char] = "ABC";
    numbers : list[int] = [1, 2, 3];
    flags : list[bool] = [True, False, True];
}`,
  },
  {
    name: "string_declaration",
    snippet: `class strDecl {
    message : list[char] = "HELLO";
}`,
  },
  {
    name: "function_declaration",
    snippet: `class ex_func {
    function add(a : int, b : int) : int {
        return a + b;
    }

    result : int = add(2, 3); // 5
}`,
  },
  {
    name: "list_modification",
    snippet: `class listMod {
    class listMod {
      word : list[char] = "HI";

      function change() : list[char] {
          a : list[char] = "";
      a = word;
          return a;
      }

      updated : list[char] = change(); // updated == word == "HI"

    word = "BYE"; // updated should also equal "BYE" (pass by reference)
}
    
`,
  },
  {
    name: "if_statement",
    snippet: `class ifStatement {
    x : int = 5;
    y : int = 0;

    function check(dummy : int) : int {
        if (x > 3) {
            y = 1;
        }
        return y;
    }

    result : int = check(1); // y = 1
}`,
  },
  {
    name: "scope_shadowing",
    snippet: `class scopeShadowing {
    value : int = 10;

    function shadow(dummy : int) : int {
        value : int = 5; // shadows class variable
        return value;
    }

    function original(dummy : int) : int {
        return value;
    }

    a : int = shadow(1);   // 5
    b : int = original(1); // 10
}`,
  },
];
