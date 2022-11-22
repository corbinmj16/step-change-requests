export function ContentCard({children, cardTitle}) {
  return (
    <div className="bg-white shadow p-5 rounded-lg mb-10">
      <h2 className='text-2xl font-bold mb-5'>{cardTitle}</h2>
      {children}
    </div>
  )
}