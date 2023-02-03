export function PageHeaderTitle({title, children}) {
  return (
    <header className="bg-white shadow mb-5">

      <div className="container mx-auto max-w-6xl py-4 px-4 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">{title}</h1>
        {children}
      </div>
    </header>
  )
}