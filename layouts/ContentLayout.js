export function ContentLayout({children}) {
  return (
    <div className="container flex flex-col mx-auto max-w-6xl py-6 px-4 lg:px-8">
      {children}
    </div>
  )
}