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
    : 'here';

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

