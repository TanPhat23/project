const authLayout = ({ children} : {
      children : React.ReactNode
}) =>{
    return (
        <div className="flex justify-center h-full">
            {children}
        </div>
    )
}

export default authLayout