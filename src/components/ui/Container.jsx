import { cn } from '../../lib/utils';

/**
 * Centered, width-capped page gutter.
 *
 * Every section uses this so horizontal alignment is defined in exactly one
 * place. Change the max width here and the whole site follows.
 *
 * @param {object} props
 * @param {React.ElementType} [props.as='div'] element to render
 * @param {'default'|'narrow'|'wide'} [props.size='default']
 */
export function Container({ as: Tag = 'div', size = 'default', className, children, ...props }) {
  const widths = {
    narrow: 'max-w-3xl',
    default: 'max-w-6xl',
    wide: 'max-w-7xl',
  };

  return (
    <Tag
      className={cn('mx-auto w-full px-5 sm:px-8', widths[size], className)}
      {...props}
    >
      {children}
    </Tag>
  );
}
