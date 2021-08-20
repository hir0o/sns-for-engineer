import { useEffect } from 'react'

const useScroller = (
  moreDom: HTMLDivElement | null,
  loadMore: () => void
): void => {
  useEffect(() => {
    if (!moreDom) return
    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting) {
          console.log('もっと')
        }
      },
      {
        threshold: 1.0,
      }
    )
    observer.observe(moreDom)
  }, [moreDom])
}

export default useScroller
