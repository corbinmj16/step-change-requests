export function ContentLayout({children}) {
  return (
    <div className="container flex flex-col mx-auto max-w-6xl py-6 sm:px-6 lg:px-8">
      {children}
    </div>
  )
}