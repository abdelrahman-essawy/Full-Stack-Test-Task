import { CheckCircle, XCircle } from 'lucide-react';
import clsx from 'clsx';

export const PasswordValidation = ({
  password,
  rules,
}: {
  password: string;
  rules: { rule: RegExp; label: string }[];
}) => (
  <div className="mt-2 space-y-1 text-sm">
    {rules.map(({ rule, label }, index) => {
      const isValid = password && rule.test(password);

      return (
        <div
          className={clsx(
            'flex items-center space-x-2 transition-colors duration-150 ease-in',
            {
              'text-green-600': isValid,
              'text-red-500': !isValid,
            }
          )}
        >
          {isValid ? <CheckCircle size={16} /> : <XCircle size={16} />}
          <span>{label}</span>
        </div>
      );
    })}
  </div>
);
