const MovmentButtons = ({
  page,
  moveName,
}: {
  page: string;
  moveName: string;
}) => {
  return (
    <div>
      {" "}
      <a
        href={page}
        className="text-gray-300  bg-[#00000042] rounded-full mt-4 px-5 py-3 text-center hover:opacity-75 transition-opacity duration-300"
      >
        {moveName}
      </a>
    </div>
  );
};

export default MovmentButtons;
