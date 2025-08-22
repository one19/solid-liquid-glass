import { ReactNode, ElementType } from 'react';
import styled from '@emotion/styled';

type Props = {
  color?: string;
  children?: ReactNode;
  as?: ElementType;
};

const Colored = styled.span<{ $color?: string }>`
  color: ${({ $color }) => ($color ? $color : 'inherit')};
`;

export const Color = ({ color, children, as }: Props) => (
  <Colored as={as} $color={color}>
    {children}
  </Colored>
);

export default Color;
