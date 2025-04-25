export default function ErrorMessages({ errors }) {
    return (
        <div className="min-h-[24px] transition-all duration-300">
            {errors?.map(error => {
                return (
                    <p key={error.field} className="text-center text-red-600">
                        {error.field} : {error.message}
                    </p>
                );
            })}
        </div>
    );
}
