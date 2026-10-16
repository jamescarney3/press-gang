export type JsonValue = string | number | JsonValue[] | JsonObject;
export interface JsonObject {
  [key: string]: JsonValue;
}

type JsonTree = JsonObject | JsonValue[];

const assignAtPath = (operand: JsonTree, path: string[], value: string | number): JsonTree => {
  if (!path.length) throw new Error(`Invalid assignment path: ${path}`);

  const operandIsArray = Array.isArray(operand);
  const segment = path.at(0)!;

  const segmentIsKeyForArrayNode = path.at(1) === '';
  const segmentIsKeyForLeafNode = path.length === 1 || (segmentIsKeyForArrayNode && path.length === 2);

  // handle base cases (set object k/v or add array value)
  if (segmentIsKeyForLeafNode && !operandIsArray) {
    if (segmentIsKeyForArrayNode) {
      const arrayTarget = operand[segment] || ([] as JsonTree[]);
      return { ...operand, [segment]: [...(arrayTarget as JsonValue[]), value] };
    }
    return { ...operand, [segment]: value } as typeof operand;
  }

  // hanle array operand
  if (operandIsArray) {
    const elementTarget = operand.at(-1) || {};
    const pathRemainder = path.slice(1);
    const elementTargetHasKey = segment in (elementTarget as object);

    if (segmentIsKeyForLeafNode) {
      const assignmentProperty = { [segment]: value };

      if (elementTargetHasKey) return [...operand, assignmentProperty];
      return [...operand.slice(0, -1), { ...(elementTarget as JsonTree), ...assignmentProperty }];
    }

    if (elementTargetHasKey) {
      return [...operand, assignAtPath({}, pathRemainder, value)];
    }

    return [...operand.slice(0, 1), assignAtPath(elementTarget as JsonTree, pathRemainder, value)];
  }

  // handle array notation
  if (segmentIsKeyForArrayNode) {
    const arrayTarget = operand[segment] || [];
    const pathRemainder = path.slice(2);
    return { ...operand, [segment]: assignAtPath(arrayTarget as JsonTree, pathRemainder, value) };
  }

  // handle object notation
  const target = (operand[segment] || {}) as JsonTree;
  const pathRemainder = path.slice(1);
  return { ...operand, [segment]: assignAtPath(target, pathRemainder, value) };
};

export const serializeFormData = (formData: FormData): JsonObject => {
  const keyMatcher = /^\w+|(?<=.+\[)\w+(?=\])|(?<=\[)(?=\])/g;
  const propEntries = Array.from(formData.entries());

  return propEntries.reduce((current, [k, v]) => {
    const path = k.match(keyMatcher)!;
    return assignAtPath(current, path, v as string | number);
  }, {} as JsonTree) as JsonObject;
};
