import { cn } from '@/lib/utils';
import { ReactNode } from 'react';


interface MaxWidthWrapperProps {
  className?: string;
  children?: ReactNode;
  style?: ReactNode
}

const MaxWidthWrapper: React.FC<MaxWidthWrapperProps> = ({ className, children, style }) => {
  return (
    <div className={cn('relative overflow-hidden max-w-full px-10', className, style)}>
      {children}
    </div>
  );
};

export default MaxWidthWrapper;