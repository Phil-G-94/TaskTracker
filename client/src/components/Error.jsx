export default function ErrorMessages({ errors }) {
    return (
        <div role="region" aria-label="form errors" className="min-h-[24px] transition-all duration-300">
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
