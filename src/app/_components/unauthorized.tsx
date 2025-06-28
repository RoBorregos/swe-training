
const Unauthorized = () => {
    return (
        <div className="flex flex-col items-center justify-center py-20 bg-primary-light rounded-md">
            <h1 className="text-4xl font-bold text-accent">Unauthorized</h1>
            <p className="mt-4 text-lg text-neutral-400">Please Login</p>
        </div>
    );
}

export default Unauthorized;