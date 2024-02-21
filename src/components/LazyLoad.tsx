import React, { Suspense } from 'react'

const lazyLoad = (Comp: React.LazyExoticComponent<React.FC>): React.ReactNode => {
  return (
    <Suspense fallback={<div>加载中...</div>}>
      <Comp />
    </Suspense>
  )
}
export default lazyLoad
