'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Fuse from 'fuse.js'
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command'
import type { SearchEntry } from '@/lib/docs'

export function DocSearch({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const router = useRouter()
  const [fuse, setFuse] = useState<Fuse<SearchEntry> | null>(null)
  const [results, setResults] = useState<Fuse.FuseResult<SearchEntry>[]>([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    fetch('/api/docs-search')
      .then((r) => r.json())
      .then((data: SearchEntry[]) => {
        setFuse(
          new Fuse(data, {
            keys: [
              { name: 'title', weight: 3 },
              { name: 'description', weight: 2 },
              { name: 'content', weight: 1 },
            ],
            threshold: 0.4,
          })
        )
      })
  }, [])

  const search = useCallback(
    (value: string) => {
      setQuery(value)
      if (!fuse || !value) {
        setResults([])
        return
      }
      setResults(fuse.search(value, { limit: 10 }))
    },
    [fuse]
  )

  const handleSelect = (slug: string) => {
    router.push(`/docs/${slug}`)
    onOpenChange(false)
  }

  const categories = groupByCategory(results.map((r) => r.item))
  const hasResults = Object.keys(categories).length > 0

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput
        placeholder="Search documentation..."
        value={query}
        onValueChange={search}
      />
      <CommandList>
        <CommandEmpty>
          {query ? 'No results found.' : 'Type to search...'}
        </CommandEmpty>
        {hasResults &&
          Object.entries(categories).map(([category, items]) => (
            <CommandGroup key={category} heading={category}>
              {items.map((item) => (
                <CommandItem
                  key={item.slug}
                  onSelect={() => handleSelect(item.slug)}
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium">{item.title}</span>
                    {item.description && (
                      <span className="text-xs text-[var(--mist)] line-clamp-1">
                        {item.description}
                      </span>
                    )}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
      </CommandList>
    </CommandDialog>
  )
}

function groupByCategory(items: SearchEntry[]): Record<string, SearchEntry[]> {
  const groups: Record<string, SearchEntry[]> = {}
  for (const item of items) {
    const cat = item.category || 'Other'
    if (!groups[cat]) groups[cat] = []
    groups[cat].push(item)
  }
  return groups
}
