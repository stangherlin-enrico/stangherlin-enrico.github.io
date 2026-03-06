import { Badge } from '../ui/Badge'

type Props = {
  tags: string[]
  active: string | null
  onSelect: (tag: string | null) => void
}

export function TagFilter({ tags, active, onSelect }: Props) {
  if (tags.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2">
      <Badge
        onClick={() => onSelect(null)}
        active={active === null}
      >
        All
      </Badge>
      {tags.map((tag) => (
        <Badge
          key={tag}
          onClick={() => onSelect(active === tag ? null : tag)}
          active={active === tag}
        >
          {tag}
        </Badge>
      ))}
    </div>
  )
}
