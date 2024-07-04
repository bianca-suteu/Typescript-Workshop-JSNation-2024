/******* 1. FUNDATIONS *******/

// Variable
let value1 = 'Daria';
if (Math.random() > 0.5) {
  value1 = 123; // Type 'number' is not assignable to type 'string'.
}

// Type annotations
let value2: string;
if (Math.random() > 0.5) {
  value2 = 123; // Type 'number' is not assignable to type 'string'.
}

// Evolving anys
let value3;
value3 = "Mark";
value3.toUpperCase();
value3 = 123;
value3.toPrecision(1); //ok
value3.toLowerCase(); // Property 'toLowerCase' does not exist on type 'number'.

// The seven primtives types: null, undefined, boolean, string, number, bigint, symbol


/******* 2. UNION TYPES *******/

// Union types
let uValue1 : string | number;
uValue1 = 'Tom';
uValue1 = true; // Type 'boolean' is not assignable to type 'string | number'.

// Union type inference
let uValue2 = Math.random() > 0.5 ? "Verionica" : 123;
uValue2 = 'Dave';
uValue2 = true; // Type 'boolean' is not assignable to type 'string | number'.

// Union type properties
uValue2.toUpperCase();  // Property 'toUpperCase' does not exist on type 'string | number'. Property 'toUpperCase' does not exist on type 'number'.

// Narrowing
// TODO SOLVE
uValue2.toUpperCase(); 

// Literals
let litValue1: 'Andreea';
litValue1 = 'Iulia' // Type '"Iulia"' is not assignable to type '"Andreea"'.

// Literals in unions
let litValue2: string | 123;
litValue2 = 'Iulia';
litValue2 = -1; // Type '-1' is not assignable to type 'string | 123'.


/******* 3. OBJECTS *******/

// Object types
let objValue1 = {name: "Daria", power: 100}
objValue1.name = 'Luke';
objValue1 = {name: "Daria"} // Property 'power' is missing in type '{ name: string; }' but required in type '{ name: string; power: number; }'.
objValue1.nope = 2; //Property 'nope' does not exist on type '{ name: string; power: number; }'.

// Object types annotations
let objValue2: {name: string, power: number}
objValue2 = {name: "Daria", power: 100};
objValue2 = {name: "Daria"}; // Property 'power' is missing in type '{ name: string; }' but required in type '{ name: string; power: number; }'.


// Object type aliases
type NameAndPower = {name: string, power: number}
let objValue3: NameAndPower;
objValue3 = {name: "Daria", power: 100};
objValue3 = {name: "Daria"}; // Property 'power' is missing in type '{ name: string; }' but required in type 'NameAndPower1'.

// Discriminated union types
type NameValue = {name: string, type: 'name'}
type PowerValue = {power: number, type: 'power'}
type NameOrPower = NameValue | PowerValue;

const objValue4: NameOrPower = Math.random() > 0.5 ?
   {name: 'Daria', type: 'name'} :
   {power: 1000, type: 'power'} 
objValue4.type // 'name' | 'power'

if (objValue4.type === 'name') {
  // NameValue
} else {
  // PowerValue
}

/******* 4. TYPE MODIFIERS *******/

// Keyof Types
interface  Values {
  me: number,
  you: number
}

function getValueString(values: Values, key: string) {
  return values[key]; // : any
  //Error: Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'Values'.
}

// TODO solve 
function getValueStringBetter(values: Values, key: string) {
  return values[key]; 
}

// Typeof Types
const values2 = {
  me: 0,
  you: 1
}

function lookAtOtherValues (other: typeof values2) {
  other.me
  other.wat // Property 'wat' does not exist on type '{ me: number; you: number; }'.
}

// Keyof Typeof Keys
function getValueString1(key: string) {
  return values2[key]; // : any
  //Error: Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ me: number; you: number; }'.
}

// TODO solve getValueStringBetter2
function getValueStringBetter2(key: string) {
  return values2[key]; 
}

/******* 5. GENERICS *******/

// Generic functions
function identity<T> (value: T) {
  return value;
}
identity("abc").toLowerCase();
identity("abc").wat // Property 'wat' does not exist on type '"abc"'.

// Generic interfaces
interface Box<T> {
  value: T
}
let box: Box<string>;
box = {value: 'abc'};
box = {value: 123}; // Type 'number' is not assignable to type 'string'.

// Parameter type defaults
interface DefaultedBox<T = string> {
  value: T
}
let defaultedBox: DefaultedBox;

// Parametert type Defaults & Keyof Types
// TODO solve
function get<T, Key> (container: T, key: Key) {
  return container[key] as T;
}

