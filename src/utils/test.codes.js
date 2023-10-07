const { z } = require('zod');
const schema = z.object({
  name: z.string(),
});

const test = {
  name: false,
  lastName: 'virat',
};

const parsed = schema.safeParse(test);

console.log(parsed);
