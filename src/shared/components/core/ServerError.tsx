export interface ServerErrorProps {
   message?: string
}

export function ServerError(props: ServerErrorProps) {
	return (
		<div className="bg-red-700 text-white font-medium px-6 py-3 mb-4 rounded-lg">
			{props.message ? props.message : 'A server error occurs!'}
		</div>
	);
}
