import React from 'react';
import { Container } from './Container';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: 'white' | 'warm' | 'card' | 'gradient';
  padding?: 'sm' | 'md' | 'lg';
  id?: string;
}

export const Section: React.FC<SectionProps> = ({
  children,
  className = '',
  background = 'white',
  padding = 'lg',
  id,
}) => {
  const backgroundClasses = {
    white: 'bg-white',
    warm: 'bg-[#f7f1e4]',
    card: 'bg-[#ede7da]',
    gradient: 'bg-gradient-to-br from-blue-500 to-blue-600',
  };

  const paddingClasses = {
    sm: 'py-16',
    md: 'py-20',
    lg: 'py-24',
  };

  return (
    <section
      id={id}
      className={`
        ${backgroundClasses[background]}
        ${paddingClasses[padding]}
        ${className}
      `.trim()}
    >
      <Container>{children}</Container>
    </section>
  );
};

export default Section;
