import { ZodString } from 'zod';

interface RuleCheck {
  rule: RegExp;
  label: string;
}

export const extractRules = (schema: ZodString): RuleCheck[] => {
  if (!(schema instanceof ZodString)) {
    console.warn('PasswordValidation schema must be a ZodString.');
    return [];
  }

  return schema._def.checks
    .map((check) => {
      switch (check.kind) {
        case 'min':
          return {
            rule: new RegExp(`.{${check.value},}`),
            label: check.message || `At least ${check.value} characters`,
          };
        case 'regex':
          return {
            rule: check.regex,
            label: check.message || 'Invalid format',
          };
        default:
          return null;
      }
    })
    .filter((rule): rule is RuleCheck => rule !== null);
};