get(values2, "me"); // number
/******* 6. TYPE PREDICATES *******/
// functions whoes return assist type narrowing

export type Cactus = DormantCactus | FloweringCactus | FruitBearingCactus;

export interface DormantCactus {
	picked: boolean;
	state: "dormant";
}

export interface FloweringCactus {
	flowers: "small" | "medium" | "large";
	state: "flowering";
}

export interface FruitBearingCactus {
	fruits: number;
	state: "fruit-bearing";
}

// TODO solve- should return FruitBearingCactus
export function isFruitBearingCactus(cactus: Cactus) {
	return cactus.state === "fruit-bearing";
}

export function pickFruitBearingCacti(cacti: Cactus[]) {
	return cacti.filter(isFruitBearingCactus);
}



/********* Zod lite *******/
// Zod is a TypeScript-first schema declaration and validation library.
// I'm using the term "schema" to broadly refer to any data type, from a simple string to a complex nested object.

// const spySchema = object({
//   disguise: string(),
//   codename: literal("007"),
//   plan: union([
//     literal("active"),
//     literal("improvising")
//   ])
// })
// type Spy = Infer<typeof spySchema>

/******** PRIMITIVES *******/
export interface SchemaString {
  primitive: "string";
  zType: "primitive"
}

export const string = () : SchemaString => ({
  primitive: "string",
  zType: "primitive"
});

export type Infer<Schema> =
  Schema extends SchemaString 
    ? 'string' 
    : 'here'; // never

const s = string();
type stringg = Infer<typeof s>
let a = 1;
type tesr = Infer<typeof a>

/************ LITERALS   ************/
export interface SchemaLiteral<Value> {
  value: Value,
  zType: "literal"
}

export const literal = <Value>(value: Value) : SchemaLiteral<Value> => ({
  value,
  zType: "literal"
});

export type Infer2<Schema> =
  Schema extends SchemaString 
    ? 'string' 
    : Schema extends SchemaLiteral<infer Value>
      ? Value
      : never;

const numberLiteral = literal(5);
type noType = Infer2<typeof numberLiteral>
const letterLiteral = literal('five');
type letterType = Infer2<typeof letterLiteral>

/**************** UNIONS  **********/
export interface SchemaUnions<Values extends any[]> {
  values: Values;
  zType: "union"
}

export const union = <Values extends any[]>(values: Values) : SchemaUnions<Values> => ({
  values,
  zType: "union"
});


export type UnwrapSchemaUnion<Values> = Values extends (infer Value)[]  
  ? Infer3<Value>
  : never

export type Infer3<Schema> =
  Schema extends SchemaString 
    ? 'string' 
    : Schema extends SchemaLiteral<infer Value>
      ? Value
      : Schema extends SchemaUnions<infer Values>
         ? UnwrapSchemaUnion<Values>
        : Schema extends number 
        ? number 
          : Schema extends string 
          ? string 
           : never;

const unionSc = union([literal(2), literal("hjdshj")]);
const unionSc3 = union([3, 'three']);

type unionType = Infer3<typeof unionSc>
// string | number ?
type unionType3 = Infer3<typeof unionSc3>



/*************** OBJECTS ***********/

export interface SchemaObject<Properties> {
  properties: Properties;
  zType: "object"
}

export const object = <Properties>(properties: Properties) : SchemaObject<Properties> => ({
  properties,
  zType: "object"
});

export type Infer4noUnwrap<Schema> =
  Schema extends SchemaString 
    ? 'string' 
    : Schema extends SchemaLiteral<infer Value>
      ? Value
      : Schema extends SchemaUnions<infer Values>
        ? UnwrapSchemaUnion<Values>
          : Schema extends SchemaObject<infer Properties>
          ? Properties
          : never;

export type UnwrapSchemaObject<Properties> = {
  [K in keyof Properties]: Infer4<Properties[K]>
}

export type Infer4<Schema> =
  Schema extends SchemaString 
    ? 'string' 
    : Schema extends SchemaLiteral<infer Value>
      ? Value
      : Schema extends SchemaUnions<infer Values>
        ? UnwrapSchemaUnion<Values>
          : Schema extends SchemaObject<infer Properties>
          ? UnwrapSchemaObject<Properties>
          : Schema extends number 
            ? number 
              : Schema extends string 
              ? string 
              : never;

const spySchema = object({
  disguise: string(),
  codename: literal("007"),
  plan: union([
   "text",
    literal(4),
   // literal("fixe")
  ])
})

type Spy = Infer4<typeof spySchema>
type SpyNoUnWrapp = Infer4noUnwrap<typeof spySchema>

