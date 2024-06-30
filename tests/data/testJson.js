const testCases = [
  // added four languages Rust, dart, Golang, and Kotlin Testcases
  {
    name: "rust : hello world",
    reqObject: {
      language: "rust",
      script: "fn main() {\n" + '    println!("hello world");\n' + "}\n",
    },
    expectedResponse: {
      val: "hello world\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "rust : print stdin",
    reqObject: {
      language: "rust",
      script:
        "use std::io::{self, BufRead};\n" +
        "fn main() {\n" +
        "    let stdin = io::stdin();\n" +
        "    let input = stdin.lock().lines().next().unwrap().unwrap();\n" +
        '    println!("{}", input);\n' +
        "}\n",
      stdin: "1 2 3",
    },
    expectedResponse: {
      val: "1 2 3\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "rust : edge case - empty input",
    reqObject: {
      language: "rust",
      script:
        "use std::io::{self, BufRead};\n" +
        "fn main() {\n" +
        "    let stdin = io::stdin();\n" +
        "    let input = stdin.lock().lines().next().unwrap_or(Ok(String::new())).unwrap();\n" +
        "    if input.is_empty() {\n" +
        '        println!("No input provided");\n' +
        "    } else {\n" +
        '        println!("{}", input);\n' +
        "    }\n" +
        "}\n",
      stdin: "",
    },
    expectedResponse: {
      val: "No input provided\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "rust : edge case - large input",
    reqObject: {
      language: "rust",
      script:
        "use std::io::{self, BufRead};\n" +
        "fn main() {\n" +
        "    let stdin = io::stdin();\n" +
        "    let input = stdin.lock().lines().next().unwrap().unwrap();\n" +
        "    let numbers: Vec<i32> = input.split_whitespace().map(|s| s.parse().unwrap()).collect();\n" +
        "    let sum: i32 = numbers.iter().sum();\n" +
        '    println!("{}", sum);\n' +
        "}\n",
      stdin: Array(100000).fill("1").join(" "),
    },
    expectedResponse: {
      val: "100000\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "rust : factorial",
    reqObject: {
      language: "rust",
      script:
        "fn factorial(n: u32) -> u32 {\n" +
        "    match n {\n" +
        "        0 => 1,\n" +
        "        _ => n * factorial(n - 1),\n" +
        "    }\n" +
        "}\n" +
        "use std::io::{self, BufRead};\n" +
        "fn main() {\n" +
        "    let stdin = io::stdin();\n" +
        "    let input = stdin.lock().lines().next().unwrap().unwrap();\n" +
        "    let n: u32 = input.trim().parse().unwrap();\n" +
        '    println!("{}", factorial(n));\n' +
        "}\n",
      stdin: "5",
    },
    expectedResponse: {
      val: "120\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "kotlin : hello world",
    reqObject: {
      language: "kotlin",
      script: 'fun main() {\n    println("hello world")\n}\n',
    },
    expectedResponse: {
      val: "hello world\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "kotlin : print stdin",
    reqObject: {
      language: "kotlin",
      script:
        "fun main() {\n    val input = readLine()\n    println(input)\n}\n",
      stdin: "1 2 3",
    },
    expectedResponse: {
      val: "1 2 3\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "kotlin : edge case - empty input",
    reqObject: {
      language: "kotlin",
      script:
        'fun main() {\n    val input = readLine()\n    if (input.isNullOrEmpty()) {\n        println("No input provided")\n    } else {\n        println(input)\n    }\n}\n',
      stdin: "",
    },
    expectedResponse: {
      val: "No input provided\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "kotlin : edge case - large input",
    reqObject: {
      language: "kotlin",
      script:
        'fun main() {\n    val input = readLine()\n    if (input != null) {\n        val numbers = input.split(" ").map { it.toInt() }\n        val sum = numbers.sum()\n        println(sum)\n    }\n}\n',
      stdin: Array(100000).fill("1").join(" "),
    },
    expectedResponse: {
      val: "100000\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "kotlin : factorial",
    reqObject: {
      language: "kotlin",
      script:
        "fun factorial(n: Int): Int {\n    if (n == 0) return 1\n    return n * factorial(n - 1)\n}\nfun main() {\n    val input = readLine()\n    if (input != null) {\n        val n = input.toInt()\n        println(factorial(n))\n    }\n}\n",
      stdin: "5",
    },
    expectedResponse: {
      val: "120\n",
      status: 200,
      error: 0,
    },
  },
  // C++ test cases
  {
    name: "cpp : hello world",
    reqObject: {
      language: "cpp",
      script:
        '#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    cout << "hello world";\nreturn 0;\n}\n',
    },
    expectedResponse: {
      val: "hello world",
      status: 200,
      error: 0,
    },
  },
  {
    name: "cpp : print stdin",
    reqObject: {
      language: "cpp",
      script:
        "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    int a;\n    while(cin >> a){\n        cout << a << endl;\n    }\n    return 0;\n}\n",
      stdin: "1 2 3",
    },
    expectedResponse: {
      val: "1\n2\n3\n",
      status: 200,
      error: 0,
    },
  },
  // Node.js test cases
  {
    name: "nodejs : hello world",
    reqObject: {
      language: "nodejs",
      script: "console.log('hello world')",
    },
    expectedResponse: {
      val: "hello world\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "nodejs : print stdin",
    reqObject: {
      language: "nodejs",
      script:
        "process.stdin.setEncoding('utf8'); \n process.stdin.on('data', (input) => { \n console.log(input); \n \n }); \n ",
      stdin: "1 2 3",
    },
    expectedResponse: {
      val: "1 2 3\n",
      status: 200,
      error: 0,
    },
  },
  // Python test cases
  {
    name: "python : hello world",
    reqObject: {
      language: "python",
      script: "print('hello world')",
    },
    expectedResponse: {
      val: "hello world\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "python : print stdin",
    reqObject: {
      language: "python",
      script:
        "try:\n    while(True):\n        line = input()\n        if not line:\n            break\n        print(line)\nexcept EOFError:\n    pass",
      stdin: "1 2 3",
    },
    expectedResponse: {
      val: "1 2 3\n",
      status: 200,
      error: 0,
    },
  },
  // Go test cases
  {
    name: "go : hello world",
    reqObject: {
      language: "go",
      script:
        'package main\nimport "fmt"\nfunc main() {\n    fmt.Println("hello world")\n}\n',
    },
    expectedResponse: {
      val: "hello world\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "go : print stdin",
    reqObject: {
      language: "go",
      script:
        'package main\nimport "fmt"\nfunc main() {\n    var a int\n    for {\n        _, err := fmt.Scan(&a)\n        if err != nil {\n            break\n        }\n        fmt.Println(a)\n    }\n}\n',
      stdin: "1 2 3",
    },
    expectedResponse: {
      val: "1\n2\n3\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "go : edge case - empty input",
    reqObject: {
      language: "go",
      script:
        'package main\nimport "fmt"\nfunc main() {\n    var input string\n    fmt.Scanln(&input)\n    if input == "" {\n        fmt.Println("No input provided")\n    } else {\n        fmt.Println(input)\n    }\n}\n',
      stdin: "",
    },
    expectedResponse: {
      val: "No input provided\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "go : edge case - large input",
    reqObject: {
      language: "go",
      script:
        'package main\nimport "fmt"\nfunc main() {\n    var a int\n    var sum int\n    for i := 0; i < 100000; i++ {\n        fmt.Scan(&a)\n        sum += a\n    }\n    fmt.Println(sum)\n}\n',
      stdin: Array(100000).fill(1).join(" "),
    },
    expectedResponse: {
      val: "100000\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "go : factorial",
    reqObject: {
      language: "go",
      script:
        'package main\nimport "fmt"\nfunc factorial(n int) int {\n    if n == 0 {\n        return 1\n    }\n    return n * factorial(n-1)\n}\nfunc main() {\n    var n int\n    fmt.Scan(&n)\n    fmt.Println(factorial(n))\n}\n',
      stdin: "5",
    },
    expectedResponse: {
      val: "120\n",
      status: 200,
      error: 0,
    },
  },
  // Dart test cases
  {
    name: "dart : hello world",
    reqObject: {
      language: "dart",
      script: 'void main() {\n  print("hello world");\n}\n',
    },
    expectedResponse: {
      val: "hello world\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "dart : print stdin",
    reqObject: {
      language: "dart",
      script:
        "import 'dart:io';\nvoid main() {\n  String? input = stdin.readLineSync();\n  print(input);\n}\n",
      stdin: "1 2 3",
    },
    expectedResponse: {
      val: "1 2 3\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "dart : edge case - empty input",
    reqObject: {
      language: "dart",
      script:
        "import 'dart:io';\nvoid main() {\n  String? input = stdin.readLineSync();\n  if (input == null || input.isEmpty) {\n    print(\"No input provided\");\n  } else {\n    print(input);\n  }\n}\n",
      stdin: "",
    },
    expectedResponse: {
      val: "No input provided\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "dart : edge case - large input",
    reqObject: {
      language: "dart",
      script:
        "import 'dart:io';\nvoid main() {\n  String? input = stdin.readLineSync();\n  if (input != null) {\n    List<int> numbers = input.split(' ').map(int.parse).toList();\n    int sum = numbers.reduce((a, b) => a + b);\n    print(sum);\n  }\n}\n",
      stdin: Array(100000).fill("1").join(" "),
    },
    expectedResponse: {
      val: "100000\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "dart : factorial",
    reqObject: {
      language: "dart",
      script:
        "import 'dart:io';\nint factorial(int n) {\n  if (n == 0) return 1;\n  return n * factorial(n - 1);\n}\nvoid main() {\n  String? input = stdin.readLineSync();\n  if (input != null) {\n    int n = int.parse(input);\n    print(factorial(n));\n  }\n}\n",
      stdin: "5",
    },
    expectedResponse: {
      val: "120\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "cpp : hello world",
    reqObject: {
      language: "cpp",
      script:
        "#include<bits/stdc++.h>\n" +
        "using namespace std;\n" +
        "int main(){\n" +
        '    cout << "hello world";\n' +
        "return 0;\n" +
        "}\n",
    },
    expectedResponse: {
      val: "hello world",
      status: 200,
      error: 0,
    },
  },
  {
    name: "cpp : print stdin",
    reqObject: {
      language: "cpp",
      script:
        "#include<bits/stdc++.h>\n\n" +
        "using namespace std;\n" +
        "int main(){\n\n" +
        "    int a;\n" +
        "    while(cin >> a){\n" +
        "        cout << a << endl;\n" +
        "    }\n" +
        "    return 0;\n\n" +
        "}\n",
      stdin: "1 2 3",
    },
    expectedResponse: {
      val: "1\n2\n3\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "nodejs : hello world",
    reqObject: {
      language: "nodejs",
      script: "console.log('hello world')",
    },
    expectedResponse: {
      val: "hello world\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "nodejs : print stdin",
    reqObject: {
      language: "nodejs",
      script:
        "process.stdin.setEncoding('utf8'); \n " +
        "process.stdin.on('data', (input) => { \n " +
        "  console.log(input); \n " +
        " \n " +
        "}); \n ",
      stdin: "1 2 3",
    },
    expectedResponse: {
      val: "1 2 3\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "python : hello world",
    reqObject: {
      language: "python",
      script: "print('hello world')",
    },
    expectedResponse: {
      val: "hello world\n",
      status: 200,
      error: 0,
    },
  },

  //Golang support test cases

  {
    name: "go : hello world",
    reqObject: {
      language: "go",
      script:
        "package main\n" +
        'import "fmt"\n' +
        "func main() {\n" +
        '    fmt.Println("hello world")\n' +
        "}\n",
    },
    expectedResponse: {
      val: "hello world\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "go : print stdin",
    reqObject: {
      language: "go",
      script:
        "package main\n" +
        'import "fmt"\n' +
        "func main() {\n" +
        "    var a int\n" +
        "    for {\n" +
        "        _, err := fmt.Scan(&a)\n" +
        "        if err != nil {\n" +
        "            break\n" +
        "        }\n" +
        "        fmt.Println(a)\n" +
        "    }\n" +
        "}\n",
      stdin: "1 2 3",
    },
    expectedResponse: {
      val: "1\n2\n3\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "go : edge case - empty input",
    reqObject: {
      language: "go",
      script:
        "package main\n" +
        'import "fmt"\n' +
        "func main() {\n" +
        "    var input string\n" +
        "    fmt.Scanln(&input)\n" +
        '    if input == "" {\n' +
        '        fmt.Println("No input provided")\n' +
        "    } else {\n" +
        "        fmt.Println(input)\n" +
        "    }\n" +
        "}\n",
      stdin: "",
    },
    expectedResponse: {
      val: "No input provided\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "go : edge case - large input",
    reqObject: {
      language: "go",
      script:
        "package main\n" +
        'import "fmt"\n' +
        "func main() {\n" +
        "    var a int\n" +
        "    var sum int\n" +
        "    for i := 0; i < 100000; i++ {\n" +
        "        fmt.Scan(&a)\n" +
        "        sum += a\n" +
        "    }\n" +
        "    fmt.Println(sum)\n" +
        "}\n",
      stdin: Array(100000).fill(1).join(" "),
    },
    expectedResponse: {
      val: "100000\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "go : factorial",
    reqObject: {
      language: "go",
      script:
        "package main\n" +
        'import "fmt"\n' +
        "func factorial(n int) int {\n" +
        "    if n == 0 {\n" +
        "        return 1\n" +
        "    }\n" +
        "    return n * factorial(n-1)\n" +
        "}\n" +
        "func main() {\n" +
        "    var n int\n" +
        "    fmt.Scan(&n)\n" +
        "    fmt.Println(factorial(n))\n" +
        "}\n",
      stdin: "5",
    },
    expectedResponse: {
      val: "120\n",
      status: 200,
      error: 0,
    },
  },
  //Dart Testcases
  {
    name: "dart : hello world",
    reqObject: {
      language: "dart",
      script: "void main() {\n" + '  print("hello world");\n' + "}\n",
    },
    expectedResponse: {
      val: "hello world\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "dart : print stdin",
    reqObject: {
      language: "dart",
      script:
        "import 'dart:io';\n" +
        "void main() {\n" +
        "  String? input = stdin.readLineSync();\n" +
        "  print(input);\n" +
        "}\n",
      stdin: "1 2 3",
    },
    expectedResponse: {
      val: "1 2 3\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "dart : edge case - empty input",
    reqObject: {
      language: "dart",
      script:
        "import 'dart:io';\n" +
        "void main() {\n" +
        "  String? input = stdin.readLineSync();\n" +
        "  if (input == null || input.isEmpty) {\n" +
        '    print("No input provided");\n' +
        "  } else {\n" +
        "    print(input);\n" +
        "  }\n" +
        "}\n",
      stdin: "",
    },
    expectedResponse: {
      val: "No input provided\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "dart : edge case - large input",
    reqObject: {
      language: "dart",
      script:
        "import 'dart:io';\n" +
        "void main() {\n" +
        "  String? input = stdin.readLineSync();\n" +
        "  if (input != null) {\n" +
        "    List<String> numbers = input.split(' ');\n" +
        "    int sum = numbers.map(int.parse).reduce((a, b) => a + b);\n" +
        "    print(sum);\n" +
        "  }\n" +
        "}\n",
      stdin: List.filled(100000, "1").join(" "),
    },
    expectedResponse: {
      val: "100000\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "dart : factorial",
    reqObject: {
      language: "dart",
      script:
        "int factorial(int n) {\n" +
        "  if (n == 0) return 1;\n" +
        "  return n * factorial(n - 1);\n" +
        "}\n" +
        "void main() {\n" +
        "  String? input = stdin.readLineSync();\n" +
        "  if (input != null) {\n" +
        "    int n = int.parse(input);\n" +
        "    print(factorial(n));\n" +
        "  }\n" +
        "}\n",
      stdin: "5",
    },
    expectedResponse: {
      val: "120\n",
      status: 200,
      error: 0,
    },
  },

  {
    name: "python : print stdin",
    reqObject: {
      language: "python",
      script:
        "try:\n" +
        "    while(True):\n" +
        "        line = input()\n" +
        "        if not line:\n" +
        "            break\n" +
        "        print(line)\n" +
        "except EOFError:\n" +
        "    pass",
      stdin: "1 2 3",
    },
    expectedResponse: {
      val: "1 2 3\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "c : hello world",
    reqObject: {
      language: "c",
      script:
        "#include<stdio.h>\n\n" +
        "int main(){\n\n" +
        '    printf("hello world");\n' +
        "    return 0;\n" +
        "}\n",
    },
    expectedResponse: {
      val: "hello world",
      status: 200,
      error: 0,
    },
  },
  {
    name: "c : print stdin",
    reqObject: {
      language: "c",
      script:
        "#include <stdio.h>\n" +
        "int main() {\n" +
        "    int number;\n" +
        '    while (scanf("%d", &number) == 1) {\n' +
        '        printf("%d\\n", number);\n' +
        "    } \n" +
        "    return 0;\n" +
        "}",
      stdin: "1 2 3",
    },
    expectedResponse: {
      val: "1\n2\n3\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "java : print stdin",
    reqObject: {
      language: "java",
      script:
        "import java.util.Scanner;\n" +
        "public class Solution {\n" +
        "    public static void main(String[] args) {\n" +
        '        System.out.println("hello world");\n' +
        "    }\n" +
        "}\n",
    },
    expectedResponse: {
      val: "hello world\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "java : print stdin",
    reqObject: {
      language: "java",
      script:
        "import java.util.Scanner;\n" +
        "public class Solution {\n" +
        "    public static void main(String[] args) {\n" +
        "        Scanner scanner = new Scanner(System.in);\n" +
        "        while (scanner.hasNextInt()) {\n" +
        "            int number = scanner.nextInt();\n" +
        "            System.out.println(number);\n" +
        "        } \n" +
        "        scanner.close();\n" +
        "    }\n" +
        "}\n",
      stdin: "1 2 3",
    },
    expectedResponse: {
      val: "1\n2\n3\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "ruby : print hello world",
    reqObject: {
      language: "ruby",
      script: 'print "hello world"',
    },
    expectedResponse: {
      val: "hello world",
      status: 200,
      error: 0,
    },
  },
  {
    name: "ruby : print stdin",
    reqObject: {
      language: "ruby",
      script: "user_input = gets.chomp\n" + "puts user_input",
      stdin: "10\n",
    },
    expectedResponse: {
      val: "10\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "TLE test",
    reqObject: {
      language: "nodejs",
      script: "for(let i=0 ; ; ){i++}",
    },
    expectedResponse: {
      val: "Time limit exceeded",
      status: 200,
      error: 1,
    },
  },
  {
    name: "MLE test",
    reqObject: {
      language: "python",
      script: "one_gb_data = bytearray(1000 * 1024 * 1024)",
    },
    expectedResponse: {
      val: "Memory limit exceeded",
      status: 200,
      error: 1,
    },
  },
  {
    name: "MLE test 2",
    reqObject: {
      language: "python",
      script:
        "import time\n" +
        "def consume_memory(target_mb, duration_sec):\n" +
        "    float_size = 8\n" +
        "    floats_per_mb = (1024 * 1024) // float_size\n" +
        "    total_floats = target_mb * floats_per_mb\n" +
        "    iterations = int(duration_sec / 0.1)\n" +
        "    floats_per_iteration = total_floats // iterations\n" +
        "    memory_hog = []\n" +
        "    for _ in range(iterations):\n" +
        "        memory_hog.extend([0.0] * floats_per_iteration)\n" +
        "        time.sleep(0.1)\n" +
        "consume_memory(1000, 1)\n",
    },
    expectedResponse: {
      val: "Memory limit exceeded",
      status: 200,
      error: 1,
    },
  },
  {
    name: "MLE test 3",
    reqObject: {
      language: "python",
      script: "a = [100]\n" + "for i in a:\n" + "    a.append(i)\n",
    },
    expectedResponse: {
      val: "Memory limit exceeded",
      status: 200,
      error: 1,
    },
  },
  {
    name: "OPEN AI test promptv1",
    reqObject: {
      language: "promptv1",
      prompt: "The question is what is 2 plus 2. The answer given is 4.",
    },
    expectedResponse: {
      val: {},
      status: 200,
      error: 0,
    },
  },
  {
    name: "OPEN AI test promptv2",
    reqObject: {
      language: "promptv2",
      prompt: "The question is what is 2 plus 2. The answer given is 4.",
    },
    expectedResponse: {
      val: {},
      status: 200,
      error: 0,
    },
  },
];

module.exports = { testCases };
