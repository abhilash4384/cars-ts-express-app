"use strict";
const { z } = require('zod');
const EMAIL_VALIDATOR = z.string().email();
console.log(EMAIL_VALIDATOR.safeParse('sam@willson.com').success);
