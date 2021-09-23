import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { Children } from 'react';

interface Props {
  children: any;
  activeClassName: string;
  href: string;
  as?: string;
  shallow?: boolean;
}

const ActiveLink = ({
  children,
  activeClassName,
  ...props
}: Props): JSX.Element => {
  const { asPath } = useRouter();

  const child = Children.only(children);
  const childClassName = child.props.className || '';

  const className =
    asPath === props.href || asPath === props.as
      ? `${childClassName} ${activeClassName}`.trim()
      : childClassName;

  return (
    <Link {...props}>
      {React.cloneElement(child, {
        className: className || null,
      })}
    </Link>
  );
};

export default ActiveLink;
