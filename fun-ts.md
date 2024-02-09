---
marp: true
theme: default
_class: invert
paginate: true
header: 'Happy ~~Path~~ programátor v TypeScriptu'
# npx @marp-team/marp-cli@latest fun-ts.md --html -o public/index.html
---

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap&subset=latin,latin-ext');
  section:not(code) {
    font-family: Roboto;
  }
  section.invert h1 {
    color: white;
  }
  section.invert header {
    color: #a0a0a0;
  }
  section header {
    color: #606060;
  }
  h1 {
    font-size: 1.5rem;
    margin: 0;
    color: black;
  }
  section header, section footer {
    padding: 0 0.5rem;
  }
  section {
    padding: 1.5rem;
    justify-content: start;
    display: block;
  }
  img {
    max-width: 100%;
  }
  :root {
    font-size: 30px;
  }
  section.invert {
    --color-foreground: white;
    background-color: #0f0f0f;
  }
  section {
    --color-foreground: black;
    background-color: #f1f1f1;
  }
  .center {
    margin: 0 auto;
    display: block;
  }
  img {
    vertical-align: middle;
    max-width: 100%;
  }
  code {
    background-color: #d0d0d0;
  }
  p {
    margin: 1em 0 0;
  }
  .hljs-string {
    color: #016301;
  }
  .hljs-title.class_ {
    color: #970000;
    text-decoration: underline;
  }
  .hljs-keyword {
    color: #c30000;
  }
  .hljs-title.function_ {
    color: blue;
  }
</style>

<!-- představit se, říct background - weby, low-level, weby -->

# Happy ~~(Path)~~ programátor v TypeScriptu

## Error handling v TypeScriptu pro klidnější spánek

<br>
<img src="./assets/hidethepain.jpeg" alt="Hide the pain" width="50%" class="center" />

---

<!-- slidy k dispozici zde: -->

<br>
<img src="./assets/qr.png" alt="QR" width="50%" class="center" />

---

# Úvod
- Proč máme rádi TS? 
- Proč vývojáři upřednostňují TS před JS?

---

<!-- našeptávač funguje v IDE, TypeErrory vyřešeny za compile time -->

# Úvod
- Proč máme rádi TS? 
- Proč vývojáři upřednostňují TS před JS?

<img src="./assets/help.png" alt="Našeptávač" />

`Uncaught TypeError: Cannot read/set property '...' of null/undefined` <img src="./assets/pepe.png" alt="Tak určitě" width="50px">

---

<!-- pořád to je JavaScript -->

# ❌ `tsconfig.json`

Jak **NE**nastavit TypeScript:

```json
// tsconfig.json
{
  "compilerOptions": {
    "skipLibCheck": true,
    "allowJs": true,
    "resolveJsonModule": false,
    "strict": false,
    "noImplicitAny": false,
    "noUncheckedIndexedAccess": false,

    // ...
  }
}
```

**Od teď používáme TypeScript** <img src="./assets/pepe-why.gif" alt="Tak určitě" width="50px">

---
# ✅ `tsconfig.json`

```json
// tsconfig.json
{
  "compilerOptions": {
    "esModuleInterop": true, // zacházej s CommonJS/AMD/UMD moduly jako s ES6
    "skipLibCheck": false, // kontroluj typy .d.ts knihoven
    "allowJs": false,
    "resolveJsonModule": true, // import a from "./a.json" -> "bude mít typy" 
    "moduleDetection": "force", // všechno je modul

    "strict": true, // "vypíná" TS při false
    "noImplicitAny": true, // "vypíná" TS při false
    "noUncheckedIndexedAccess": true, // "vypíná" TS při false

    // ...
  }
}
```

