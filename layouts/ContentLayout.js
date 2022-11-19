export function ContentLayout({children}) {
  return (
    <div className="container flex flex-col mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  )
}