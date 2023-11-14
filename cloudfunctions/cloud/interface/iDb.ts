import { DbStructureFieldTypeEnum } from "../constants/common";

export type DbStructure = null | Record<string, IDbStructureFieldValue>;

interface IDbStructureFieldValue {
  type: DbStructureFieldTypeEnum;
  required: boolean;
}