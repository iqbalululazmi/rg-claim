export const Input = ({ className, type, name, id, autoComplete }: any) => {
  return (
    <>
      <input
        type={type}
        name={name}
        id={id}
        autoComplete={autoComplete}
        className={`${className} h-9 mt-1 px-1 border focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm rounded-md`}
      />
    </>
  )
}
