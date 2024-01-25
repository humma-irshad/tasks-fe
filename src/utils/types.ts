import { z } from "zod";

import { schemas } from "../../client";

// The name of the entity becomes key
export type TSchemas = {
  [key in keyof typeof schemas]: z.infer<(typeof schemas)[key]>
};