[Matt Pocock: TSConfig Cheat Sheet](https://www.youtube.com/watch?v=eJXVEju3XLM) <img src="./assets/feelsgoodman.png" alt="JO vole" width="90px" />

---
# Standardní výjimky JavaScriptu
- Celkem **79** error typů v těchto kategoriích: `InternalError`, `RangeError`, `SyntaxError`, `TypeError`, `URIError`, `Error`.
- Z toho:
    - **38** syntax error typů
    - **23** type error typů
    - **18** zbytek
- Kompletní seznam: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors

---

<!-- 18+ výjimek -->

# Standardní výjimky JavaScriptu
- Jak nám pomáhá TypeScript?
- **Zachytí `SyntaxError` a `TypeError` při kompilaci!**
- Dozvím se o potenciálních **61** JavaScript výjimkách při kompilaci! <img src="./assets/goodjob.gif" alt="JO vole" width="40px" />
- Zbývá si pohlídat **18** výjimek za runtime-u

---
# Co to vlastně jsou výjimky?

- Jak byste vysvětlili výjimky?

---
# GOTO

```cpp
void checkEvenOrNot(int num)
{
  if (num % 2 == 0)
    goto even; 
  else
    goto odd; 

even:
  printf("%d is even", num);
  return; 
odd:
  printf("%d is odd", num);
}
```

---
# Co to vlastně jsou výjimky?

```ts
function main() {
  try {
    buildRobot()
  } catch (e) {
    console.error("no skynet yet", err)
  }
  console.log("done")
}

function buildRobot() {
  if (Math.random() < 0.5) throw new Error("no robot")
  buildHead()
}
function buildHead() { 
  if (Math.random() < 0.5) throw new Error("no head")
  buildBrain()
}
function buildBrain() { 
  if (Math.random() < 0.5) throw new Error("no brain") 
  buildAiCells()
}
function buildAiCells() { if (Math.random() < 0.5) throw new Error("no cells") }
```

---
# Co to vlastně jsou výjimky?

```ts
let e = null

function main() {
  buildRobot()
  goto ok
err:
  console.error("no skynet yet", e)
  goto done
ok:
  console.log("done")
done:
}

function buildRobot() { 
  if (Math.random() < 0.5) {
    e = new Error("no robot")
    goto err
  }
  buildHead()
}
function buildHead() { 
  if (Math.random() < 0.5) {
    e = new Error("no head")
    goto err
  }
  buildBrain()
}
...
```

---
# Co to vlastně jsou výjimky?

- Umožňují funkcím vracet hodnotu dvěma způsoby (return a throw)
- Vrácení pomocí throw "přeskakuje" call stack až po první blok catch
- Co když zapomenu catch?
- Jak zde pomáhá TypeScript?
- A kde je problém?
- Jde to vymyslet lépe?

---
# Happy Path
- Co je to Happy Path?

```ts
async function savePost(): Promise<boolean> {...}

if (await savePost()) {
  // happy path
}
```
---

# Happy Path
- Co je to Unhappy Path?

```ts
async function savePost(): Promise<boolean> {...}

if (await savePost()) {
  // happy path
} else {
  // unhappy path
}
```
---
# Happy Path
- Ošetřit všechny větve je pracné

```ts
async function savePost(): Promise<boolean> {...}

try {
  if (await savePost()) {
    // happy path
  } else {
    // unhappy path
  }
} catch (e) {
  // unhappy path
}
```
---

<!-- zkompiluje se tento kód? -->

# Happy Path: Real World scénář

```ts
function getInput(): PostData | null | undefined {...}
async function savePostToDb(post: PostData): Promise<Post | null | undefined> {...}
async function sendPostViaEmail(post: Post): Promise<Post | null | undefined> {...}

async function savePost(): Promise<boolean> {
  // get input, save post, send post in email:
  try {
    const input = getInput()
    if (input) {
      const post = await savePostToDb(input)
      if (post) {
        const sentPost = await sendPostViaEmail(post)
        if (sentPost) {
          return true
        }
      }
    }
  } catch (e) {
    return false
  }
}
```

---
# Happy Path: Real World scénář

- Můžeme to vylepšit použitím Return Early Patternu:

```ts
function getInput(): PostData | null | undefined {...}
async function savePostToDb(post: PostData): Promise<Post | null | undefined> {...}
async function sendPostViaEmail(post: Post): Promise<Post | null | undefined> {...}

async function savePost(): Promise<boolean> {
  try {
    const input = getInput()
    if (!input) return false
    
    const post = await savePostToDb(input)
    if (!post) return false
    
    const sentPost = await sendPostViaEmail(post)
    return !!sentPost
  } catch (e) {
    return false
  }
}
```

---
# Co kdybychom se zbavili výjimek v našem kódu?

- Do funkcí `getInput`, `savePostToDb`, `sendPostViaEmail` přidáme try/catch blok, v catch bloku vrátíme `null/undefined/false`.
    - Sloučili jsme **Unhappy Path** výjimek v našem kódu - nyní stačí `if (result) {...}`
- Co udělat s `if (!...) return false` u řetězených operací (**WET**)?

```ts
async function savePost(): Promise<boolean> {
  const input = getInput()
  if (!input) return false
  
  const post = await savePostToDb(input)
  if (!post) return false
  
  const sentPost = await sendPostViaEmail(post)
  return !!sentPost
}
```
---
# Co kdybychom nahradili `null/undefined` v našem kódu?

- Knihovna `ts-results-es` a `Option` místo `null/undefined`
```ts
import { Option, Some, None } from "ts-results-es"

function getInput(): Option<PostData> {
  try {
    if (Math.random() < 0.5) return Some({...})
    return None
  } catch (e) {
    return None
  }
}
async function savePost(): Promise<boolean> {
  const input = getInput()
  if (input.isNone()) return false

  console.log(input.value)
  return true
}
```

---
<img src="./assets/some-1.png" alt="Some" width="60%" />

<img src="./assets/some-2.png" alt="Some" width="60%" />

---
# Přidáme `Result` z `ts-results-es`

```ts
import { Ok, Err, Result, Option, Some, None } from 'ts-results-es';

function getInput(): Option<PostData> { return Some({...}) }
async function savePostToDb(post: PostData): Promise<Result<Post, "db error">> { return Ok({...}) }
async function sendPostViaEmail(post: Post): Promise<Result<Post, "email error">> { return Ok(...) }

async function savePost(): Promise<Result<Post, "db error" | "email error" | "input error">> {
  const input = getInput()
  if (input.isNone()) return Err("input error")
  
  const post = await savePostToDb(input.value)
  if (post.isErr()) return post
  
  const sentPost = await sendPostViaEmail(post.value)
  return sentPost
}
```

---
# Zřetězíme operace pomocí `andThen`

```ts
import { Ok, Err, Result, Option, Some, None } from 'ts-results-es';

function getInput(): Option<PostData> {...}
async function savePostToDb(post: PostData): Promise<Result<Post, "db error">> {...}
async function sendPostViaEmail(post: Post): Promise<Result<Post, "email error">> {...}

async function savePost(): Promise<Result<Post, "db error" | "email error" | "input error">> {
  return getInput()
    .toResult("input error" as const)
    .toAsyncResult()
    .andThen(savePostToDb)
    .andThen(sendPostViaEmail)
    .promise
}
```

---
# Jak tohle pomohlo?

- Kde je unhappy a happy path?
- Jak to pomohlo?

```ts
const post = await savePost()
if (post.isErr()) {
  // all unhappy paths checked by compiler!
  // error is typed!
}
if (post.isOk()) {
  // happy path
}

```

---
# Happy Programátor

- Kde je unhappy a happy path?
- Jak to pomhlo?

<img src="./assets/result-2.png" alt="isOk" width="36%" />
<img src="./assets/result-3.png" alt="isErr" width="60%" />
<img src="./assets/result-1.png" alt="value" width="60%" />

---
# Další kroky?

- Projděte si [example projekt](https://github.com/lubosmato/fun-ts) a [ts-results-es](https://github.com/lune-climate/ts-results-es#example)
    - Dnes jsme jen lehce nakousli myšlenky z `ts-results-es`
- Zakomponujte `ts-results-es` do svého kódu:
    - Začněte u malých částí
    - K nové featurce přidejte špetku refaktoringu pomocí `Option` nebo `Result`
    - Ve vyšších úrovní abstrakce se můžete kdykoliv vrátit k výjimkám nebo `null | undefined` a dodržet zpětnou kompatibility
- Zajděte na limonádu/pivko s kolegy/kamarády a pobavte se o `ts-results-es`

---
# Děkuji za pozornost

<img src="./assets/hidethepain-2.jpg" alt="Happy" width="30%" class="center" />
