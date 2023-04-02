export default function Spinner(props: {
  size: number;
}) {
  return (
    <div className="flex justify-center items-center py-5">
      <div className={`animate-spin rounded-full h-${props.size} w-${props.size} border-t-2 border-gray-900`}></div>
    </div>
  );
}