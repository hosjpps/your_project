import { icons, type LucideProps } from 'lucide-react'

interface IconProps extends LucideProps {
  name: string
}

export function Icon({ name, ...props }: IconProps) {
  const pascalName = name
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('') as keyof typeof icons

  const LucideIcon = icons[pascalName]
  if (!LucideIcon) return null

  return <LucideIcon {...props} />
}
