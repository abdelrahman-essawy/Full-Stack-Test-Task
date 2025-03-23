import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';

export const PasswordValidation = ({
  password,
  rules,
}: {
  password: string;
  rules: {
    rule: RegExp;
    label: string;
  }[];
}) => {
  return (
    <div className="mt-2 space-y-1 text-sm">
      {rules.map(({ rule, label }, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`flex items-center space-x-2 ${
            rule.test(password) ? 'text-green-600' : 'text-red-500'
          }`}
        >
          {rule.test(password) ? (
            <CheckCircle size={16} />
          ) : (
            <XCircle size={16} />
          )}
          <span>{label}</span>
        </motion.div>
      ))}
    </div>
  );
};
