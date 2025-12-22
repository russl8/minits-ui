export const examples = {
    initialExample: `class A { a : int = 4; }\n \nclass B extends A {\n\ta = a + 1; // equals 5\n \n\td: bool = a - a == 0; // true\n \n\te : int = a + 1; // equals 5 + 1 = 6\n \n\tfunction getCurrentValueOfA() : int { \n \t\treturn a;\n\t} \n \tf : int = getCurrentValueOfA(); // equals 5 \n\n\ta=a+1;\n\tg:int=getCurrentValueOfA(); //equals 6\n}`
}